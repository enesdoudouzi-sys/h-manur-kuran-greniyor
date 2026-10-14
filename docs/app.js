// App shell: one tidy home page. A summary card (progress, daily goal,
// streak, Lale's tip), the "Bugünkü dersim" button, and every section as an
// icon tile in four groups. Reuses the stage nodes and panels built by
// script.js / extra.js / fun.js; loaded last and started from init().

const GROUPS = [
  {title:'Öğren',  items:[['letters','Elifbe'],['syllables','Hece'],['lessons','Okuma'],['oyunlar','Oyunlar'],['sohbet','Lale\'ye sor']]},
  {title:'Kur\'an', items:[['suras','Sûreler'],['dua','Dualar'],['pages','Sayfalar'],['tecvid','Tecvid'],['kuran','Mushaf']]},
  {title:'İman',   items:[['iman','İman ve İslam'],['peygamber','Peygamberler'],['ibadet','Namaz'],['ezan','Ezan'],['ramazan','Ramazan'],['esma','Esmâ']]},
  {title:'Keşfet', items:[['kissa','Kıssalar'],['hazine','Bilgi'],['stories','Hikâyeler'],['ilahi','İlahiler'],['zikir','Zikirmatik'],['vakit','Vakit ve Kıble'],['gun','Bugün']]},
  {title:'Ben',    items:[['sandik','Sandık'],['album','Albüm'],['belge','Belgeler'],['veli','Ebeveyn'],['ayarlar','Ayarlar']]}
];
const NO_BAR = ['gun','veli','ayarlar','sohbet','belge','zikir','kuran','vakit'];

const $id = id=> document.getElementById(id);
const nodeOf = stage=> document.querySelector('#mapView > .stage-node[data-stage="'+stage+'"]');

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
    if(typeof TECVID !== 'undefined') r.tecvid = exCount('t')/TECVID.length;
    if(typeof PEYGAMBER !== 'undefined') Object.assign(r, {iman: exCount('f')/(IMAN.length+ISLAM.length+2), peygamber: exCount('y')/PEYGAMBER.length,
      ezan: exCount('x')/3, ramazan: exCount('r')/3, album: stickersGot()/STICKERS.length});
    if(typeof ILAHI !== 'undefined') r.ilahi = exCount('u')/ILAHI.length;
    if(typeof MEM_STAGES !== 'undefined') r.oyunlar = (exCount('o')+exCount('c'))/(MEM_STAGES.length+LETTERS.length);
  }
  if(stage === 'stories') return storiesUnlocked > 0 ? storiesUnlocked/STORIES.length : 0;
  if(stage === 'sandik' && typeof chestCounts === 'function'){ const c = chestCounts(); return c.got/c.max; }
  return r[stage];
}

function initShell(){
  const map = $id('mapView');
  document.body.classList.add('modern', 'onepage');

  // Compact app bar
  const header = document.querySelector('header');
  header.insertAdjacentHTML('afterbegin', `<div class="appbar-row">
    <div class="appbar-brand"><span class="appbar-logo">☾</span><span>Hümanur'un Yolculuğu</span></div>
    <span class="streakpill" title="Gün serisi">🔥 <b id="streakCount">0</b></span>
    <button class="starpill" type="button" onclick="openStage('sandik')" aria-label="Hazine sandığım"><span>⭐</span><b id="starCount">0</b></button></div>`);

  // Home page
  const home = document.createElement('div');
  home.className = 'home';
  home.id = 'home';
  home.innerHTML = `
    <div class="summary">
      <div class="sum-greet">Selâmün aleyküm, Hümanur! 🌙</div>
      <div class="sum-row"><div class="sum-progress"></div><div class="home-goal" id="homeGoal"></div></div>
      <div class="sum-lale"><span class="sum-lale-ic">🌷</span><span class="sum-lale-text"></span></div>
    </div>
    <div id="homeDaily"></div>
    <div class="home-search"><span>🔍</span><input id="homeSearch" type="search" placeholder="Ara: harf, dua, ezan, oyun…" autocomplete="off" oninput="filterTiles(this.value)" aria-label="Bölüm ara"></div>
    <div id="homeRecent"></div>
    <p class="home-none gone" id="homeNone">Bulunamadı. Başka bir kelime dene. 🌷</p>
    ${GROUPS.map(g=> `<section class="group"><h3 class="group-title">${g.title}</h3><div class="tile-grid">
      ${g.items.map(([st, label])=>{
        const n = nodeOf(st);
        const icon = n ? n.querySelector('.stage-badge').innerHTML : '';
        return `<button class="tile" type="button" data-tile="${st}" onclick="openStage('${st}')">
          <span class="tile-ic">${icon}</span><span class="tile-name">${label}</span>
          ${NO_BAR.includes(st) ? '<span class="tile-sub"></span>' : '<span class="tile-bar"><i></i></span>'}
          <span class="tile-lock">🔒</span></button>`;
      }).join('')}</div></section>`).join('')}`;
  map.appendChild(home);

  // Progress ring + bar from the header, Lale's tip text
  home.querySelector('.sum-progress').appendChild(document.querySelector('header .moon-wrap'));
  const laleText = $id('laleText');
  if(laleText) home.querySelector('.sum-lale-text').appendChild(laleText);
  // script.js still toggles this element when panels open/close, so hide it instead of removing it.
  const laleGuide = $id('laleGuide');
  if(laleGuide) laleGuide.classList.add('gone');

  // Parent note + reset go to the bottom of the page
  const info = map.querySelector('.info-box'), reset = map.querySelector(':scope > .reset-btn');
  const foot = document.createElement('div');
  foot.className = 'home-foot';
  if(info) foot.appendChild(info);
  if(reset) foot.appendChild(reset);
  home.appendChild(foot);

  // Strip the old map decoration
  map.querySelectorAll('.map-heading, .path-line').forEach(e=> e.remove());
  document.querySelectorAll('.panel .back-btn').forEach(b=>{ b.innerHTML = '<span class="back-ico">‹</span> Ana sayfa'; });

  const _open = openStage;
  openStage = function(stage){ noteRecent(stage); _open(stage); };
  const _close = closeStage;
  closeStage = function(){ _close(); renderRecent(); };
  refreshShell();
}

