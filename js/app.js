window.addEventListener('load',()=>setTimeout(()=>document.getElementById('loader').classList.add('done'),1900));

/* ── AUDIO ── */
let _ac=null;
const ac=()=>{if(!_ac)_ac=new(window.AudioContext||window.webkitAudioContext)();return _ac};
function bubblePop(s=1){try{const c=ac(),o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.type='sine';o.frequency.setValueAtTime(700+s*200,c.currentTime);o.frequency.exponentialRampToValueAtTime(180,c.currentTime+.16);g.gain.setValueAtTime(.07,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.2);o.start();o.stop(c.currentTime+.22)}catch(e){}}
function splash(){try{const c=ac();[0,30,60,90].forEach(d=>setTimeout(()=>{const buf=c.createBuffer(1,c.sampleRate*.07,c.sampleRate),data=buf.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*Math.pow(1-i/data.length,2);const src=c.createBufferSource(),g=c.createGain(),f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=800+Math.random()*900;src.buffer=buf;src.connect(f);f.connect(g);g.connect(c.destination);g.gain.value=.035;src.start()},d))}catch(e){}}
function chime(){[330,440,550,660].forEach((f,i)=>setTimeout(()=>{try{const c=ac(),o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(.05,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.3);o.start();o.stop(c.currentTime+.35)}catch(e){}},i*90))}

/* ── CANVAS ── */
const CV=document.getElementById('canvas-bubbles'),cx=CV.getContext('2d');
let CW=0,CH=0;
function rsz(){CW=CV.width=innerWidth;CH=CV.height=innerHeight}
rsz();window.addEventListener('resize',rsz);
const mouse={x:-999,y:-999,down:false};
window.addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY});
window.addEventListener('mousedown',()=>mouse.down=true);
window.addEventListener('mouseup',()=>mouse.down=false);
let bubbles=[],droplets=[];

class Bubble{
  constructor(x,y,r){
    this.x=x??Math.random()*CW;this.y=y??CH+(r||25);this.r=r??Math.random()*42+8;
    this.vx=(Math.random()-.5)*.55;this.vy=-(Math.random()*.85+.3);
    this.w=Math.random()*Math.PI*2;this.ws=Math.random()*.04+.01;this.wa=Math.random()*.09+.04;
    this.hue=Math.random()*70+185;this.hs=Math.random()*.4+.1;
    this.alpha=Math.random()*.22+.1;
    this.age=0;this.maxAge=Math.random()*320+160;this.popped=false;
  }
  update(){
    this.w+=this.ws;this.x+=this.vx+Math.sin(this.w)*.3;this.y+=this.vy;this.vy-=.0012;this.hue+=this.hs;this.age++;
    const dx=mouse.x-this.x,dy=mouse.y-this.y,d=Math.sqrt(dx*dx+dy*dy);
    if(d<this.r+16&&!this.popped){this.pop();return false}
    if(this.age>this.maxAge||this.y<-this.r*2||this.x<-this.r||this.x>CW+this.r){if(this.y<0)this.pop();return false}
    return true;
  }
  pop(){
    if(this.popped)return;this.popped=true;bubblePop(this.r/45);
    const el=document.createElement('div');el.className='bpop';
    el.style.cssText=`width:${this.r*2.5}px;height:${this.r*2.5}px;left:${this.x-this.r*1.25}px;top:${this.y-this.r*1.25}px`;
    document.body.appendChild(el);setTimeout(()=>el.remove(),500);
    for(let i=0;i<7;i++){const a=(i/7)*Math.PI*2,sp=(this.r/20)*(Math.random()*1.8+.8);droplets.push({x:this.x,y:this.y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-1,life:1,r:Math.random()*2.5+.8,hue:this.hue})}
  }
  draw(){
    const rx=this.r+this.r*this.wa*Math.sin(this.w),ry=this.r+this.r*this.wa*Math.cos(this.w*1.3);
    cx.save();cx.translate(this.x,this.y);
    cx.beginPath();cx.ellipse(0,0,rx,ry,0,0,Math.PI*2);
    const g=cx.createRadialGradient(-rx*.3,-ry*.35,0,0,0,Math.max(rx,ry));
    g.addColorStop(0,`hsla(${this.hue+40},100%,98%,${this.alpha*.8})`);
    g.addColorStop(.4,`hsla(${this.hue},80%,80%,${this.alpha*.25})`);
    g.addColorStop(.75,`hsla(${this.hue+120},70%,75%,${this.alpha*.18})`);
    g.addColorStop(1,`hsla(${this.hue+240},80%,85%,${this.alpha*.1})`);
    cx.fillStyle=g;cx.fill();
    cx.beginPath();cx.ellipse(0,0,rx,ry,0,0,Math.PI*2);
    cx.strokeStyle=`hsla(${this.hue},75%,80%,${this.alpha*2})`;cx.lineWidth=1.4;cx.stroke();
    cx.beginPath();cx.ellipse(0,0,rx*.68,ry*.68,0,0,Math.PI*2);
    cx.strokeStyle=`hsla(${this.hue+60},100%,85%,${this.alpha*.5})`;cx.lineWidth=.6;cx.stroke();
    cx.beginPath();cx.ellipse(-rx*.28,-ry*.3,rx*.22,ry*.13,-Math.PI/4,0,Math.PI*2);
    cx.fillStyle=`rgba(255,255,255,${this.alpha*2.5})`;cx.fill();
    cx.beginPath();cx.arc(-rx*.46,-ry*.42,rx*.07,0,Math.PI*2);
    cx.fillStyle=`rgba(255,255,255,${this.alpha*2.1})`;cx.fill();
    cx.restore();
  }
}

