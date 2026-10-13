// More Elifbe: hareke table for all 28 letters, telling similar letters apart,
// building words from letters, and mahreç (where each letter is spoken).
// Loaded after extra.js; started from init() via initElifbePlus().

/* ============ Data ============ */
const SIMILAR_GROUPS = [['ب','ت','ث'], ['ج','ح','خ'], ['د','ذ'], ['ر','ز'], ['س','ش'], ['ص','ض'], ['ط','ظ'], ['ع','غ'], ['ف','ق']];
const DOT_TIPS = {
  'ب':'Altında 1 nokta', 'ت':'Üstünde 2 nokta', 'ث':'Üstünde 3 nokta',
  'ج':'İçinde 1 nokta', 'ح':'Noktası yok', 'خ':'Üstünde 1 nokta',
  'د':'Noktası yok', 'ذ':'Üstünde 1 nokta', 'ر':'Noktası yok', 'ز':'Üstünde 1 nokta',
  'س':'Noktası yok', 'ش':'Üstünde 3 nokta', 'ص':'Noktası yok', 'ض':'Üstünde 1 nokta',
  'ط':'Noktası yok', 'ظ':'Üstünde 1 nokta', 'ع':'Noktası yok', 'غ':'Üstünde 1 nokta',
  'ف':'Üstünde 1 nokta', 'ق':'Üstünde 2 nokta'
};
const SIMILAR_LETTERS = SIMILAR_GROUPS.flat();

const BUILD_WORDS = [
  ['بَاب','bâb','kapı','🚪',['ب','ا','ب']],
  ['أَب','eb','baba','👨',['ا','ب']],
  ['يَد','yed','el','✋',['ي','د']],
  ['قَلَم','kalem','kalem','✏️',['ق','ل','م']],
  ['بَيْت','beyt','ev','🏠',['ب','ي','ت']],
  ['شَمْس','şems','güneş','☀️',['ش','م','س']],
  ['قَمَر','kamer','ay','🌙',['ق','م','ر']],
  ['نَجْم','necm','yıldız','⭐',['ن','ج','م']],
  ['نُور','nûr','ışık','💡',['ن','و','ر']],
  ['وَلَد','veled','çocuk','🧒',['و','ل','د']],
  ['فِيل','fîl','fil','🐘',['ف','ي','ل']],
  ['أَسَد','esed','aslan','🦁',['ا','س','د']],
  ['سَمَك','semek','balık','🐟',['س','م','ك']],
  ['وَرْد','verd','gül','🌹',['و','ر','د']],
  ['كِتَاب','kitâb','kitap','📖',['ك','ت','ا','ب']]
];

const MAHREC = [
  {id:'halk', name:'Boğaz', ar:'حَلْق', color:'#D1495B', x:68, y:150,
   text:'Bu harfler boğazdan çıkar: ء ve ه boğazın en derininden, ع ve ح ortasından, غ ve خ üst kısmından.',
   letters:['ء','ه','ع','ح','غ','خ']},
  {id:'lisan', name:'Dil', ar:'لِسَان', color:'#2A9D8F', x:112, y:120,
   text:'Bu harflerde dilin ucu, ortası, kenarı veya arkası damağa ya da dişlere değer. ق ve ك dilin arkasından, ج ش ي ortasından, ل ن ر ت د ط ucundan çıkar.',
   letters:['ق','ك','ج','ش','ي','ض','ل','ن','ر','ط','د','ت','ص','ز','س','ظ','ذ','ث']},
  {id:'sefe', name:'Dudaklar', ar:'شَفَتَانِ', color:'#CC9A3C', x:156, y:128,
   text:'ف okunurken alt dudak üst dişlere değer. ب ve م okunurken iki dudak birleşir. و okunurken dudaklar yuvarlanır.',
   letters:['ف','ب','م','و']},
  {id:'hayşum', name:'Burun (Geniz)', ar:'خَيْشُوم', color:'#1F4E9C', x:150, y:82,
   text:'Gunne: Şeddeli ن ve م okunurken ses bir miktar burundan da çıkar. Örnek: إِنَّ ve ثُمَّ',
   letters:['نّ','مّ']},
  {id:'cevf', name:'Ağız boşluğu', ar:'جَوْف', color:'#8A5A2B', x:118, y:150,
   text:'Uzatma (med) harfleri ağız ve boğaz boşluğundan çıkar: üstünden sonra ا, esreden sonra ي, ötreden sonra و gelirse ses uzatılır.',
   letters:['ا','و','ي']}
];

