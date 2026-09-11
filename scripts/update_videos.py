#!/usr/bin/env python3
"""
Re-sync the Saul's Podship episode list straight from YouTube (no API key needed),
then regenerate ../assets/videos-data.js and videos-data.json.

Usage:  python3 scripts/update_videos.py

The scraper walks the channel's /videos tab (with pagination) and the three
playlists, exactly like a logged-out visitor sees them. Any episode that is
private / scheduled on YouTube shows up as a "coming soon" slot on the site.
"""
import argparse
import json
import re
import sys
import time
import urllib.request
import warnings
from pathlib import Path

warnings.filterwarnings("ignore", category=DeprecationWarning, message="invalid escape sequence")

HANDLE = "thesaulspodship"
PLAYLISTS = {
    "torah": "PL8xJ8m8_tH6lX3fqAxwK2nGHv3xwvzENL",      # 5 Books of Torah
    "canon66": "PL8xJ8m8_tH6mBsW14vBGQUngWnequdV5X",   # 66 Canonical Books
    "noncanon": "PL8xJ8m8_tH6mDaGEpcdD2i9c3SjoFuqUj",  # 14 Non Canonical Books
}
COLL_META = {
    "torah": {"key": "torah", "label": "5 Books of Torah",
              "blurb": "The Books of Moses: from Creation to Deuteronomy."},
    "canon66": {"key": "canon66", "label": "66 Canonical Books",
                "blurb": "The complete Protestant canon, one book at a time."},
    "noncanon": {"key": "noncanon", "label": "14 Non-Canonical Books",
                 "blurb": "Apocrypha & Pseudepigrapha — the hidden prophetic voices."},
}
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")
MOBILE_UA = ("Mozilla/5.0 (Android 14; Mobile; rv:109.0) Gecko/537.36 Firefox/126.0")
API_KEY = "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8"  # public web client key
OUT_DIR = Path(__file__).resolve().parent.parent / "assets"


def fetch(url, mobile=False):
    req = urllib.request.Request(url, headers={
        "User-Agent": MOBILE_UA if mobile else UA,
        "Accept-Language": "en-US,en;q=0.9",
        "Cookie": "CONSENT=YES+cb"})
    return urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "ignore")


def initial_data(html):
    m = (re.search(r"var ytInitialData = (\{.*?\});</script>", html, re.S)
         or re.search(r"ytInitialData = '(.+?)';</script>", html, re.S))
    raw = m.group(1)
    if raw.startswith("'") or "\\x" in raw[:6]:
        raw = raw.encode("utf-8").decode("unicode_escape").encode("latin-1", "ignore").decode("utf-8", "ignore")
    return json.loads(raw)


def walk(x, k):
    if isinstance(x, dict):
        if k in x:
            yield x[k]
        for v in x.values():
            yield from walk(v, k)
    elif isinstance(x, list):
        for v in x:
            yield from walk(v, k)


def lockup_videos(data):
    out = []
    for lk in walk(data, "lockupViewModel"):
        if lk.get("contentType") != "LOCKUP_CONTENT_TYPE_VIDEO":
            continue
        md = lk.get("metadata", {}).get("lockupMetadataViewModel", {})
        length = ""
        for b in walk(lk, "thumbnailBadgeViewModel"):
            t = b.get("text", "")
            if re.match(r"^\d+:\d", t):
                length = t
        out.append({"videoId": lk.get("contentId"),
                    "title": md.get("title", {}).get("content", ""),
                    "length": length})
    return out


def browse_continuation(data):
    return [ci.get("continuationEndpoint", {}).get("continuationCommand", {}).get("token")
            for ci in walk(data, "continuationItemRenderer")]


def browse(token):
    body = json.dumps({"context": {"client": {"clientName": "WEB",
                                              "clientVersion": "2.20240805.00.00"}},
                       "continuation": token}).encode()
    req = urllib.request.Request(
        f"https://www.youtube.com/youtubei/v1/browse?key={API_KEY}",
        data=body, headers={"User-Agent": UA, "Content-Type": "application/json"})
    return json.loads(urllib.request.urlopen(req, timeout=30).read().decode())