setInterval(()=>{if(bubbles.length<42)bubbles.push(new Bubble())},580);
window.addEventListener('click',e=>{
  if(e.target.closest('.btn,.filter-btn,.nav-links,#navbar'))return;
  splash();
  for(let i=0;i<6;i++){const r=Math.random()*26+8,b=new Bubble(e.clientX+(Math.random()-.5)*50,e.clientY+(Math.random()-.5)*30,r);b.vy=-Math.random()*2.5-1.2;bubbles.push(b)}
});
let trail=[];
function drawTrail(){
  if(mouse.x>0&&mouse.x<CW)trail.push({x:mouse.x,y:mouse.y,life:1,r:mouse.down?12:5,hue:185+Math.random()*80});
  trail=trail.filter(t=>t.life>0);
  trail.forEach(t=>{const g=cx.createRadialGradient(t.x,t.y,0,t.x,t.y,t.r*t.life*3);g.addColorStop(0,`hsla(${t.hue},80%,80%,${t.life*.2})`);g.addColorStop(1,`hsla(${t.hue+60},80%,80%,0)`);cx.beginPath();cx.arc(t.x,t.y,t.r*t.life*3,0,Math.PI*2);cx.fillStyle=g;cx.fill();t.life-=.09});
}
function loop(){
  cx.clearRect(0,0,CW,CH);drawTrail();
  bubbles=bubbles.filter(b=>b.update());bubbles.forEach(b=>b.draw());
  droplets=droplets.filter(d=>d.life>0);
  droplets.forEach(d=>{cx.beginPath();cx.arc(d.x,d.y,d.r,0,Math.PI*2);cx.fillStyle=`hsla(${d.hue},75%,80%,${d.life*.7})`;cx.fill();d.x+=d.vx;d.y+=d.vy;d.vy+=.07;d.life-=.06});
  requestAnimationFrame(loop);
}
loop();

/* ── COUNTDOWN ── */
function initCountdown(){
  const target=new Date('2026-07-01T09:00:00');
  const els={d:document.getElementById('cd-days'),h:document.getElementById('cd-hours'),m:document.getElementById('cd-minutes'),s:document.getElementById('cd-seconds'),finished:document.getElementById('cd-finished'),grid:document.getElementById('cd-grid')};
  let prev={d:null,h:null,m:null,s:null};
  function pulse(el){el.classList.remove('pulse');void el.offsetWidth;el.classList.add('pulse')}
  function tick(){
    const diff=target-new Date();
    if(diff<=0){if(els.grid)els.grid.style.display='none';if(els.finished)els.finished.style.display='block';return}
    const days=Math.floor(diff/86400000),hours=Math.floor((diff%86400000)/3600000),minutes=Math.floor((diff%3600000)/60000),seconds=Math.floor((diff%60000)/1000);
    const pad=n=>String(n).padStart(2,'0');
    if(els.d&&days!==prev.d){els.d.textContent=pad(days);pulse(els.d);prev.d=days}
    if(els.h&&hours!==prev.h){els.h.textContent=pad(hours);pulse(els.h);prev.h=hours}
    if(els.m&&minutes!==prev.m){els.m.textContent=pad(minutes);pulse(els.m);prev.m=minutes}
    if(els.s&&seconds!==prev.s){els.s.textContent=pad(seconds);pulse(els.s);prev.s=seconds}
    setTimeout(tick,250);
  }
  tick();
}
initCountdown();