// Stars for the new exercises (counted with the other extras)
EX_SETS.push(['b', ()=> SIMILAR_LETTERS]);
EX_SETS.push(['k', ()=> BUILD_WORDS.map((_, i)=> String(i))]);
EX_SETS.push(['z', ()=> MAHREC.map(z=> z.id)]);

function plusStar(key, el){
  if(state.extra[key]) return false;
  state.extra[key] = true;
  if(el) celebrate(el);
  updateHeader();
  return true;
}

/* ============ Hece table (Hece Ustası → Tablo) ============ */
function renderHeceTable(){
  const el = document.getElementById('heceTable');
  if(!el) return;
  el.innerHTML = `<div class="hece-head"><span></span><span>Üstün</span><span>Esre</span><span>Ötre</span></div>` +
    SYLLABLE_LETTERS.map((L, li)=>{
      const row = SYLLABLES.filter(s=> s.letter === li);
      return `<div class="hece-row"><span class="hece-letter arabic">${L.g}</span>${row.map(s=>
        `<button type="button" class="hece-cell ${state.syllables[SYLLABLES.indexOf(s)] ? 'done' : ''}" onclick="speakArabic('${s.g}')"><span class="arabic">${s.g}</span><small>${s.correct}</small></button>`).join('')}</div>`;
    }).join('');
}
function switchHece(tab){
  document.querySelectorAll('#panel-syllables .hece-tab').forEach(b=> b.classList.toggle('active', b.dataset.t === tab));
  document.getElementById('heceQuizWrap').style.display = tab === 'quiz' ? '' : 'none';
  document.getElementById('heceTable').style.display = tab === 'table' ? '' : 'none';
  if(tab === 'table') renderHeceTable();
}

/* ============ Benzer harfler ============ */
let simQ = null;
function nextSimilar(){
  const g = SIMILAR_GROUPS[Math.floor(Math.random()*SIMILAR_GROUPS.length)];
  const target = g[Math.floor(Math.random()*g.length)];
  simQ = {group:g, target, locked:false};
  renderSimilar();
}
function renderSimilar(){
  const el = document.getElementById('content-similar');
  if(!el) return;
  if(!simQ) nextSimilar();
  const L = LETTERS.find(x=> x.g === simQ.target);
  const done = SIMILAR_LETTERS.filter(x=> state.extra['b:'+x]).length;
  el.innerHTML = `<p class="tab-hint">Bu harfler birbirine benzer, sadece noktaları farklı! Noktalara dikkat et. (${done}/${SIMILAR_LETTERS.length} ⭐)</p>
    <div class="sim-compare">${simQ.group.map(x=>{ const l = LETTERS.find(y=> y.g === x);
      return `<button type="button" class="sim-card" onclick="speakArabic('${l.ar}')"><span class="arabic">${x}</span><b>${l.name}</b><small>${DOT_TIPS[x]}</small></button>`; }).join('')}</div>
    <div class="quiz-box"><div class="quiz-question">Hangisi <b>${L.name}</b>?</div>
      <div class="quiz-options sim-options">${shuffle(simQ.group.slice()).map(x=> `<button type="button" class="quiz-opt arabic" onclick="answerSimilar(this,'${x}')">${x}</button>`).join('')}</div>
      <div class="quiz-feedback" id="simFb"></div></div>`;
}
function answerSimilar(btn, x){
  if(simQ.locked) return;
  if(x === simQ.target){
    simQ.locked = true;
    btn.classList.add('correct');
    celebrate(btn);
    const L = LETTERS.find(y=> y.g === x);
    speakArabic(L.ar);
    document.getElementById('simFb').textContent = randomPraise() + ' ' + DOT_TIPS[x] + '.';
    if(!state.extra['b:'+x]){ state.extra['b:'+x] = true; updateHeader(); }
    setTimeout(nextSimilar, 1300);
  }else{
    btn.classList.add('wrong');
    btn.disabled = true;
    if(typeof feedbackWrong === 'function') feedbackWrong(btn);
    document.getElementById('simFb').textContent = 'Noktalara bak: ' + simQ.target + ' → ' + DOT_TIPS[simQ.target];
  }
}

