// Settings menu, sound/vibration feedback, flying stars, Lale reactions,
// dark mode, large text, daily goal + streak, "Bugünkü dersim" and the
// treasure chest. Loaded after voice.js and before app.js.

/* ============ Settings ============ */
const SETTINGS_KEY = 'humanur-settings';
const settings = Object.assign(
  {sound:true, vibrate:true, lale:true, bigText:false, theme:'auto', goal:5},
  (()=>{ try{ return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {}; }catch(e){ return {}; } })()
);
function saveSettings(){
  try{ localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); }catch(e){}
  applySettings();
}
const darkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
function applySettings(){
  const dark = settings.theme === 'dark' || (settings.theme === 'auto' && darkQuery && darkQuery.matches);
  document.body.classList.toggle('dark', !!dark);
  document.body.classList.toggle('bigtext', !!settings.bigText);
  const meta = document.querySelector('meta[name="theme-color"]');
  if(meta) meta.content = dark ? '#0B1F1D' : '#0F5C56';
}
if(darkQuery && darkQuery.addEventListener) darkQuery.addEventListener('change', applySettings);

/* ============ Sound + vibration ============ */
let audioCtx = null;
function tone(freq, start, dur, type, vol){
  const o = audioCtx.createOscillator(), g = audioCtx.createGain();
  o.type = type; o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, audioCtx.currentTime + start);
  g.gain.exponentialRampToValueAtTime(vol, audioCtx.currentTime + start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + start + dur);
  o.connect(g).connect(audioCtx.destination);
  o.start(audioCtx.currentTime + start);
  o.stop(audioCtx.currentTime + start + dur + 0.05);
}
function playSfx(kind){
  if(!settings.sound) return;
  try{
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if(audioCtx.state === 'suspended') audioCtx.resume();
    if(kind === 'good'){ tone(784, 0, .16, 'sine', .18); tone(1175, .1, .26, 'sine', .16); }
    else if(kind === 'win'){ [523, 659, 784, 1047].forEach((f, i)=> tone(f, i*.11, .3, 'sine', .16)); }
    else{ tone(220, 0, .22, 'triangle', .12); }
  }catch(e){}
}
function buzz(ms){ if(settings.vibrate && navigator.vibrate) try{ navigator.vibrate(ms); }catch(e){} }

/* ============ Lale reactions ============ */
const LALE_SVG = `<svg viewBox="0 0 60 70" width="44" height="52" aria-hidden="true"><path d="M30 40 V66" stroke="#2A9D8F" stroke-width="3" fill="none"/><path d="M30 60 Q16 58 12 44 Q24 46 30 56 Z" fill="#2A9D8F"/><path d="M30 62 Q44 58 48 46 Q36 48 30 58 Z" fill="#2A9D8F"/><path d="M30 4 Q22 10 18 6 Q14 22 18 34 Q24 42 30 42 Q36 42 42 34 Q46 22 42 6 Q38 10 30 4 Z" fill="#D1495B"/><path d="M30 6 Q26 18 30 40 Q34 18 30 6 Z" fill="#E87A8A"/><circle cx="24.5" cy="24" r="2" fill="#22312D"/><circle cx="35.5" cy="24" r="2" fill="#22312D"/><path class="lale-mouth" d="M25 30 Q30 34 35 30" stroke="#22312D" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="21" cy="29" r="2.2" fill="#F6A5B0" opacity=".8"/><circle cx="39" cy="29" r="2.2" fill="#F6A5B0" opacity=".8"/></svg>`;
const LALE_GOOD = ['Aferin! 🌷','Maşallah! ⭐','Süpersin!','Harika!','Çok güzel!'];
const LALE_BAD = ['Tekrar dene, yapabilirsin!','Az kaldı!','Bir daha bak 🌷'];
let lalePopT = null;
function laleReact(good){
  if(!settings.lale) return;
  const el = document.getElementById('lalePop');
  if(!el) return;
  el.querySelector('.lp-text').textContent = (good ? LALE_GOOD : LALE_BAD)[Math.floor(Math.random() * (good ? LALE_GOOD : LALE_BAD).length)];
  el.classList.remove('good', 'bad', 'show');
  void el.offsetWidth;
  el.classList.add('show', good ? 'good' : 'bad');
  clearTimeout(lalePopT);
  lalePopT = setTimeout(()=> el.classList.remove('show'), 1500);
  const home = document.querySelector('.lale-avatar');
  if(home && good){ home.classList.remove('jump'); void home.offsetWidth; home.classList.add('jump'); }
}

