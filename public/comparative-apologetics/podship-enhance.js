/* ============================================================
   Saul's Podship enhancer — comparative-apologetics add-on
   Injects the shared language (EN/اردو/हिन्दी/العربية) and
   dark/light toggles at the top, translates section chrome,
   wires scroll-reveal animations, and shares the main site's
   sp-lang / sp-theme localStorage preferences.
   The page's own content markup is never modified.
   ============================================================ */
(function () {
  "use strict";

  var RTL = { ur: 1, ar: 1 };
  // EN → { lang: translation } (exact-match, chrome strings only)
  var DICT = {
    "Comparative Apologetics": { ur: "موازنہ دفاعیات", hi: "तुलनात्मक क्षमावाक्य", ar: "الدفاعيّات المقارنة" },
    "A Christian's Guide to Comparative Apologetics": { ur: "موازنہ دفاعیات کا مسیحی رہنما", hi: "तुलनात्मक क्षमावाक्य का ईसाई मार्गदर्शिका", ar: "دليل المسيحي إلى الدفاعيات المقارنة" },
    "A Note on Method": { ur: "طریقۂ کار پر نوٹ", hi: "विधि पर टिप्पणी", ar: "ملاحظة في المنهج" },
    "Points of Critical Inquiry": { ur: "نقدی مطالعے کے نکات", hi: "गहन परीक्षा के बिंदु", ar: "نقاط البحث النقدي" },
    "Volume I": { ur: "جلد اوّل", hi: "खंड प्रथम", ar: "المجلد الأول" },
    "Volume II": { ur: "جلد دوم", hi: "खंड द्वितीय", ar: "المجلد الثاني" },
    "Volume III": { ur: "جلد سوم", hi: "खंड तृतीय", ar: "المجلد الثالث" },
    "Volume IV": { ur: "جلد چہارم", hi: "खंड चतुर्थ", ar: "المجلد الرابع" },
    "Islam": { ur: "اسلام", hi: "इस्लाम", ar: "الإسلام" },
    "Judaism": { ur: "یہودیت", hi: "यहूदी धर्म", ar: "اليهودية" },
    "Hinduism": { ur: "ہندو مت", hi: "हिन्दू धर्म", ar: "الهندوسية" },
    "Sikhism": { ur: "سکھ مت", hi: "सिख धर्म", ar: "السيखية" },
    "Table of Contents": { ur: "فہرست", hi: "विषय-सूची", ar: "جدول المحتويات" },
    "Search": { ur: "تلاش", hi: "खोज", ar: "بحث" },
    "Back to top": { ur: "اوپر جائیں", hi: "ऊपर लौटें", ar: "إلى الأعلى" }
  };

  var lang = "en", theme = "light";
  try {
    lang = localStorage.getItem("sp-lang") || "en";
    theme = "light"; /* canonical Podship wine/cream look */
  } catch (e) {}

  function applyLang(l) {
    document.documentElement.lang = l;
    document.documentElement.dir = RTL[l] ? "rtl" : "ltr";
    document.documentElement.setAttribute("data-lang", l);
    // restore previous
    Array.prototype.forEach.call(document.querySelectorAll("[data-sp-i18n]"), function (el) {
      el.textContent = el.getAttribute("data-sp-orig") || el.textContent;
      el.removeAttribute("data-sp-i18n");
    });
    if (l === "en") return;
    Array.prototype.forEach.call(
      document.querySelectorAll("h1, h2, h3, .toc a, nav a, button.doc-title, .hero-eyebrow, .section-eyebrow, .section-sub"),
      function (el) {
        if (el.children.length && el.tagName !== "A") return;
        var t = (el.textContent || "").replace(/\s+/g, " ").trim();
        var hit = DICT[t];
        if (hit && hit[l]) {
          el.setAttribute("data-sp-orig", t);
          el.setAttribute("data-sp-i18n", l);
          el.textContent = hit[l];
        }
      }
    );
  }

  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("sp-theme", t); } catch (e) {}
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "dark" ? "#16060F" : "#F8F4E3");
  }

  function mount() {
    if (window.self !== window.top) return; /* embedded: SPA provides the header */
    var bar = document.createElement("div");
    bar.id = "sp-chrome-bar";
    bar.style.cssText =
      "position:sticky;top:0;z-index:9999;display:flex;align-items:center;justify-content:flex-end;gap:10px;" +
      "padding:8px 18px;background:rgba(22,6,15,.92);backdrop-filter:blur(8px);border-bottom:1px solid rgba(212,175,55,.28);" +
      "font:600 13px Inter,system-ui,sans-serif;";
    bar.innerHTML =
      '<a href="https://www.saulspodship.com/" style="margin-right:auto;display:flex;align-items:baseline;gap:10px;text-decoration:none;">' +
      '<img src="/icons/emblem.png" alt="" width="22" height="22" style="border-radius:50%;" />' +
      '<span style="font:700 17px \'EB Garamond\',\'Merriweather\',Georgia,serif;color:#E8C96A;">\u2393 Saul\u2019s Podship</span>' +
      '<span style="font:800 9.5px Inter,system-ui,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:rgba(248,244,227,.5);">Comparative Apologetics Codex</span></a>' +
      '<select id="sp-lang" aria-label="Language" style="appearance:none;background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(212,175,55,.35);border-radius:10px;padding:5px 22px 5px 9px;font:700 12px Inter,sans-serif;cursor:pointer;">' +
      '<option value="en">English</option><option value="ur">\u0627\u0631\u062F\u0648</option><option value="hi">\u0939\u093f\u0928\u094d\u0926\u0940</option><option value="ar">\u0627\u0644\u0639\u0631\u0628\u064a\u0629</option></select>' +
      '<button id="sp-theme" aria-label="Toggle dark mode" title="Toggle dark / light" style="background:rgba(255,255,255,.08);border:1px solid rgba(212,175,55,.35);border-radius:10px;padding:5px 10px;cursor:pointer;color:#E8C96A;font-size:14px;">\u263D</button>';
    document.body.insertBefore(bar, document.body.firstChild);
    bar.querySelector("#sp-lang").value = lang;
    bar.querySelector("#sp-lang").addEventListener("change", function () {
      lang = this.value;
      try { localStorage.setItem("sp-lang", lang); } catch (e) {}
      applyLang(lang);
    });
    bar.querySelector("#sp-theme").addEventListener("click", function () {
      theme = theme === "dark" ? "light" : "dark";
      this.textContent = theme === "dark" ? "\u2600" : "\u263D";
      applyTheme(theme);
    });
    if (theme === "dark") bar.querySelector("#sp-theme").textContent = "\u2600";
  }


  /* ----- close control for the left navigation (mobile) ----- */
  function sidebarClose() {
    var sb = document.getElementById("sidebar"), tg = document.getElementById("menuToggle");
    if (!sb || !tg || sb.querySelector("#sp-sb-close")) return;
    var x = document.createElement("button");
    x.id = "sp-sb-close"; x.type = "button"; x.setAttribute("aria-label", "Close navigation"); x.innerHTML = "&times;";
    x.style.cssText = "position:absolute;top:10px;right:10px;z-index:5;background:rgba(255,255,255,.08);border:1px solid rgba(212,175,55,.45);color:#E8C96A;border-radius:10px;width:36px;height:36px;font-size:20px;line-height:1;cursor:pointer;";
    sb.appendChild(x);
    var bd = document.createElement("div"); bd.id = "sp-sb-backdrop";
    bd.style.cssText = "display:none;position:fixed;inset:0;background:rgba(10,4,8,.55);z-index:55;";
    document.body.appendChild(bd);
    function close() { sb.classList.remove("open"); bd.style.display = "none"; }
    x.addEventListener("click", close);
    bd.addEventListener("click", close);
    tg.addEventListener("click", function () { bd.style.display = sb.classList.contains("open") ? "block" : "none"; });
    sb.addEventListener("click", function (e) { if (e.target.closest("a")) close(); });
  }
  function reveal() {
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var el = en.target;
          el.classList.add("sp-in");
          io.unobserve(el);
        }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
    var sibs = {};
    Array.prototype.forEach.call(document.querySelectorAll(".qcard, .section-title, .doc-title, .coll, figure"), function (el) {
      if (el.hasAttribute("data-sp-reveal")) return;
      el.setAttribute("data-sp-reveal", "1");
      var p = el.parentElement; var i = sibs[p] = (sibs[p] || 0) + 1;
      el.style.animationDelay = Math.min(i, 6) * 60 + "ms";
      io.observe(el);
      if (Object.keys(sibs).length > 600) io.disconnect();
    });
  }

  function boot() {
    mount(); sidebarClose();
    applyTheme(theme);
    applyLang(lang);
    reveal();
    // sections added lazily (print modes etc.)
    new MutationObserver(function () { reveal(); }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