/* ── NAVBAR ── */
const navbar=document.getElementById('navbar'),navToggle=document.querySelector('.nav-toggle'),navLinks=document.querySelector('.nav-links');
window.addEventListener('scroll',()=>{navbar.classList.toggle('scrolled',window.scrollY>20);updateNav()});
navToggle?.addEventListener('click',()=>navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));
function updateNav(){
  const sy=window.scrollY+140;
  ['hero','countdown-section','gironi','risultati','calendario','bracket'].forEach(id=>{
    const el=document.getElementById(id),link=document.querySelector(`.nav-links a[href="#${id}"]`);
    if(!el||!link)return;
    link.classList.toggle('active',sy>=el.offsetTop&&sy<el.offsetTop+el.offsetHeight);
  });
}

/* ── SECTION HEADERS ── */
const hdrObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');hdrObs.unobserve(e.target)}})},{threshold:.1});
document.querySelectorAll('.section-header').forEach(el=>hdrObs.observe(el));

/* ── SECTION BUBBLES ── */
const secObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting&&e.intersectionRatio>.2){chime();for(let i=0;i<12;i++)setTimeout(()=>{const r=Math.random()*35+7,b=new Bubble(Math.random()*CW,CH*.85+Math.random()*CH*.15,r);b.vy=-Math.random()*3-1.5;bubbles.push(b)},i*70);secObs.unobserve(e.target)}});
},{threshold:.2});
['gironi','risultati','calendario','bracket'].forEach(id=>{const el=document.getElementById(id);if(el)secObs.observe(el)});

/* ── BUTTON + RIPPLE ── */
document.addEventListener('click',e=>{
  const btn=e.target.closest('.btn,.filter-btn');if(!btn)return;
  bubblePop(.5);
  const r=document.createElement('span'),rect=btn.getBoundingClientRect(),sz=Math.max(rect.width,rect.height)*2.2;
  r.style.cssText=`position:absolute;width:${sz}px;height:${sz}px;border-radius:50%;background:rgba(26,143,255,.2);transform:scale(0);left:${e.clientX-rect.left-sz/2}px;top:${e.clientY-rect.top-sz/2}px;animation:ripple .65s ease forwards;pointer-events:none`;
  btn.appendChild(r);setTimeout(()=>r.remove(),700);
});
const rs=document.createElement('style');rs.textContent='@keyframes ripple{0%{transform:scale(0);opacity:1}100%{transform:scale(1);opacity:0}}';document.head.appendChild(rs);
document.querySelectorAll('.btn-primary,.btn-gold,.btn-outline').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{const rect=btn.getBoundingClientRect();btn.style.transform=`translate(${(e.clientX-rect.left-rect.width/2)*.25}px,${(e.clientY-rect.top-rect.height/2)*.25}px) translateY(-4px) scale(1.04)`});
  btn.addEventListener('mouseleave',()=>btn.style.transform='');
});

/* ── 3D TILT ── */
document.addEventListener('mousemove',e=>{
  document.querySelectorAll('.group-card,.ko-match,.match-card,.cd-box').forEach(card=>{
    const rect=card.getBoundingClientRect(),cx2=rect.left+rect.width/2,cy2=rect.top+rect.height/2;
    const dx=(e.clientX-cx2)/(rect.width/2),dy=(e.clientY-cy2)/(rect.height/2);
    if(Math.sqrt(dx*dx+dy*dy)<1.6)card.style.transform=`translateY(-5px) scale(1.01) perspective(800px) rotateX(${-dy*5}deg) rotateY(${dx*5}deg)`;
    else card.style.transform='';
  });
});

/* ── PARALLAX ── */
window.addEventListener('scroll',()=>{const hw=document.querySelector('.hero-logo-wrap');if(hw)hw.style.transform=`translateY(${window.scrollY*.2}px)`});

