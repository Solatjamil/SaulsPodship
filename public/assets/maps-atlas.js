/* Saul's Podship — Interactive Journey Atlas (additive module widget, 2026-09-08)
   Drops the eight study maps with animated footsteps into:
   - any page containing <div id="atlas"> (e.g. encyclopedia/biblical-maps-atlas.html), or
   - the live Biblical Maps volume page (appended near the bottom of <main>),
   styled strictly with the site's own tokens (cream/wine/gold, Merriweather/EB Garamond/Inter).
   On the live volume page it also moves a "world map" block to the bottom if present. */
(function(){
  var ROUTES = {
    'abraham-journey': { name:"Abraham's Journey", img:'/images/maps/abraham-journey.png',
      stops:[[63,76,'Ur of the Chaldees'],[65.5,25,'Haran'],[75,60,'Canaan — Shechem · Bethel · Hebron']] },
    'exodus': { name:'The Exodus from Egypt', img:'/images/maps/exodus.png',
      stops:[[29,35,'Rameses'],[19,30,'Succoth'],[36,44,'Pi-hahiroth — the Sea crossing'],[41,43,'Elim · Mount Sinai'],[53,53,'Wilderness of Paran'],[75,28,'Kadesh-barnea'],[80,23,'Beersheba → Hebron']] },
    'paul-journeys': { name:"Paul's Missionary Journeys", img:'/images/maps/paul-journeys.png',
      stops:[[34,91,'Jerusalem'],[62,71,'Antioch of Syria'],[64,52,'Seleucia'],[59,67,'Tarsus'],[50,45,'Derbe'],[61,44,'Iconium'],[51,40,'Antioch of Pisidia'],[31,49,'Attalia'],[33,42,'Athens'],[23,28,'Berea'],[23,33,'Philippi']] },
    'seven-churches': { name:'The Seven Churches of Revelation', img:'/images/maps/seven-churches.png',
      stops:[[36,58,'Ephesus'],[44,64,'Smyrna'],[44,42,'Pergamum'],[48,47,'Thyatira'],[45,50,'Sardis'],[50,55,'Philadelphia'],[53,75,'Laodicea'],[36,58,'Return to Ephesus']] },
    'roman-empire-jesus': { name:'The Roman Empire in Jesus’ Time', img:'/images/maps/roman-empire-jesus.png',
      stops:[[64,64,'Jerusalem'],[70,58,'Antioch — believers first called Christians'],[28,46,'Rome — the gospel to the ends of the earth']] },
    'ancient-near-east': { name:'Ancient Near East — Empires & Exiles', img:'/images/maps/ancient-near-east.png',
      stops:[[38,50,'Israel (Samaria)'],[62,36,'Assyrian exile — 722 BC'],[35,68,'Judah (Jerusalem)'],[55,66,'Babylonian exile — 586 BC']] },
    'kingdom-israel-judah': { name:'Kingdom of Israel & Judah', img:'/images/maps/kingdom-israel-judah.png',
      stops:[[45,44,'Samaria — capital of the 10 tribes'],[85,16,'→ Assyria (722 BC)'],[34,87,'Jerusalem — capital of Judah']] },
    'holy-land-jesus': { name:'The Holy Land in the Time of Jesus', img:'/images/maps/holy-land-jesus.png',
      stops:[[52,20,'Nazareth of Galilee'],[37,37,'Capernaum'],[55,47,'Jericho'],[54,70,'Bethlehem'],[50,60,'Jerusalem']] }
  };
  var ORDER = ['abraham-journey','exodus','paul-journeys','seven-churches','holy-land-jesus','kingdom-israel-judah','ancient-near-east','roman-empire-jesus'];

  /* site-token styling, scoped with spa- prefix */
  var st=document.createElement('style');
  st.textContent=[
  '.spa-sec{--sp-cream:#F8F4E3;--sp-wine:#4A152C;--sp-gold:#D4AF37;--sp-gold-d:#B5952F;--sp-pane:#FFFDF6;--sp-line:#E3D8BD;--sp-mut:#7a6a5f;--sp-navy:#1D2D50;background:var(--sp-cream);padding:46px 20px 60px;font-family:Inter,"Segoe UI",system-ui,sans-serif;color:#2a231d}',
  '.spa-sec *{box-sizing:border-box}.spa-sec .head{max-width:1100px;margin:0 auto 18px;text-align:center}',
  '.spa-sec .kick{display:inline-block;border:1px solid var(--sp-gold);padding:5px 18px;font-size:10px;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:var(--sp-gold-d)}',
  '.spa-sec h2{font-family:"Merriweather",Georgia,serif;color:var(--sp-wine);font-size:clamp(1.4rem,3vw,2rem);margin:14px 0 8px}',
  '.spa-sec .lede{font-family:"EB Garamond",Georgia,serif;font-style:italic;color:var(--sp-mut);max-width:760px;margin:0 auto;font-size:1.05rem;line-height:1.65}',
  '.spa-thumbs{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;max-width:1100px;margin:20px auto}',
  '.spa-thumb{cursor:pointer;border:1px solid var(--sp-line);border-radius:6px;overflow:hidden;background:var(--sp-pane);padding:0;font:inherit}',
  '.spa-thumb.on{border-color:var(--sp-wine);box-shadow:0 0 0 2px rgba(74,21,44,.25)}',
  '.spa-thumb img{width:100%;height:88px;object-fit:cover;display:block}',
  '.spa-thumb span{display:block;font-size:10.5px;font-weight:600;padding:6px 4px;color:var(--sp-mut)}',
  '.spa-stage{position:relative;max-width:1100px;margin:0 auto;border:1px solid var(--sp-gold);border-radius:8px;overflow:hidden;background:#e9dfc6;box-shadow:0 10px 30px rgba(74,21,44,.13)}',
  '.spa-stage img.base{width:100%;display:block}',
  '.spa-stage svg.ov{position:absolute;inset:0;width:100%;height:100%}',
  '.spa-layer{position:absolute;inset:0;pointer-events:none}',
  '.spa-ctrl{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:16px auto;align-items:center}',
  '.spa-btn{font-family:Inter,sans-serif;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:11px 18px;border:1px solid var(--sp-wine);background:var(--sp-wine);color:var(--sp-gold);border-radius:4px;cursor:pointer}',
  '.spa-btn.ghost{background:transparent;color:var(--sp-wine)}',
  '.spa-prog{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--sp-gold-d)}',
  '.spa-cap{max-width:860px;margin:10px auto 0;text-align:center;font-family:"EB Garamond",Georgia,serif;font-style:italic;color:var(--sp-mut);font-size:.95rem}',
  '.spa-stopdot{width:12px;height:12px;border-radius:50%;background:var(--sp-wine);border:2px solid var(--sp-cream);margin:0 auto}',
  '.spa-lbl{font-family:Inter,sans-serif;font-size:11px;font-weight:700;color:#3a2410;background:rgba(248,244,227,.92);border:1px solid var(--sp-gold);border-radius:4px;padding:2px 8px;margin-top:4px;display:inline-block;opacity:0;transition:opacity .5s}',
  '.spa-foot{position:absolute;font-size:15px;opacity:0;transition:opacity .4s;pointer-events:none}'
  ].join('\n');
  document.head.appendChild(st);

  var root=document.getElementById('atlas');
  var injected=false;
  if(!root){
    /* auto-inject ONLY on the Biblical Maps volume page; everywhere else require #atlas */
    if(!/\/encyclopedia\/biblical-maps\/?$/.test(location.pathname||'')) return;
    injected=true;
    root=document.createElement('div'); root.id='atlas';
    var main=document.querySelector('main')||document.getElementById('root')||document.body;
    main.appendChild(root);
    /* move a world-map block to the very bottom if the page has one */
    var all=main.querySelectorAll('section,div');
    for(var i=0;i<all.length;i++){
      var h=all[i].querySelector&&all[i].querySelector('h1,h2,h3');
      if(h && /world\s*(faith\s*)?map/i.test(h.textContent||'')){ main.appendChild(all[i]); break; }
    }
  }
  var wrap=document.createElement('div'); wrap.className='spa-sec';
  wrap.innerHTML=
   '<div class="head"><span class="kick">Volume 11 · Supplement</span>'+
   '<h2>Interactive Journey Atlas — Walk the Sacred Maps</h2>'+
   '<p class="lede">Eight study maps — Abraham, the Exodus, Paul, the Seven Churches, the Holy Land in Jesus’ time, the divided kingdoms, the Ancient Near East and the Roman Empire. Choose a map, press “Walk the Journey”, and footsteps trace the route stop by stop.</p></div>'+
   '<div class="spa-thumbs" id="spaThumbs"></div>'+
   '<div class="spa-stage"><img class="base" id="spaImg" alt=""><svg class="ov" viewBox="0 0 100 100" preserveAspectRatio="none"><path id="spaPath" fill="none" stroke="#8B1C2E" stroke-width="2.5" vector-effect="non-scaling-stroke" stroke-dasharray="1" stroke-dashoffset="1" pathLength="1"/></svg><div class="spa-layer" id="spaLayer"></div></div>'+
   '<div class="spa-ctrl"><button class="spa-btn" id="spaPlay">▶ Walk the Journey</button><button class="spa-btn ghost" id="spaReset">⟲ Reset</button><span class="spa-prog" id="spaProg"></span></div>'+
   '<p class="spa-cap" id="spaCap"></p>';
  root.appendChild(wrap);

  var thumbs=wrap.querySelector('#spaThumbs'), img=wrap.querySelector('#spaImg'),
      path=wrap.querySelector('#spaPath'), layer=wrap.querySelector('#spaLayer'),
      prog=wrap.querySelector('#spaProg'), cap=wrap.querySelector('#spaCap');
  var cur=null, raf=null;
  ORDER.forEach(function(k,i){
    var b=document.createElement('button'); b.className='spa-thumb'+(i===0?' on':'');
    b.innerHTML='<img src="'+ROUTES[k].img+'" alt=""><span>'+ROUTES[k].name+'</span>';
    b.onclick=function(){ thumbs.querySelectorAll('.spa-thumb').forEach(function(x){x.classList.remove('on')}); b.classList.add('on'); select(k); };
    thumbs.appendChild(b);
  });
  function select(k){
    cur=k; if(raf) cancelAnimationFrame(raf);
    var r=ROUTES[k];
    img.src=(injected?'':'')+r.img; img.alt=r.name+' — interactive journey map';
    cap.textContent=r.name+' — press “Walk the Journey” and footsteps will trace the route stop by stop.';
    path.setAttribute('d', r.stops.map(function(s,i){return (i?'L':'M')+s[0]+' '+s[1];}).join(' '));
    path.style.strokeDashoffset=1;
    layer.innerHTML='';
    r.stops.forEach(function(s,i){
      var d=document.createElement('div');
      d.style.cssText='position:absolute;left:'+s[0]+'%;top:'+s[1]+'%;transform:translate(-50%,-50%);text-align:center';
      d.innerHTML='<div class="spa-stopdot"></div><div class="spa-lbl">'+(i+1)+'. '+s[2]+'</div>';
      layer.appendChild(d);
    });
    prog.textContent='';
  }
  function segs(stops){var out=[],total=0;for(var i=0;i<stops.length-1;i++){var dx=stops[i+1][0]-stops[i][0],dy=stops[i+1][1]-stops[i][1],len=Math.sqrt(dx*dx+dy*dy);out.push({a:stops[i],b:stops[i+1],len:len,ang:Math.atan2(dy,dx)*180/Math.PI});total+=len;}return{list:out,total:total};}
  function pointAt(S,d){for(var i=0;i<S.list.length;i++){if(d<=S.list[i].len){var t=d/S.list[i].len,s=S.list[i];return{x:s.a[0]+(s.b[0]-s.a[0])*t,y:s.a[1]+(s.b[1]-s.a[1])*t,ang:s.ang};}d-=S.list[i].len;}var l=S.list[S.list.length-1];return{x:l.b[0],y:l.b[1],ang:l.ang};}
  var DUR=14000, STEP=2.2;
  wrap.querySelector('#spaPlay').onclick=function(){
    if(!cur) return; if(raf) cancelAnimationFrame(raf);
    var r=ROUTES[cur], S=segs(r.stops), t0=null, next=0, side=1, shown=0;
    layer.querySelectorAll('.spa-lbl').forEach(function(l){l.style.opacity=0});
    layer.querySelectorAll('.spa-foot').forEach(function(f){f.remove()});
    path.style.strokeDashoffset=1;
    function frame(ts){
      if(!t0)t0=ts;
      var p=Math.min(1,(ts-t0)/DUR), d=p*S.total, w=pointAt(S,d);
      path.style.strokeDashoffset=1-p;
      while(next<=d){
        var fp=pointAt(S,next), e=document.createElement('div'), off=side>0?1.4:-1.4, rad=(fp.ang+90)*Math.PI/180;
        e.className='spa-foot'; e.textContent='👣';
        e.style.cssText+=';left:'+(fp.x+off*Math.cos(rad))+'%;top:'+(fp.y+off*Math.sin(rad))+'%;transform:translate(-50%,-50%) rotate('+(fp.ang+90+(side>0?8:-8))+'deg)';
        e.style.opacity=1; layer.appendChild(e);
        side*=-1; next+=STEP;
      }
      var labels=layer.querySelectorAll('.spa-lbl');
      while(shown<labels.length){
        var sd=0; for(var i=0;i<shown;i++) sd+=Math.hypot(r.stops[i+1][0]-r.stops[i][0],r.stops[i+1][1]-r.stops[i][1]);
        if(d>=sd-0.001){ labels[shown].style.opacity=1; shown++; } else break;
      }
      prog.textContent=Math.round(p*100)+'% of the journey';
      if(p<1) raf=requestAnimationFrame(frame);
      else { layer.querySelectorAll('.spa-lbl').forEach(function(l){l.style.opacity=1}); prog.textContent='Journey complete ✓'; }
    }
    raf=requestAnimationFrame(frame);
  };
  wrap.querySelector('#spaReset').onclick=function(){ select(cur); };
  select(ORDER[0]);
})();