def channel_videos():
    """All public videos, newest first, plus the live channel avatar URL."""
    html = fetch(f"https://www.youtube.com/@{HANDLE}/videos")
    data = initial_data(html)
    avatar = None
    for m in re.finditer(r"https://yt3\.googleusercontent\.com/[A-Za-z0-9_-]+=s\d+-c-k-[^\"\\]+", html):
        if re.search(r"=s(64|88|120|160|176|204|240|288|360|480|600|800|900|1000|1200)-c-k-", m.group(0)):
            avatar = m.group(0)
            break
    if not avatar:
        m = re.search(r"https://yt3\.googleusercontent\.com/[A-Za-z0-9_-]+(=[^\"\\]+)?", html)
        if m:
            avatar = m.group(0).split("=")[0] + "=s200-c-k-c0x00ffffff-no-rj"
    vids, seen, page = lockup_videos(data), set(), 0
    for v in vids:
        seen.add(v["videoId"])
    queue = [t for t in browse_continuation(data) if t]
    while queue and page < 8:
        tok = queue.pop(0)
        page += 1
        time.sleep(0.5)
        try:
            nd = browse(tok)
        except Exception as e:  # noqa: BLE001
            print("  continuation failed:", e)
            continue
        for v in lockup_videos(nd):
            if v["videoId"] not in seen:
                seen.add(v["videoId"])
                vids.append(v)
        queue += [t for t in browse_continuation(nd) if t]
    return vids, avatar


def playlist_items(pid):
    """Playlist items (playlist order). Desktop may hide private entries; the
    mobile page lists them as untitled lockups -> 'coming soon' slots."""
    items, seen = [], set()

    def absorb(new_items):
        for v in new_items:
            if v["videoId"] and v["videoId"] not in seen:
                seen.add(v["videoId"])
                items.append(v)

    try:
        data = initial_data(fetch(f"https://www.youtube.com/playlist?list={pid}&hl=en"))
        absorb(lockup_videos(data))
    except Exception as e:  # noqa: BLE001
        print("  desktop playlist failed:", e)
    if len(items) < 3:  # desktop sometimes hides everything except fresh uploads
        try:
            html = fetch(f"https://m.youtube.com/playlist?list={pid}&hl=en", mobile=True)
            data = initial_data(html)
            absorb(lockup_videos(data))
        except Exception as e:  # noqa: BLE001
            print("  mobile playlist failed:", e)
    return items


def main(out_dir):
    print("Fetching channel videos…")
    vids, avatar = channel_videos()
    if avatar:
        print("  avatar:", avatar[:72], "…")
    print(f"  {len(vids)} public episodes")
    index = {}
    for i, v in enumerate(vids):
        m = re.match(r"\s*#(\d+)", v["title"])
        index[v["videoId"]] = {"id": v["videoId"],
                                "n": int(m.group(1)) if m else None,
                                "title": v["title"].strip(),
                                "length": v.get("length") or "",
                                "channelOrder": i,
                                "collections": []}

    collections = [{"key": "all", "label": "All Episodes",
                    "blurb": "Genesis to Revelation — and beyond."}]
    print("Fetching playlists…")
    for key, pid in PLAYLISTS.items():
        meta = dict(COLL_META[key])
        items = playlist_items(pid)
        meta["playlist"] = f"https://www.youtube.com/playlist?list={pid}"
        soon = 0
        for it in items:
            v = index.get(it["videoId"])
            if v:
                if key not in v["collections"]:
                    v["collections"].append(key)
            else:
                soon += 1  # private/unlisted entry
        if soon:
            meta["totalOnYouTube"] = len(items)
            meta["comingSoon"] = soon
            print(f"  {key}: {len(items)-soon} published · {soon} private/coming soon")
        else:
            print(f"  {key}: {len(items)} published")
        collections.append(meta)

    data = {
        "generatedAt": time.strftime("%Y-%m-%d"),
        "channel": {"name": "Saul's Podship", "handle": f"@{HANDLE}",
                    "url": f"https://www.youtube.com/@{HANDLE}",
                    "subscribeUrl": f"https://www.youtube.com/@{HANDLE}?sub_confirmation=1",
                    "site": "https://www.saulspodship.com/",
                    "avatarUrl": avatar or "assets/channel-avatar-64.png"},
        "videos": sorted(index.values(), key=lambda v: v["n"] if v["n"] is not None else 9999),
        "collections": collections,
    }
    for v in data["videos"]:
        v["order"] = {}

    out_dir.mkdir(parents=True, exist_ok=True)
    blob = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    (out_dir / "videos-data.js").write_text(f"window.SAULS_VIDEOS = {blob};\n", encoding="utf-8")
    (out_dir / "videos-data.json").write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
    print("Wrote", out_dir / "videos-data.js", "and videos-data.json")


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description="Re-scrape YouTube and regenerate videos-data.js")
    ap.add_argument("--out", default=None,
                    help="output directory (default: ../assets next to this script; "
                         "in your repo use: --out public/videos/assets)")
    args = ap.parse_args()
    out = Path(args.out).resolve() if args.out else OUT_DIR
    try:
        main(out)
    except Exception as exc:  # noqa: BLE001
        print("FAILED:", exc)
        sys.exit(1)