/* ============ Flying star ============ */
function flyStar(fromEl){
  const target = document.getElementById('starCount');
  if(!fromEl || !target || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const a = fromEl.getBoundingClientRect(), b = target.getBoundingClientRect();
  const s = document.createElement('span');
  s.className = 'fly-star';
  s.textContent = '⭐';
  s.style.left = (a.left + a.width/2) + 'px';
  s.style.top = (a.top + a.height/2) + 'px';
  document.body.appendChild(s);
  requestAnimationFrame(()=>{
    s.style.transform = `translate(${b.left + b.width/2 - (a.left + a.width/2)}px, ${b.top + b.height/2 - (a.top + a.height/2)}px) scale(.6)`;
    s.style.opacity = '.3';
  });
  setTimeout(()=>{
    s.remove();
    const pill = target.closest('.starpill');
    if(pill){ pill.classList.remove('pulse'); void pill.offsetWidth; pill.classList.add('pulse'); }
  }, 750);
}

/* Hooks used by script.js / extra.js */
const _celebrateBase = celebrate;
celebrate = function(el){
  _celebrateBase(el);
  playSfx('good');
  buzz(15);
  flyStar(el);
  laleReact(true);
};
function feedbackWrong(el){
  playSfx('bad');
  buzz([40, 40, 40]);
  laleReact(false);
  if(el){ el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); }
}

/* ============ Daily goal + streak ============ */
const todayStars = ()=> (state.days[DK] && state.days[DK].n) || 0;
function goalRing(n, goal){
  const pct = Math.min(1, n / goal), r = 22, c = 2 * Math.PI * r;
  return `<svg viewBox="0 0 56 56" width="56" height="56" aria-hidden="true"><circle cx="28" cy="28" r="${r}" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="6"/>
    <circle cx="28" cy="28" r="${r}" fill="none" stroke="#F1CE84" stroke-width="6" stroke-linecap="round" stroke-dasharray="${(c*pct).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 28 28)"/></svg>`;
}
let goalCelebrated = false;
function refreshFun(){
  const sc = document.getElementById('streakCount');
  if(sc) sc.textContent = streak();
  const g = document.getElementById('homeGoal');
  const n = todayStars(), goal = settings.goal;
  if(g){
    g.innerHTML = `<div class="goal-ring">${goalRing(n, goal)}<span>${Math.min(n, goal)}</span></div>
      <div class="goal-text"><b>${n >= goal ? 'Bugünkü hedef tamam! 🎉' : 'Bugünkü hedef'}</b><span>${Math.min(n, goal)} / ${goal} yıldız · 🔥 ${streak()} gün üst üste</span></div>`;
  }
  if(n >= goal && !goalCelebrated && lastTotal !== null){
    const key = 'humanur-goal-'+DK;
    let shown = false; try{ shown = sessionStorage.getItem(key) || localStorage.getItem(key); }catch(e){}
    if(!shown && n > 0){
      try{ localStorage.setItem(key, '1'); }catch(e){}
      // Don't cover a toast that is already showing (e.g. the 100% milestone).
      const busy = document.getElementById('toast').classList.contains('show');
      setTimeout(()=>{ showToast('Bugünkü hedefe ulaştın! Maşallah! 🎉'); playSfx('win'); }, busy ? 2700 : 0);
    }
    goalCelebrated = true;
  }
  const d = document.getElementById('homeDaily');
  if(d){
    const done = state.days[DK] && state.days[DK].daily;
    d.innerHTML = `<button class="daily-card ${done?'done':''}" type="button" onclick="openStage('gunluk')">
      <span class="daily-ic">${done ? '✅' : '🌟'}</span>
      <span class="daily-body"><b>Bugünkü dersim</b><span>${done ? 'Tamamlandı! İstersen tekrar çalış.' : '8 kısa soru · yaklaşık 3 dakika'}</span></span>
      <span class="daily-go">${done ? '↻' : 'Başla'}</span></button>`;
  }
  const chest = document.getElementById('stars-sandik');
  if(chest){ const c = chestCounts(); chest.textContent = c.got+' / '+c.max+' hazine'; }
  if(currentStage !== 'sandik') renderChest();
}

