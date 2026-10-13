// App shell: bottom tab bar (Ana Sayfa, Öğren, Kur'an, Keşfet, Ben), a home
// screen and card lists. Reuses the stage nodes and panels built by
// script.js / extra.js; loaded last and started from init().

const TABS = [
  {id:'home',    label:'Ana Sayfa', icon:'<svg viewBox="0 0 24 24"><path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>'},
  {id:'learn',   label:'Öğren',     icon:'<span class="tab-ar arabic">ب</span>', title:'Öğren', sub:'Harfler, heceler ve okuma',
   stages:['letters','syllables','lessons']},
  {id:'quran',   label:'Kur\'an',   icon:'<svg viewBox="0 0 24 24"><path d="M12 6c-2-1.5-5-2-8-1.5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-13C17 4 14 4.5 12 6Z"/><path d="M12 6v13"/></svg>', title:'Kur\'an', sub:'Sûreler, okuma ve dualar',
   stages:['suras','pages','dua']},
  {id:'explore', label:'Keşfet',    icon:'<svg viewBox="0 0 24 24"><path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7Z"/></svg>', title:'Keşfet', sub:'İbadet, hikâyeler ve bilgiler',
   stages:['gun','ibadet','esma','kissa','hazine','stories']},
  {id:'me',      label:'Ben',       icon:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>', title:'Ben', sub:'Ödüller ve ebeveyn alanı',
   stages:['oduller','sandik','veli','ayarlar']}
];
let currentTab = 'home';
try{ const t = sessionStorage.getItem('humanur-tab'); if(TABS.some(x=> x.id===t)) currentTab = t; }catch(e){}

const $id = id=> document.getElementById(id);
const nodeOf = stage=> document.querySelector('#mapView .stage-node[data-stage="'+stage+'"]');

function stageRatio(stage){
  const t = totalStars();
  const r = {
    letters: t.stage1/STAGE1_MAX, syllables: t.s/SYLLABLES.length, lessons: t.d/LESSON_ITEM_COUNT,
    suras: t.q/TOTAL_AYAT, pages: t.p/PAGE_COUNT
  };
  if(typeof exCount === 'function'){
    Object.assign(r, {
      dua: exCount('d')/DUA.length, ibadet: exCount('i')/2, esma: exCount('n')/ESMA.length,
      kissa: (exCount('h')+exCount('a'))/(HIK.length+SAH.length),
      hazine: (exCount('m')+exCount('g')+exCount('p'))/(ALIM.length+GOK.length+PAD.length)
    });
  }
  if(stage === 'stories') return storiesUnlocked > 0 ? storiesUnlocked/STORIES.length : 0;
  return r[stage];
}

function initShell(){
  const root = $id('appRoot'), map = $id('mapView'), main = document.querySelector('main');
  document.body.classList.add('modern');

  // Compact app bar
  const header = document.querySelector('header');
  const bar = document.createElement('div');
  bar.className = 'appbar-row';
  bar.innerHTML = `<div class="appbar-brand"><span class="appbar-logo">☾</span><span>Hümanur'un Yolculuğu</span></div>
    <span class="streakpill" title="Gün serisi">🔥 <b id="streakCount">0</b></span>
    <button class="starpill" type="button" onclick="openStage('sandik')" aria-label="Hazine sandığım"><span>⭐</span><b id="starCount">0</b></button>`;
  header.prepend(bar);

  // Tab views inside the map
  const views = {};
  TABS.forEach(t=>{
    const v = document.createElement('div');
    v.className = 'tabview';
    v.id = 'view-'+t.id;
    if(t.title) v.innerHTML = `<div class="tab-head"><h2>${t.title}</h2><p>${t.sub}</p></div>`;
    map.appendChild(v);
    views[t.id] = v;
  });

  // Home: hero (progress + skyline), Lale, continue, today, quick access
  const hero = document.createElement('div');
  hero.className = 'home-hero';
  hero.innerHTML = `<div class="hero-greet"><span class="hero-moon">🌙</span><div><h2>Selâmün aleyküm, Hümanur!</h2><p>Her gün biraz öğren, her gün bir yıldız kazan.</p></div></div>`;
  hero.appendChild(document.querySelector('header .moon-wrap'));
  hero.insertAdjacentHTML('beforeend', '<div class="home-goal" id="homeGoal"></div>');
  const sky = document.querySelector('header .skyline');
  if(sky) hero.appendChild(sky);
  views.home.appendChild(hero);
  views.home.appendChild($id('laleGuide'));
  views.home.insertAdjacentHTML('beforeend', `
    <div id="homeDaily"></div>
    <div id="homeContinue"></div>
    <div class="sec-title">Bugün</div><div id="homeToday"></div>
    <div class="sec-title">Hızlı erişim</div><div class="quick-grid" id="homeQuick"></div>`);

  // Move the stage nodes into their tabs as list cards
  TABS.forEach(t=> (t.stages||[]).forEach(st=>{
    const n = nodeOf(st);
    if(!n) return;
    n.classList.add('list-card');
    const body = n.querySelector('.stage-body');
    if(body && !body.querySelector('.card-bar') && !['gun','oduller','veli','sandik','ayarlar'].includes(st)){
      body.insertAdjacentHTML('beforeend', '<div class="card-bar"><i></i></div>');
    }
    if(!n.querySelector('.card-chev')) n.insertAdjacentHTML('beforeend', '<span class="card-chev">›</span>');
    views[t.id].appendChild(n);
  }));
  // Strip the old map decoration
  map.querySelectorAll('.map-heading, .path-line').forEach(e=> e.remove());
  // Parent note + reset live under "Ben"
  const info = map.querySelector('.info-box'), reset = map.querySelector(':scope > .reset-btn');
  if(info) views.me.appendChild(info);
  if(reset) views.me.appendChild(reset);
  // Clean numbering in titles ("1. Elifbe" -> "Elifbe")
  map.querySelectorAll('.list-card h3').forEach(h=> h.textContent = h.textContent.replace(/^\d+\.\s*/, ''));

  // Bottom navigation
  const nav = document.createElement('nav');
  nav.className = 'tabbar-bottom';
  nav.setAttribute('aria-label', 'Ana gezinme');
  nav.innerHTML = TABS.map(t=> `<button type="button" data-tab="${t.id}" onclick="showTab('${t.id}')">${t.icon}<span>${t.label}</span></button>`).join('');
  document.body.appendChild(nav);

  // Back buttons become a round icon + title row
  document.querySelectorAll('.panel .back-btn').forEach(b=>{ b.innerHTML = '<span class="back-ico">‹</span> Geri'; });

  showTab(currentTab, true);
  refreshShell();
}

