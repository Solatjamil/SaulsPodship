/* Saul's Podship — Companion Module retrofit (drop-in for ALL 50 volume pages)
   Usage: <script src="/assets/companion.js" defer></script> in the volume template.
   Per the 2026-09-08 spec: removes the companion "view" cards and renders plain
   ROUTING BUTTONS at the BOTTOM of the content, styled with the site's own tokens
   (wine #4A152C / gold #D4AF37 / Inter). Does not touch any other UI. */
(function(){
  function findCompanion(){
    var nodes=document.querySelectorAll('h2,h3,h4,div,span,p');
    for(var i=0;i<nodes.length;i++){
      var t=(nodes[i].textContent||'').trim();
      if(/^Companion Modules$/i.test(t)) return nodes[i];
    }
    return null;
  }
  function btn(t){
    var a=document.createElement('a');
    a.href=t.href; a.textContent=t.label;
    a.style.cssText='display:inline-flex;align-items:center;gap:8px;font-family:Inter,"Segoe UI",sans-serif;font-weight:700;font-size:11px;letter-spacing:.12em;text-transform:uppercase;padding:12px 20px;border-radius:4px;text-decoration:none;background:#4A152C;color:#D4AF37;border:1px solid #4A152C';
    return a;
  }
  function run(){
    var head=findCompanion(); if(!head) return;
    var sec=head; for(var up=0; up<5 && sec.parentElement; up++){ sec=sec.parentElement; if(sec.querySelectorAll('a').length>=3) break; }
    if(document.querySelector('[data-companion-routes]')) return; /* idempotent */
    var bar=document.createElement('div');
    bar.setAttribute('data-companion-routes','1');
    bar.style.cssText='display:flex;flex-wrap:wrap;gap:12px;justify-content:center;align-items:center;margin:34px auto 12px;text-align:center;max-width:1100px';
    var label=document.createElement('div');
    label.style.cssText='width:100%;font-family:Inter,sans-serif;font-size:10px;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:#B5952F';
    label.textContent='Companion Modules';
    bar.appendChild(label);
    [ {href:'/kings-of-the-bible',label:'Kings of the Bible'},
      {href:'/prophecy-map',label:'Biblical Prophecy Map'},
      {href:'/cross-references',label:'The Interlinked Bible'},
      {href:'/comparative-apologetics',label:'Comparative Apologetics'} ]
      .forEach(function(t){ bar.appendChild(btn(t)); });
    var main=document.querySelector('main')||document.getElementById('root')||document.body;
    main.appendChild(bar); /* bottom of the content */
    try{ sec.remove(); }catch(e){}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){setTimeout(run,300)});
  else setTimeout(run,300);
  setTimeout(run,1200); setTimeout(run,3000); /* SPA repaints */
})();