/* ============ Bugünkü dersim ============ */
let daily = null;
function buildDaily(){
  const pick = (arr, n)=> shuffle(arr.slice()).slice(0, n);
  const names = i=> [LETTERS[i].name, ...pick(LETTERS.map((_, j)=> j).filter(j=> j !== i), 3).map(j=> LETTERS[j].name)];
  const items = [];
  pick(LETTERS.map((_, i)=> i), 3).forEach(i=> items.push({q:'Bu harfin adı nedir?', g:LETTERS[i].g, correct:LETTERS[i].name, options:names(i), say:LETTERS[i].ar, store:['letters', i]}));
  pick(LETTERS.map((_, i)=> i), 2).forEach(i=>{
    const f = letterForms(LETTERS[i].g), pos = ['ini','med','fin'][Math.floor(Math.random()*3)];
    items.push({q:'Bu şekil hangi harf?', g:f[pos], correct:LETTERS[i].name, options:names(i), say:LETTERS[i].ar, store:['forms', i]});
  });
  pick(SYLLABLES.map((_, i)=> i), 2).forEach(i=> items.push({q:'Nasıl okunur?', g:SYLLABLES[i].g, correct:SYLLABLES[i].correct, options:SYLLABLES[i].options, store:['syllables', i]}));
  const L = LESSONS[Math.floor(Math.random()*LESSONS.length)], j = Math.floor(Math.random()*L.items.length), it = L.items[j];
  items.push({q:L.title+' · nasıl okunur?', g:it.g, correct:it.correct, options:it.options, store:['lessons', L.id+'-'+j]});
  daily = {items, i:0, right:0, locked:false};
}
function renderDaily(){
  const el = document.getElementById('exbody-gunluk');
  if(!el) return;
  if(!daily) buildDaily();
  if(daily.i >= daily.items.length){
    el.innerHTML = `<div class="ex-card ex-center daily-done"><div class="ex-level">🏆</div><h3>Bugünkü dersin tamam!</h3>
      <p>${daily.right} / ${daily.items.length} soruyu ilk denemede bildin. Maşallah Hümanur!</p>
      <div class="ex-row ex-nav"><button class="ex-learn" type="button" onclick="daily=null;renderDaily()">Tekrar çalış</button>
      <button class="voice-btn ghost" type="button" onclick="closeStage()">Bitir</button></div></div>`;
    return;
  }
  const it = daily.items[daily.i];
  el.innerHTML = `<div class="daily-steps">${daily.items.map((_, k)=> `<i class="${k < daily.i ? 'on' : k === daily.i ? 'cur' : ''}"></i>`).join('')}</div>
    <div class="quiz-box"><div class="quiz-question">${it.q}</div><div class="quiz-glyph arabic">${it.g}</div>
    <div class="quiz-options">${shuffle(it.options.slice()).map(o=> `<button class="quiz-opt" type="button" data-o="${o}" onclick="answerDaily(this)">${o}</button>`).join('')}</div>
    <div class="quiz-feedback" id="dailyFb"></div></div>`;
  daily.locked = false;
  daily.firstTry = true;
}
function answerDaily(btn){
  if(daily.locked) return;
  const it = daily.items[daily.i];
  if(btn.dataset.o === it.correct){
    daily.locked = true;
    if(daily.firstTry) daily.right++;
    btn.classList.add('correct');
    celebrate(btn);
    speakArabic(it.say || it.g);
    document.getElementById('dailyFb').textContent = randomPraise();
    const [k, id] = it.store;
    if(!state[k][id]){ state[k][id] = true; if(k === 'letters'){ const c = document.getElementById('letter-'+id); if(c) c.classList.add('learned'); } updateHeader(); }
    setTimeout(()=>{
      daily.i++;
      if(daily.i >= daily.items.length){
        const d = state.days[DK] || (state.days[DK] = {s:[0,0,0,0,0], n:0});
        if(!d.daily){ d.daily = 1; saveProgress(); }
        playSfx('win');
        updateHeader();
      }
      renderDaily();
    }, 1000);
  }else{
    daily.firstTry = false;
    btn.classList.add('wrong');
    btn.disabled = true;
    feedbackWrong(btn);
    document.getElementById('dailyFb').textContent = 'Tekrar dene!';
  }
}

