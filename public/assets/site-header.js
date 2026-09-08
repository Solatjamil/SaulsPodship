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
  '.sp-hdr .row{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:6px 16px;max-width:1280px;margin:0 auto;min-height:56px}'+
  '.sp-hdr .brand{display:flex;align-items:center;gap:10px;text-decoration:none;min-width:0}'+
  '.sp-hdr .brand img{height:44px;width:44px;object-fit:contain;display:block;filter:drop-shadow(0 2px 8px rgba(0,0,0,.45))}'+
  '.sp-hdr .brand b{font-family:"EB Garamond","Merriweather",Georgia,serif;font-size:16px;color:#fff;display:block;line-height:1.15;white-space:nowrap}'+
  '.sp-hdr .brand small{display:block;font-size:9px;letter-spacing:.18em;color:rgba(212,175,55,.9);text-transform:uppercase;font-weight:600;white-space:nowrap}'+
  '.sp-hdr .nav{display:none;align-items:center;gap:4px;margin-left:auto}'+
  '.sp-hdr a.nl{font-size:12px;font-weight:600;color:rgba(255,255,255,.8);text-decoration:none;padding:8px 12px;border-radius:8px;border:1px solid transparent;white-space:nowrap}'+
  '.sp-hdr a.nl:hover{color:#E8C96A;background:rgba(255,255,255,.1)}'+
  '.sp-hdr a.nl.on{background:#4A152C;color:#E8C96A;border-color:rgba(212,175,55,.4)}'+
  '.sp-hdr a.cta{font-size:12px;font-weight:700;color:#1A0812;background:#D4AF37;padding:8px 14px;border-radius:8px;text-decoration:none;white-space:nowrap}'+
  '.sp-hdr a.cta:hover{background:#E8C96A}'+
  '.sp-hdr .burger{display:flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:12px;background:rgba(255,255,255,.1);border:0;color:#fff;cursor:pointer}'+
  '.sp-hdr .burger:hover{background:rgba(255,255,255,.2)}'+
  '.sp-hdr .burger svg{width:24px;height:24px}'+
  '.sp-hdr .drawer{display:none;background:#1A0812;border-bottom:1px solid rgba(212,175,55,.2);padding:12px 16px 24px;text-align:left}'+
  '.sp-hdr.open .drawer{display:block}'+
  '.sp-hdr .drawer a{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-radius:12px;font-size:14px;font-weight:600;color:rgba(255,255,255,.9);text-decoration:none;margin-bottom:6px}'+
  '.sp-hdr .drawer a:hover{background:rgba(255,255,255,.1)}'+
  '.sp-hdr .drawer a.on{background:#4A152C;color:#E8C96A;border:1px solid rgba(212,175,55,.3)}'+
  '.sp-hdr .drawer a i{font-style:normal;opacity:.5}'+
  '@media (min-width:1024px){.sp-hdr .nav{display:flex}.sp-hdr .burger{display:none}.sp-hdr .drawer{display:none!important}}'+
  '.sp-hdr ~ #sp-chrome-bar{display:none!important}';
  document.head.appendChild(st);
  var hdr=document.createElement('header'); hdr.className='sp-hdr';
  function nl(href,label){ var on=(path===href)||(href!=='/'&&path.indexOf(href)===0); return '<a class="nl'+(on?' on':'')+'" href="'+href+'">'+label+'</a>'; }
  function dl(href,label){ var on=(path===href)||(href!=='/'&&path.indexOf(href)===0); return '<a class="'+(on?'on':'')+'" href="'+href+'"><span>'+label+'</span><i>&#8250;</i></a>'; }
  var links=[['/prophecy-map','Prophecy Map'],['/kings-of-the-bible','Kings of the Bible'],['/cross-references','Interlinked Bible'],['/encyclopedia','Encyclopedia'],['/comparative-apologetics','Comparative Apologetics'],['/podcast','Podcast'],['/music','Music &amp; Zaboor']];
  var navH='',drwH='';
  for(var i=0;i<links.length;i++){ navH+=nl(links[i][0],links[i][1]); drwH+=dl(links[i][0],links[i][1]); }
  hdr.innerHTML='<div class="row">'+
    '<a class="brand" href="/"><img src="/icons/emblem.png" alt="Saul\u2019s Podship logo"><span><b>Saul\u2019s Podship</b><small>Theological Encyclopedia</small></span></a>'+
    '<nav class="nav">'+navH+'<a class="cta" href="/support">Support</a></nav>'+
    '<button class="burger" type="button" aria-label="Toggle navigation menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button>'+
    '</div>'+
    '<div class="drawer">'+drwH+'<a href="/support"><span>Support</span><i>&#8250;</i></a></div>';
  var mount=document.getElementById('sp-header');
  if(mount) mount.replaceWith(hdr); else document.body.insertBefore(hdr,document.body.firstChild);
  var burger=hdr.querySelector('.burger');
  burger.addEventListener('click',function(){
    var open=hdr.classList.toggle('open');
    burger.innerHTML=open?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    setH();
  });
  hdr.querySelector('.drawer').addEventListener('click',function(e){ if(e.target.closest('a')){ hdr.classList.remove('open'); setH(); } });
  document.addEventListener('click',function(e){ var inHdr=e.composedPath?e.composedPath().indexOf(hdr)>-1:hdr.contains(e.target); if(!inHdr&&hdr.classList.contains('open')){ hdr.classList.remove('open'); setH(); } });
  function setH(){ document.documentElement.style.setProperty('--sp-hdr-h', hdr.offsetHeight+'px'); }
  setH(); window.addEventListener('resize', setH); window.addEventListener('load', setH);
})();