/* ── LOGO CLICK ── */
document.querySelector('.hero-logo')?.addEventListener('click',e=>{
  splash();
  for(let i=0;i<22;i++)setTimeout(()=>{const r=Math.random()*48+10,a=Math.random()*Math.PI*2,d=Math.random()*80,b=new Bubble(e.clientX+Math.cos(a)*d,e.clientY+Math.sin(a)*d,r);b.vy=-Math.random()*4.5-2;bubbles.push(b)},i*30);
  const logo=e.target;
  logo.style.filter='drop-shadow(0 0 60px rgba(26,143,255,.9)) drop-shadow(0 0 120px rgba(245,158,11,.4)) brightness(1.3)';
  logo.style.transform='scale(1.12) rotate(5deg)';
  setTimeout(()=>{logo.style.filter='';logo.style.transform=''},400);
  document.body.classList.add('shake');setTimeout(()=>document.body.classList.remove('shake'),350);
});

/* ── COUNTERS ── */
const cntObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,target=+el.dataset.target;let s=null;const step=ts=>{if(!s)s=ts;const p=Math.min((ts-s)/1600,1);el.textContent=Math.round((1-Math.pow(1-p,3))*target);if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step);cntObs.unobserve(el)})},{threshold:.5});
document.querySelectorAll('[data-target]').forEach(el=>cntObs.observe(el));

/* ── TITLE GLITCH ── */
const gs=document.createElement('style');gs.textContent=`@keyframes tglitch{0%,100%{transform:none;filter:none}15%{transform:translate(-3px,1px);filter:drop-shadow(3px 0 rgba(26,143,255,.7)) drop-shadow(-3px 0 rgba(6,182,212,.7))}40%{transform:translate(3px,-1px)}65%{transform:translate(-2px,0)}85%{transform:translate(2px,0);filter:none}}`;document.head.appendChild(gs);
document.querySelectorAll('.section-title').forEach(el=>{el.addEventListener('mouseenter',()=>{el.style.animation='tglitch .4s ease';setTimeout(()=>el.style.animation='',450)})});

/* ── DATA ── */
const pts=t=>t.v*3+t.p,dr=t=>t.gf-t.gs;
function sortGroup(t){return[...t].sort((a,b)=>pts(b)-pts(a)||dr(b)-dr(a)||b.gf-a.gf)}
function form(v,p,s){const r=[];for(let i=0;i<v;i++)r.push('W');for(let i=0;i<p;i++)r.push('D');for(let i=0;i<s;i++)r.push('L');while(r.length<3)r.push('N');return r.slice(0,3).map(x=>`<span class="f ${x}"></span>`).join('')}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}

function renderGroups(filter='all'){
  const c=document.getElementById('groups-container');if(!c)return;c.innerHTML='';
  const all=Object.entries(GROUPS),list=filter==='all'?all:all.filter(([k])=>k===filter);
  list.forEach(([grp,data])=>{
    const sorted=sortGroup(data.teams);
    const rows=sorted.map((t,i)=>`<div class="standing-row ${i===0?'qualified':i===1?'qualified-2nd':''}"><span class="pos ${i===0?'q1':i===1?'q2':''}">${i+1}</span><span class="team-n ${t.highlight?'highlight':''}">${esc(t.name)}</span><span class="cell">${t.g}</span><span class="cell">${t.v}</span><span class="cell">${t.p}</span><span class="cell">${t.s}</span><span class="cell">${t.gf}</span><span class="cell">${t.gs}</span><span class="pts-cell">${pts(t)}</span><span class="form-bar">${form(t.v,t.p,t.s)}</span></div>`).join('');
    const card=document.createElement('div');card.className='group-card';
    card.innerHTML=`<div class="group-head"><span class="group-letter">GIRONE ${grp}</span><div class="group-cols"><span>G</span><span>V</span><span>P</span><span>S</span><span>GF</span><span>GS</span><span>Pt</span></div></div>${rows}`;
    c.appendChild(card);
  });
}
document.querySelectorAll('.filter-btn').forEach(btn=>{btn.addEventListener('click',()=>{document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderGroups(btn.dataset.grp);bubblePop(.4)})});