/* ============ Hazine Sandığım ============ */
function chestCounts(){
  const b = BADGES.filter(x=> x[3]()).length;
  const s = Math.max(0, storiesUnlocked);
  const p = countTrue(state.pages);
  return {b, s, p, got:b + s + p, max:BADGES.length + STORIES.length + PAGE_COUNT};
}
function renderChest(){
  const el = document.getElementById('exbody-sandik');
  if(!el) return;
  const c = chestCounts(), pct = c.got / c.max;
  const fill = Math.round(46 * pct);
  el.innerHTML = `<div class="ex-card ex-center chest-hero">
      <svg viewBox="0 0 120 100" width="150" height="125" aria-hidden="true">
        <defs><clipPath id="chestIn"><rect x="14" y="44" width="92" height="46" rx="6"/></clipPath></defs>
        <rect x="14" y="44" width="92" height="46" rx="6" fill="#8A5A2B"/>
        <rect x="14" y="${90 - fill}" width="92" height="${fill}" fill="#F1CE84" clip-path="url(#chestIn)"/>
        <g clip-path="url(#chestIn)">${pct > .05 ? '<text x="34" y="86" font-size="14">⭐</text>' : ''}${pct > .3 ? '<text x="62" y="80" font-size="14">🌷</text>' : ''}${pct > .6 ? '<text x="80" y="70" font-size="14">💎</text>' : ''}</g>
        <path d="M10 44 Q60 4 110 44 Z" fill="#A86E35"/><rect x="10" y="40" width="100" height="8" rx="3" fill="#CC9A3C"/>
        <rect x="54" y="38" width="12" height="16" rx="3" fill="#F1CE84" stroke="#8A6416"/>
        <rect x="14" y="60" width="92" height="4" fill="#CC9A3C" opacity=".7"/>
      </svg>
      <h3>Hazine Sandığım</h3><div class="ex-sub">${c.got} / ${c.max} hazine toplandı</div>
      <div class="bar-bg ex-bar"><div class="bar-fill" style="width:${Math.round(pct*100)}%"></div></div></div>
    <div class="ex-label">🏅 Rozetler · ${c.b}/${BADGES.length}</div>
    <div class="chest-grid">${BADGES.map(b=>{ const ok = b[3](); return `<div class="chest-item ${ok?'got':''}" title="${b[2]}"><span>${ok ? b[1] : '🔒'}</span><small>${b[0]}</small></div>`; }).join('')}</div>
    <div class="ex-label">📜 Osmanlı kartları · ${c.s}/${STORIES.length}</div>
    <div class="chest-grid">${STORIES.map((s, i)=> `<button type="button" class="chest-item ${i < storiesUnlocked ? 'got' : ''}" onclick="${i < storiesUnlocked ? `openStage('stories')` : `showToast('Bu kartı açmak için daha fazla yıldız topla! ⭐')`}"><span>${i < storiesUnlocked ? s.icon : '🔒'}</span><small>${i < storiesUnlocked ? s.title : (i*STORY_STEP)+' ⭐'}</small></button>`).join('')}</div>
    <div class="ex-label">🌷 Lale çıkartmaları · ${c.p}/${PAGE_COUNT}</div>
    <div class="chest-grid">${Array.from({length:PAGE_COUNT}, (_, i)=> `<div class="chest-item ${state.pages[i+1]?'got':''}"><span>${state.pages[i+1] ? '🌷' : '○'}</span><small>Sayfa ${i+1}</small></div>`).join('')}</div>`;
}