function showTab(id, quiet){
  if(currentStage) closeStage();
  currentTab = id;
  try{ sessionStorage.setItem('humanur-tab', id); }catch(e){}
  document.querySelectorAll('.tabview').forEach(v=> v.classList.toggle('active', v.id === 'view-'+id));
  document.querySelectorAll('.tabbar-bottom button').forEach(b=> b.classList.toggle('active', b.dataset.tab === id));
  if(!quiet) window.scrollTo({top:0});
}

function refreshShell(){
  if(!$id('starCount')) return;
  const t = totalStars();
  $id('starCount').textContent = t.total;
  // Progress bars on the list cards
  document.querySelectorAll('#mapView .list-card').forEach(n=>{
    const i = n.querySelector('.card-bar i');
    if(i){ const r = stageRatio(n.dataset.stage) || 0; i.style.width = Math.round(r*100)+'%'; }
  });
  // Continue: the stage highlighted by updateStageCards
  const act = document.querySelector('#mapView .stage-node.active');
  const cont = $id('homeContinue');
  if(act){
    const st = act.dataset.stage, r = Math.round((stageRatio(st)||0)*100);
    cont.innerHTML = `<button class="continue-card" type="button" onclick="openStage('${st}')">
      <div class="cc-badge">${act.querySelector('.stage-badge').innerHTML}</div>
      <div class="cc-body"><span class="cc-kicker">Devam et</span><b>${act.querySelector('h3').textContent}</b>
      <div class="card-bar"><i style="width:${r}%"></i></div></div><span class="cc-go">›</span></button>`;
  }else{
    cont.innerHTML = `<div class="continue-card done"><div class="cc-badge">🏆</div><div class="cc-body"><span class="cc-kicker">Maşallah!</span><b>Bütün bölümleri bitirdin</b></div></div>`;
  }
  // Today: verse of the day + evening steps
  if(typeof AYET !== 'undefined'){
    const ay = AYET[dayIdx % AYET.length], d = state.days[DK], ev = d ? d.s.filter(Boolean).length : 0;
    $id('homeToday').innerHTML = `<button class="today-card" type="button" onclick="openStage('gun')">
      <span class="cc-kicker">Günün âyeti · ${ay[3]}</span><div class="arabic today-ar">${ay[0]}</div><p>${ay[2]}</p>
      <div class="today-foot"><span>🍽️ Akşam Sofrası ${ev}/5</span><span class="cc-go">›</span></div></button>`;
  }
  // Quick access
  if(typeof refreshFun === 'function') refreshFun();
  const quick = [['suras','📖','Sûreler'],['dua','🤲','Dualar'],['esma','✨','Esmâ'],['kissa','🌙','Hikâyeler']];
  $id('homeQuick').innerHTML = quick.map(([st, ic, l])=>{
    const n = nodeOf(st), locked = n && n.classList.contains('locked');
    return `<button class="quick-btn ${locked?'locked':''}" type="button" onclick="openStage('${st}')"><span class="quick-ic">${locked?'🔒':ic}</span><span>${l}</span></button>`;
  }).join('');
}

// Keep the shell in sync with every progress update
const _updateHeaderBase = updateHeader;
updateHeader = function(){ _updateHeaderBase(); refreshShell(); };