function matchCard(m,isUpcoming=false){
  const isL=m.home==='Latine Selvaggi'||m.away==='Latine Selvaggi';let hC='',aC='';
  if(!isUpcoming&&'sh'in m){hC=m.home==='Latine Selvaggi'?'latine-team':m.sh>m.sa?'winner':m.sh<m.sa?'loser':'draw';aC=m.away==='Latine Selvaggi'?'latine-team':m.sa>m.sh?'winner':m.sa<m.sh?'loser':'draw'}
  else{hC=m.home==='Latine Selvaggi'?'latine-team':'';aC=m.away==='Latine Selvaggi'?'latine-team':''}
  const gL=m.grp==='FINALE'?'🏆 FINALE':'Girone '+m.grp;
  const sc=isUpcoming?`<div class="score-display upcoming">${m.time}</div>`:`<div class="score-display">${m.sh} — ${m.sa}</div>`;
  return `<div class="match-card ${isL?'highlight-card':''}"><div class="mc-team home ${hC}">${esc(m.home)}</div><div class="mc-center"><div class="grp-pill">${gL}</div>${sc}</div><div class="mc-team ${aC}">${esc(m.away)}</div></div>`;
}
function renderDayList(data,id){
  const c=document.getElementById(id);if(!c)return;c.innerHTML='';
  data.forEach(day=>{const isKO=/Finale|Semifinal|Quarti/.test(day.label);const b=document.createElement('div');b.className='day-block';b.innerHTML=`<div class="day-header"><span class="day-badge ${isKO?'gold-badge':''}">${day.label}</span><span class="day-title">${day.day}</span><div class="day-line"></div></div>${day.matches.map(m=>matchCard(m,id==='upcoming-list')).join('')}`;c.appendChild(b)});
}
function renderBracket(){
  const c=document.getElementById('bracket-content');if(!c)return;
  const qf=[{a:"Latine Selvaggi",b:"Trastevere Tigers",time:"17:00"},{a:"Carbonara Utd",b:"Muri Storici",time:"17:45"},{a:"Lupa Capitolina",b:"Nomentana Stars",time:"18:30"},{a:"Monte Sacro FC",b:"Trionfale FC",time:"19:15"},{a:"Colosseo FC",b:"I Gladiatori",time:"20:00"},{a:"Garbatella FC",b:"Pigneto United",time:"20:45"},{a:"Prati Warriors",b:"Testaccio Boys",time:"21:30"},{a:"Aurelia FC",b:"Portuense FC",time:"22:15"}];
  const kc=(m,fin=false)=>{const aT=/^(Vincitore|Finali|Semi)/.test(m.a),bT=/^(Vincitore|Finali|Semi)/.test(m.b);return`<div class="ko-match ${fin?'final-match':''}"><div class="ko-time ${fin?'final':''}">${m.time}</div><div class="ko-team ${aT?'tbd':''} ${m.a==='Latine Selvaggi'?'latine':''}"><span>${esc(m.a)}</span><span class="ko-score">—</span></div><div class="ko-team ${bT?'tbd':''} ${m.b==='Latine Selvaggi'?'latine':''}"><span>${esc(m.b)}</span><span class="ko-score">—</span></div></div>`};
  c.innerHTML=[
    {badge:'Quarti di Finale',date:'Venerdì 4 Luglio',matches:qf,fin:false},
    {badge:'Semifinali',date:'Sabato 5 Luglio',matches:[{a:"Vincitore QF1",b:"Vincitore QF2",time:"17:00"},{a:"Vincitore QF3",b:"Vincitore QF4",time:"18:15"},{a:"Vincitore QF5",b:"Vincitore QF6",time:"19:30"},{a:"Vincitore QF7",b:"Vincitore QF8",time:"20:45"}],fin:false},
    {badge:'Finale 3° Posto',date:'Lunedì 7 Luglio',matches:[{a:"Semifinalista 1",b:"Semifinalista 2",time:"17:00"}],fin:false},
    {badge:'🏆 Gran Finale',date:'Martedì 8 Luglio',matches:[{a:"Finalista 1",b:"Finalista 2",time:"19:30"}],fin:true},
  ].map(r=>`<div class="ko-round"><div class="ko-round-header"><span class="ko-badge" ${r.fin?`style="background:linear-gradient(135deg,var(--gold),var(--gold-b));-webkit-background-clip:text;-webkit-text-fill-color:transparent"`:''}>${r.badge}</span><span class="ko-date">${r.date}</span><div class="ko-line"></div></div><div class="ko-grid">${r.matches.map(m=>kc(m,r.fin)).join('')}</div></div>`).join('');
}

renderGroups();
renderDayList(PLAYED,'played-list');
renderDayList(UPCOMING,'upcoming-list');
renderBracket();
updateNav();