/* ============ Kelime kur ============ */
let buildState = null;
function startBuild(i){
  if(i === undefined){
    const open = BUILD_WORDS.map((_, j)=> j).filter(j=> !state.extra['k:'+j]);
    i = open.length ? open[0] : Math.floor(Math.random()*BUILD_WORDS.length);
  }
  const w = BUILD_WORDS[i];
  const pool = LETTERS.map(l=> l.g).filter(g=> !w[4].includes(g));
  const extra = shuffle(pool).slice(0, w[4].length >= 4 ? 1 : 2);
  buildState = {i, filled:[], tiles:shuffle([...w[4], ...extra].map((g, k)=> ({g, k, used:false}))), done:false};
  renderBuild();
}
function renderBuild(){
  const el = document.getElementById('content-build');
  if(!el) return;
  if(!buildState) startBuild();
  const w = BUILD_WORDS[buildState.i], done = BUILD_WORDS.filter((_, j)=> state.extra['k:'+j]).length;
  el.innerHTML = `<p class="tab-hint">Harfleri sırayla seç ve kelimeyi kur! Arapça <b>sağdan sola</b> yazılır. (${done}/${BUILD_WORDS.length} ⭐)</p>
    <div class="build-card">
      <div class="build-pic">${w[3]}</div>
      <div class="build-meaning"><b>${w[2]}</b><small>${w[1]}</small></div>
      <div class="build-slots" dir="rtl">${w[4].map((_, k)=> `<span class="build-slot ${buildState.filled[k] ? 'on' : ''}">${buildState.filled[k] ? `<span class="arabic">${buildState.filled[k]}</span>` : ''}</span>`).join('')}</div>
      ${buildState.done ? `<div class="build-word arabic">${w[0]}</div><div class="ex-row ex-nav"><button class="ex-learn" type="button" onclick="speakArabic('${w[0]}')">🔊 Dinle</button><button class="voice-btn ghost" type="button" onclick="startBuild(${(buildState.i + 1) % BUILD_WORDS.length})">Sonraki kelime ›</button></div>`
        : `<div class="build-tiles">${buildState.tiles.map((t, k)=> `<button type="button" class="build-tile arabic" ${t.used ? 'disabled' : ''} onclick="pickTile(${k}, this)">${t.g}</button>`).join('')}</div>
           <div class="ex-row ex-nav"><button class="voice-btn ghost" type="button" onclick="startBuild(${buildState.i})">↺ Baştan</button><button class="voice-btn ghost" type="button" onclick="startBuild(${(buildState.i + 1) % BUILD_WORDS.length})">Atla ›</button></div>`}
    </div>
    <div class="chips build-list">${BUILD_WORDS.map((x, j)=> `<button type="button" class="chip ${state.extra['k:'+j] ? 'on' : ''} ${j === buildState.i ? 'gold' : ''}" onclick="startBuild(${j})">${x[3]} ${x[2]}</button>`).join('')}</div>`;
}
function pickTile(k, btn){
  const w = BUILD_WORDS[buildState.i], t = buildState.tiles[k];
  const need = w[4][buildState.filled.length];
  if(t.g !== need){
    btn.classList.add('wrong');
    if(typeof feedbackWrong === 'function') feedbackWrong(btn);
    setTimeout(()=> btn.classList.remove('wrong'), 500);
    return;
  }
  t.used = true;
  buildState.filled.push(t.g);
  if(buildState.filled.length === w[4].length){
    buildState.done = true;
    renderBuild();
    const card = document.querySelector('#content-build .build-word');
    speakArabic(w[0]);
    if(!plusStar('k:'+buildState.i, card)) celebrate(card);
    renderBuild();
  }else{
    renderBuild();
  }
}