/* ============ Ayarlar ============ */
function renderSettings(){
  const el = document.getElementById('exbody-ayarlar');
  if(!el) return;
  const sw = (key, label, sub)=> `<label class="set-row"><span><b>${label}</b><small>${sub}</small></span>
    <input type="checkbox" class="switch" ${settings[key] ? 'checked' : ''} onchange="settings.${key}=this.checked;saveSettings();${key==='sound'?"if(this.checked)playSfx('good');":''}"></label>`;
  const seg = (key, opts)=> `<div class="seg">${opts.map(([v, l])=> `<button type="button" class="${settings[key]===v?'on':''}" onclick="settings.${key}=${typeof v==='number'?v:`'${v}'`};saveSettings();renderSettings();refreshFun()">${l}</button>`).join('')}</div>`;
  el.innerHTML = `
    <div class="ex-label">Görünüm</div>
    <div class="ex-card"><b>Tema</b>${seg('theme', [['auto','Otomatik'],['light','☀️ Açık'],['dark','🌙 Koyu']])}
      ${sw('bigText', 'Büyük yazı', 'Harfler ve düğmeler daha büyük olur')}</div>
    <div class="ex-label">Geri bildirim</div>
    <div class="ex-card">${sw('sound', 'Ses efektleri', 'Doğru cevapta zil, yanlışta yumuşak ses')}${sw('vibrate', 'Titreşim', 'Telefon destekliyorsa')}${sw('lale', 'Lale tepkileri', 'Lale doğru cevapta sevinir, yanlışta cesaret verir')}</div>
    <div class="ex-label">Günlük hedef</div>
    <div class="ex-card"><b>Her gün kaç yıldız?</b>${seg('goal', [[5,'5 ⭐'],[10,'10 ⭐'],[15,'15 ⭐'],[20,'20 ⭐']])}</div>
    <div class="ex-label">Kâri (okuyan)</div>
    <div class="ex-card"><div class="chips reciter-chips">${reciterChips()}</div>
      <p class="ex-sub">Kâbe imamları: Sudeys, Şüreym, Mâhir el-Muaykılî · Medine imamı: Huzeyfî. Bir kâri yüklenemezse otomatik olarak Mishary Alafasy okur.</p></div>`;
}

/* ============ Start-up (called from init() before the app shell) ============ */
function initFun(){
  applySettings();
  const map = document.getElementById('mapView'), main = document.querySelector('main');
  const extra = [
    {id:'gunluk',  icon:'🌟', title:'Bugünkü Dersim',  desc:'Her gün 8 kısa soru'},
    {id:'sandik',  icon:'🧰', title:'Hazine Sandığım', desc:'Rozetler, Osmanlı kartları ve çıkartmalar'},
    {id:'ayarlar', icon:'⚙️', title:'Ayarlar',         desc:'Tema, yazı, ses, günlük hedef ve kâri'}
  ];
  extra.forEach(st=>{
    const n = document.createElement('div');
    n.className = 'stage-node ex-node';
    n.dataset.stage = st.id;
    n.setAttribute('role', 'button');
    n.tabIndex = 0;
    n.onclick = ()=> openStage(st.id);
    n.onkeydown = e=> onStageKey(e, st.id);
    n.innerHTML = `<div class="stage-badge">${st.icon}</div><div class="stage-body"><h3>${st.title}</h3><p>${st.desc}</p><div class="stage-stars" id="stars-${st.id}"></div></div>`;
    map.appendChild(n);
    const sec = document.createElement('section');
    sec.className = 'panel';
    sec.id = 'panel-'+st.id;
    sec.innerHTML = `<button class="back-btn" onclick="closeStage()">← Yolculuğa dön</button>
      <div class="panel-header"><h2>${st.title}</h2><p>${st.desc}</p></div><div class="ex-body" id="exbody-${st.id}"></div>`;
    main.appendChild(sec);
  });
  document.body.insertAdjacentHTML('beforeend', `<div class="lale-pop" id="lalePop" aria-live="polite">${LALE_SVG}<span class="lp-text"></span></div>`);
  // Panels that render on open
  const _open = openStage;
  openStage = function(stage){
    if(stage === 'gunluk'){ daily = null; renderDaily(); }
    if(stage === 'sandik') renderChest();
    if(stage === 'ayarlar') renderSettings();
    _open(stage);
  };
  renderSettings();
}
