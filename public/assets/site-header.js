/* Saul's Podship — logo sync + official header injector + hero banner system
   Loaded in the global SPA template AND on standalone module shells.
   - Syncs brand assets (favicon / apple-touch-icon / OG image) on every page.
   - Injects the official centered site header (logo + nav, NO YouTube /
     Browse-50-Volumes) where it is missing: Comparative Apologetics, any
     #sp-header mount, and standalone module shells (never when iframed).
   - Responsive Divi-style hero banners: any [data-hero] element receives a
     cover background + scrim; mobile = landscape crop with text at bottom. */
(function(){
  var path=(location.pathname||'');
  var inFrame=(function(){ try{ return window.self!==window.top; }catch(e){ return true; } })();

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

  /* ---- responsive hero banner system (every page this script loads on) ---- */
  var hs=document.createElement('style');
  hs.textContent=
    '[data-hero]{position:relative;overflow:hidden;background-size:cover;background-position:center;background-color:#1A0812}'+
    '[data-hero] .sp-hero-scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(26,8,18,.60) 0%,rgba(26,8,18,.30) 45%,rgba(26,8,18,.82) 100%);pointer-events:none}'+
    '[data-hero]>*:not(.sp-hero-scrim){position:relative}'+
    '@media (min-width:768px){[data-hero]{min-height:340px}}'+
    '@media (max-width:767px){[data-hero]{min-height:200px;display:flex;flex-direction:column;justify-content:flex-end}}';
  document.head.appendChild(hs);
  function wireHero(){
    var els=document.querySelectorAll('[data-hero]');
    for(var i=0;i<els.length;i++){ var el=els[i];
      if(el.__spHero) continue; el.__spHero=1;
      el.style.backgroundImage='url("'+el.getAttribute('data-hero')+'")';
      var sc=document.createElement('div'); sc.className='sp-hero-scrim';
      el.insertBefore(sc,el.firstChild);
    }
  }
  function initHero(){ if(document.body) wireHero(); else document.addEventListener('DOMContentLoaded',wireHero); setTimeout(wireHero,900); setTimeout(wireHero,2600); }
  initHero();

  /* ---- header injection ---- */
  var shell=/^\/(cross-references|prophecy-map|kings-of-the-bible|biblical-maps|world-religion-map|encyclopedia\/biblical-maps-atlas)/.test(path)
         || /\/(prophecy-map|kings-of-the-bible)\.html$/.test(path);
  var needs=/^\/comparative-apologetics/.test(path) || document.getElementById('sp-header') || (shell && !inFrame);
  if(!needs) return;
  var st=document.createElement('style');
  st.textContent='.sp-hdr{position:sticky;top:0;z-index:300;background:rgba(22,6,15,.92);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid rgba(212,175,55,.2);box-shadow:0 2px 12px rgba(0,0,0,.35);font-family:Inter,"Segoe UI",system-ui,sans-serif;color:#fff}'+
  '.sp-hdr .row{display:flex;align-items:center;justify-content:center;gap:4px;flex-wrap:wrap;padding:8px 12px;max-width:1280px;margin:0 auto;text-align:center}'+
  '.sp-hdr .brand{display:flex;align-items:center;gap:10px;margin-right:14px;text-decoration:none}'+
  '.sp-hdr .brand img{height:44px;width:44px;object-fit:contain;display:block;filter:drop-shadow(0 2px 8px rgba(0,0,0,.45))}'+
  '.sp-hdr .brand b{font-family:"EB Garamond","Merriweather",Georgia,serif;font-size:16px;color:#fff;display:block;line-height:1.15;white-space:nowrap}'+
  '.sp-hdr .brand small{display:block;font-size:9px;letter-spacing:.18em;color:rgba(212,175,55,.9);text-transform:uppercase;font-weight:600;white-space:nowrap}'+
  '.sp-hdr a.nl{font-size:12px;font-weight:600;letter-spacing:.02em;color:rgba(255,255,255,.8);text-decoration:none;padding:8px 11px;border-radius:8px;border:1px solid transparent}'+
  '.sp-hdr a.nl:hover{color:#E8C96A;background:rgba(255,255,255,.1)}'+
  '.sp-hdr a.nl.on{background:#4A152C;color:#E8C96A;border-color:rgba(212,175,55,.4)}'+
  '.sp-hdr a.cta{font-size:12px;font-weight:700;color:#1A0812;background:#D4AF37;padding:8px 14px;border-radius:8px;text-decoration:none}'+
  '.sp-hdr a.cta:hover{background:#E8C96A}'+
  '@media (max-width:767px){.sp-hdr .row{padding:6px 8px;gap:2px}.sp-hdr a.nl{font-size:11px;padding:5px 8px}.sp-hdr a.cta{font-size:11px;padding:6px 10px}.sp-hdr .brand img{height:34px;width:34px}.sp-hdr .brand b{font-size:14px}.sp-hdr .brand small{font-size:7.5px;letter-spacing:.16em}}'+
  '.sp-hdr ~ #sp-chrome-bar{display:none!important}';
  document.head.appendChild(st);
  var hdr=document.createElement('header'); hdr.className='sp-hdr';
  hdr.innerHTML='<div class="row">'+
    '<a class="brand" href="/"><img src="/icons/emblem.png" alt="Saul’s Podship logo"><span><b>Saul’s Podship</b><small>Theological Encyclopedia</small></span></a>'+
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
  function setH(){ document.documentElement.style.setProperty('--sp-hdr-h', hdr.offsetHeight+'px'); }
  setH(); window.addEventListener('resize', setH); window.addEventListener('load', setH);
})();