/* ============ Mahreç ============ */
let mahrecSel = null;
function renderMahrec(){
  const el = document.getElementById('content-mahrec');
  if(!el) return;
  const z = MAHREC.find(x=> x.id === mahrecSel);
  const done = MAHREC.filter(x=> state.extra['z:'+x.id]).length;
  el.innerHTML = `<p class="tab-hint">Her harfin ağızda çıktığı bir yer var. Renkli noktalara dokun! (${done}/${MAHREC.length} ⭐)</p>
    <div class="mahrec-pic">
      <svg viewBox="0 0 200 200" role="img" aria-label="Ağız ve boğaz çizimi">
        <path d="M60 196 C 58 160, 40 140, 44 100 C 48 52, 88 22, 126 26 C 156 30, 168 50, 166 70 L 178 92 C 181 97, 177 100, 172 100 L 168 104 C 172 108, 170 112, 166 113 L 168 118 C 172 122, 168 128, 162 128 C 168 136, 164 146, 152 148 C 140 150, 128 150, 118 160 C 110 168, 108 184, 110 196 Z" fill="#F6D7B8" stroke="#8A5A2B" stroke-width="2"/>
        <path d="M120 112 C 136 104, 152 106, 164 112" fill="none" stroke="#8A5A2B" stroke-width="2"/>
        <path d="M70 140 C 84 118, 108 112, 140 122 C 150 126, 156 126, 160 122" fill="#E87A8A" stroke="#B3392F" stroke-width="2"/>
        <path d="M66 150 C 64 170, 66 186, 70 196" fill="none" stroke="#B3392F" stroke-width="3" opacity=".6"/>
        <circle cx="128" cy="62" r="3" fill="#22312D"/>
        ${MAHREC.map(m=> `<g class="mz ${m.id === mahrecSel ? 'sel' : ''}" onclick="selectMahrec('${m.id}')" style="cursor:pointer">
          <circle cx="${m.x}" cy="${m.y}" r="13" fill="${m.color}" opacity=".9"/><circle cx="${m.x}" cy="${m.y}" r="13" fill="none" stroke="#fff" stroke-width="2"/>
          <text x="${m.x}" y="${m.y + 4}" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">${MAHREC.indexOf(m) + 1}</text></g>`).join('')}
      </svg>
      <div class="mahrec-legend">${MAHREC.map((m, i)=> `<button type="button" class="chip ${m.id === mahrecSel ? 'on' : ''}" onclick="selectMahrec('${m.id}')"><span class="mz-dot" style="background:${m.color}"></span>${i + 1}. ${m.name}${state.extra['z:'+m.id] ? ' ✓' : ''}</button>`).join('')}</div>
    </div>
    ${z ? `<div class="ex-card mahrec-info"><b>${z.name} <span class="arabic">(${z.ar})</span></b><p>${z.text}</p>
      <div class="chips">${z.letters.map(g=> `<button type="button" class="chip mahrec-letter arabic" onclick="speakArabic('${g}')">${g}</button>`).join('')}</div></div>` : ''}`;
}
function selectMahrec(id){
  mahrecSel = id;
  renderMahrec();
  plusStar('z:'+id, document.querySelector('#content-mahrec .mahrec-info'));
}

/* ============ Start-up ============ */
function initElifbePlus(){
  // Hece Ustası: Alıştırma / Tablo tabs
  const sp = document.getElementById('panel-syllables');
  const qp = document.getElementById('quizProgress');
  if(sp && qp && !document.getElementById('heceTable')){
    const wrap = document.createElement('div');
    wrap.id = 'heceQuizWrap';
    qp.parentNode.insertBefore(wrap, qp);
    wrap.appendChild(qp);
    wrap.appendChild(sp.querySelector('.quiz-box'));
    wrap.insertAdjacentHTML('beforebegin', `<div class="tabbar"><button class="tab-btn hece-tab active" data-t="quiz" onclick="switchHece('quiz')">Alıştırma</button><button class="tab-btn hece-tab" data-t="table" onclick="switchHece('table')">Tablo (28 harf)</button></div>`);
    wrap.insertAdjacentHTML('afterend', '<div class="hece-table" id="heceTable" style="display:none"></div>');
  }
  // Elifbe: three new tabs
  const lp = document.getElementById('panel-letters');
  const bar = lp && lp.querySelector('.tabbar');
  if(bar && !document.getElementById('tab-similar')){
    [['similar','Benzer'],['build','Kelime kur'],['mahrec','Mahreç']].forEach(([t, label])=>{
      bar.insertAdjacentHTML('beforeend', `<button class="tab-btn" id="tab-${t}" onclick="switchTab('${t}')">${label}</button>`);
      lp.insertAdjacentHTML('beforeend', `<div class="tab-content" id="content-${t}"></div>`);
      LETTER_TABS.push(t);
    });
    const _switch = switchTab;
    switchTab = function(tab){
      _switch(tab);
      if(tab === 'similar') renderSimilar();
      if(tab === 'build') renderBuild();
      if(tab === 'mahrec') renderMahrec();
    };
  }
}
