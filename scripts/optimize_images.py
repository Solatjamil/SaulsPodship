#!/usr/bin/env python3
"""
optimize_images.py — shrink bloated images in public/ so every Vercel deployment
stores far less (Vercel Deployment Storage keeps a full copy of the build output
for every retained deployment; ~90 deployments x ~130 MB became ~11 GB).

Phases (all in-place / same filenames unless noted):
  0. hero webp: volumes that have hero-1920.jpg but NO hero-1920.webp get one
     (1600px wide, q75). Hero.tsx already references hero-1920.webp — today it
     404s and desktop falls back to a ~2 MB JPG. New files are meant to be committed.
  1. JPG: if a .webp sibling exists (modern browsers use webp, jpg is legacy-only)
     -> downscale to 1280 max side, q70. Otherwise -> 1600 max side, q78.
  2. WEBP: files > 200 KB re-encoded at q75 (method 6).
  3. PNG: > 150 KB converted to adaptive 256-color palette (alpha preserved).
Never re-encodes unless the result is >= 10% smaller. Git history is the backup.

Usage:
  python3 scripts/optimize_images.py            # apply
  python3 scripts/optimize_images.py --dry-run  # report only
"""
import os
import sys
from PIL import Image

Image.MAX_IMAGE_PIXELS = None

ROOT = os.path.join(os.path.dirname(__file__), "..", "public")
VOL = os.path.join(ROOT, "images", "volumes")


def has_alpha(im: Image.Image) -> bool:
    if im.mode in ("RGBA", "LA", "PA"):
        return True
    if im.mode == "P":
        return "transparency" in im.info
    return False


def downscale(im: Image.Image, max_side: int) -> Image.Image:
    w, h = im.size
    side = max(w, h)
    if max_side and side > max_side:
        f = max_side / side
        im = im.resize((round(w * f), round(h * f)), Image.Resampling.LANCZOS)
    return im


def swap_if_smaller(path: str, tmp: str) -> int | None:
    orig, new = os.path.getsize(path), os.path.getsize(tmp)
    if new < orig * 0.90:
        os.replace(tmp, path)
        return new
    os.remove(tmp)
    return None


def phase0_hero_webp(dry: bool) -> tuple[int, int]:
    made = saved = 0
    if not os.path.isdir(VOL):
        return made, saved
    for d in sorted(os.listdir(VOL)):
        jpg = os.path.join(VOL, d, "hero-1920.jpg")
        webp = os.path.join(VOL, d, "hero-1920.webp")
        if not os.path.isfile(jpg) or os.path.isfile(webp):
            continue
        made += 1
        if dry:
            continue
        with Image.open(jpg) as im:
            im = downscale(im.convert("RGB"), 1600)
            im.save(webp, "WEBP", quality=75, method=6)
        saved -= os.path.getsize(webp)  # new bytes added (reported as negative saving)
    return made, saved


def compress_jpg(path: str) -> int | None:
    sibling = os.path.splitext(path)[0] + ".webp"
    legacy_only = os.path.isfile(sibling)
    max_side, q = (1280, 70) if legacy_only else (1600, 78)
    with Image.open(path) as im:
        im = downscale(im.convert("RGB"), max_side)
        tmp = path + ".tmp.jpg"
        im.save(tmp, quality=q, optimize=True, progressive=True, subsampling=2)
        return swap_if_smaller(path, tmp)


def compress_webp(path: str) -> int | None:
    with Image.open(path) as im:
        alpha = has_alpha(im)
        im = im.convert("RGBA") if alpha else im.convert("RGB")
        tmp = path + ".tmp.webp"
        im.save(tmp, "WEBP", quality=75, method=6, lossless=False)
        return swap_if_smaller(path, tmp)


def compress_png(path: str) -> int | None:
    with Image.open(path) as im:
        im.load()
        alpha = has_alpha(im)
        if alpha:
            q = im.quantize(colors=256, method=Image.Quantize.FASTOCTREE)
        else:
            q = im.convert("RGB").quantize(
                colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG
            )
        tmp = path + ".tmp.png"
        q.save(tmp, optimize=True)
        return swap_if_smaller(path, tmp)


def main() -> None:
    dry = "--dry-run" in sys.argv
    made, added = phase0_hero_webp(dry)
    print(f"phase 0: {made} missing hero-1920.webp generated ({-added/1e6:.1f} MB added, fixes desktop 404 + 2MB jpg fallback)")

    rows = []
    saved = touched = 0
    for dirpath, _dirs, files in os.walk(ROOT):
        for f in sorted(files):
            low = f.lower()
            if ".tmp." in low:
                continue
            p = os.path.join(dirpath, f)
            try:
                size = os.path.getsize(p)
            except OSError:
                continue
            fn = None
            if low.endswith((".jpg", ".jpeg")) and size >= 60 * 1024:
                fn = compress_jpg
            elif low.endswith(".webp") and size >= 200 * 1024:
                fn = compress_webp
            elif low.endswith(".png") and size >= 150 * 1024:
                fn = compress_png
            if not fn:
                continue
            if dry:
                rows.append((size, None, p))
                continue
            try:
                new = fn(p)
            except Exception as e:
                print(f"  SKIP {p}: {e}")
                continue
            if new is not None:
                saved += size - new
                touched += 1
                rows.append((size, new, p))

    rows.sort(key=lambda r: r[0] - (r[1] or 0), reverse=True)
    for orig, new, p in rows[:25]:
        rel = os.path.relpath(p, os.path.join(ROOT, ".."))
        print(f"  {orig/1e6:6.2f} MB -> {(new or orig)/1e6:5.2f} MB  {rel}" if new else f"  {orig/1e6:6.2f} MB           {rel}")
    if dry:
        print(f"\n[dry-run] {len(rows)} candidate file(s)")
    else:
        print(f"\nRe-encoded {touched} file(s), saved {saved/1e6:.1f} MB (plus phase-0 webp additions)")


if __name__ == "__main__":
    main()