// Search: matches the tile name and the section's own title and description.
const trLow = t=> String(t).toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i');
function filterTiles(q){
  q = trLow(q.trim());
  let any = false;
  document.querySelectorAll('#home .group').forEach(g=>{
    let n = 0;
    g.querySelectorAll('.tile').forEach(tile=>{
      const node = nodeOf(tile.dataset.tile);
      const hay = trLow(tile.textContent + ' ' + (node ? node.querySelector('.stage-body').textContent : ''));
      const hit = !q || hay.includes(q);
      tile.classList.toggle('gone', !hit);
      if(hit) n++;
    });
    g.classList.toggle('gone', !n);
    if(n) any = true;
  });
  $id('homeNone').classList.toggle('gone', any);
  const rec = $id('homeRecent'); if(rec) rec.classList.toggle('gone', !!q);
}
// "Son açtıkların": the last four sections opened.
const RECENT_KEY = 'humanur-recent';
let recent = [];
try{ recent = JSON.parse(localStorage.getItem(RECENT_KEY)) || []; }catch(e){}
function noteRecent(stage){
  const tile = document.querySelector('#home .tile[data-tile="'+stage+'"]');
  if(!tile || tile.classList.contains('locked')) return;
  recent = [stage].concat(recent.filter(x=> x !== stage)).slice(0, 4);
  try{ localStorage.setItem(RECENT_KEY, JSON.stringify(recent)); }catch(e){}
}
function renderRecent(){
  const el = $id('homeRecent');
  if(!el) return;
  const items = recent.map(st=> document.querySelector('#home .tile[data-tile="'+st+'"]')).filter(Boolean);
  el.innerHTML = items.length ? `<div class="recent-title">Son açtıkların</div><div class="recent-row">${items.map(t=>
    `<button type="button" class="recent-chip" onclick="openStage('${t.dataset.tile}')">${t.querySelector('.tile-ic').innerHTML}<span>${t.querySelector('.tile-name').textContent}</span></button>`).join('')}</div>` : '';
}

function refreshShell(){
  if(!$id('starCount')) return;
  $id('starCount').textContent = totalStars().total;
  document.querySelectorAll('#home .tile').forEach(tile=>{
    const st = tile.dataset.tile, n = nodeOf(st);
    const locked = !!(n && n.classList.contains('locked'));
    tile.classList.toggle('locked', locked);
    tile.classList.toggle('next', !!(n && n.classList.contains('active')));
    const bar = tile.querySelector('.tile-bar i');
    if(bar) bar.style.width = Math.round((stageRatio(st) || 0) * 100) + '%';
  });
  const gun = document.querySelector('#home .tile[data-tile="gun"] .tile-sub');
  if(gun && typeof DK !== 'undefined'){ const d = state.days[DK]; gun.textContent = '🍽️ ' + (d ? d.s.filter(Boolean).length : 0) + '/5'; }
  if(typeof refreshFun === 'function') refreshFun();
  const greet = document.querySelector('#home .sum-greet');
  if(greet && typeof settings !== 'undefined') greet.textContent = 'Selâmün aleyküm, '+(settings.childName || 'Hümanur')+'! 🌙';
  renderRecent();
}

// Keep the shell in sync with every progress update
const _updateHeaderBase = updateHeader;
updateHeader = function(){ _updateHeaderBase(); refreshShell(); };
