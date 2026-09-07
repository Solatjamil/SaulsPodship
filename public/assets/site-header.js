/* Saul's Podship — Logo sync + official header injector (2026-09-08)
   Usage: <script src="/assets/site-header.js" defer></script> in the global template.
   - On EVERY page it loads: syncs the brand (favicon, apple-touch-icon, OG/Twitter
     image point at the real /icons/ logo files).
   - Injects the official site header (logo + aligned nav, NO YouTube / Browse-50-Volumes
     buttons) on pages that lack it — specifically the Comparative Apologetics section,
     and any page with a <div id="sp-header"></div> mount.
   - Never touches /cross-references (The Interlinked Bible). */
(function(){
  var path=(location.pathname||'');
  if(/^\/cross-references/.test(path)) return;

  /* ---- logo sync on every page ---- */
  function link(rel,href,sizes){
    var l=document.createElement('link'); l.rel=rel; l.href=href; if(sizes) l.sizes=sizes;
    document.head.appendChild(l);
  }
  if(!document.querySelector('link[rel="icon"]')) link('icon','/icons/favicon.png');
  if(!document.querySelector('link[rel="shortcut icon"]')) link('shortcut icon','/icons/favicon.png');
  if(!document.querySelector('link[rel="apple-touch-icon"]')) link('apple-touch-icon','/icons/apple-touch-icon.png','180x180');
  function og(prop,href){ var m=document.createElement('meta'); m.setAttribute(prop.startsWith('tw')?'name':'property',prop); m.content=href; document.head.appendChild(m); }
  if(!document.querySelector('meta[property="og:image"]')) og('property:og:image','https://www.saulspodship.com/icons/brand-logo.png');
  if(!document.querySelector('meta[name="twitter:image"]')) og('tw:twitter:image','https://www.saulspodship.com/icons/brand-logo.png');

  /* ---- header injection where missing ---- */
  var needs=/^\/comparative-apologetics/.test(path) || document.getElementById('sp-header');
  if(!needs) return;
  var st=document.createElement('style');
  st.textContent='.sp-hdr{--w:#4A152C;--w2:#8B1C2E;--g:#D4AF37;--g2:#E8C96A;--c:#F8F4E3;position:sticky;top:0;z-index:80;background:rgba(248,244,227,.96);backdrop-filter:blur(8px);border-bottom:1px solid rgba(212,175,55,.45);font-family:Inter,"Segoe UI",system-ui,sans-serif}'+
  '.sp-hdr .row{display:flex;align-items:center;justify-content:center;gap:6px;flex-wrap:wrap;padding:10px 14px;max-width:1240px;margin:0 auto;text-align:center}'+
  '.sp-hdr .brand{display:flex;align-items:center;gap:10px;margin-right:16px;text-decoration:none}'+
  '.sp-hdr .brand img{height:38px;width:auto;display:block}'+
  '.sp-hdr .brand b{font-family:"EB Garamond","Merriweather",Georgia,serif;font-size:17px;color:var(--w);display:block;line-height:1.1}'+
  '.sp-hdr .brand small{display:block;font-size:8.5px;letter-spacing:.28em;color:#B5952F;text-transform:uppercase}'+
  '.sp-hdr a.nl{font-size:12.5px;font-weight:600;color:#2a231d;text-decoration:none;padding:8px 12px;border-radius:8px;border:1px solid transparent}'+
  '.sp-hdr a.nl:hover{background:rgba(212,175,55,.15);border-color:rgba(212,175,55,.5)}'+
  '.sp-hdr a.cta{font-size:12.5px;font-weight:700;color:#fff;background:var(--w);padding:8px 15px;border-radius:8px;text-decoration:none}'+
  '.sp-hdr a.cta:hover{background:var(--w2)}';
  document.head.appendChild(st);
  var hdr=document.createElement('header'); hdr.className='sp-hdr';
  hdr.innerHTML='<div class="row">'+
    '<a class="brand" href="/"><img src="/icons/brand-logo.png" alt="Saul’s Podship logo"><span><b>Saul’s Podship</b><small>Digital Scriptorium</small></span></a>'+
    '<a class="nl" href="/prophecy-map">Prophecy Map</a>'+
    '<a class="nl" href="/kings-of-the-bible">Kings of the Bible</a>'+
    '<a class="nl" href="/cross-references">Interlinked Bible</a>'+
    '<a class="nl" href="/encyclopedia">Encyclopedia</a>'+
    '<a class="nl" href="/comparative-apologetics">Comparative Apologetics</a>'+
    '<a class="nl" href="/podcast">Podcast</a>'+
    '<a class="nl" href="/music">Music &amp; Zaboor</a>'+
    '<a class="cta" href="/support">Support</a>'+
    '</div>';
  var mount=document.getElementById('sp-header');
  if(mount) mount.replaceWith(hdr); else document.body.insertBefore(hdr,document.body.firstChild);
})();
