const LETTERS = [
  {g:"ا", name:"Elif", word:"Esed (aslan)", emoji:"🦁"},
  {g:"ب", name:"Be", word:"Beyt (ev)", emoji:"🏠"},
  {g:"ت", name:"Te", word:"Tüffah (elma)", emoji:"🍎"},
  {g:"ث", name:"Se", word:"Sa'leb (tilki)", emoji:"🦊"},
  {g:"ج", name:"Cim", word:"Cezer (havuç)", emoji:"🥕"},
  {g:"ح", name:"Ha", word:"Hût (balık)", emoji:"🐟"},
  {g:"خ", name:"Hı", word:"Havh (şeftali)", emoji:"🍑"},
  {g:"د", name:"Dal", word:"Decâce (tavuk)", emoji:"🐔"},
  {g:"ذ", name:"Zel", word:"Zi'b (kurt)", emoji:"🐺"},
  {g:"ر", name:"Ra", word:"Rummân (nar)", emoji:"🍈"},
  {g:"ز", name:"Ze", word:"Zerâfe (zürafa)", emoji:"🦒"},
  {g:"س", name:"Sin", word:"Seyyâre (araba)", emoji:"🚗"},
  {g:"ش", name:"Şın", word:"Şems (güneş)", emoji:"☀️"},
  {g:"ص", name:"Sad", word:"Sakr (şahin)", emoji:"🦅"},
  {g:"ض", name:"Dad", word:"Difda' (kurbağa)", emoji:"🐸"},
  {g:"ط", name:"Tı", word:"Tâir (kuş)", emoji:"🐦"},
  {g:"ظ", name:"Zı", word:"Zabî (ceylan)", emoji:"🦌"},
  {g:"ع", name:"Ayn", word:"İneb (üzüm)", emoji:"🍇"},
  {g:"غ", name:"Ğayn", word:"Gurâb (karga)", emoji:"🐦‍⬛"},
  {g:"ف", name:"Fe", word:"Fîl (fil)", emoji:"🐘"},
  {g:"ق", name:"Kaf", word:"Kamer (ay)", emoji:"🌙"},
  {g:"ك", name:"Kef", word:"Kelb (köpek)", emoji:"🐶"},
  {g:"ل", name:"Lâm", word:"Leymûn (limon)", emoji:"🍋"},
  {g:"م", name:"Mim", word:"Mevz (muz)", emoji:"🍌"},
  {g:"ن", name:"Nun", word:"Nahle (arı)", emoji:"🐝"},
  {g:"و", name:"Vav", word:"Verd (gül)", emoji:"🌹"},
  {g:"ه", name:"He", word:"Hediyye (hediye)", emoji:"🎁"},
  {g:"ي", name:"Ye", word:"Yed (el)", emoji:"✋"}
];

const SYLLABLES = [
  {g:"بَ", correct:"ba", options:["ba","bi","bu"]},
  {g:"بِ", correct:"bi", options:["bu","ba","bi"]},
  {g:"بُ", correct:"bu", options:["bi","bu","ba"]},
  {g:"تَ", correct:"ta", options:["ta","ti","tu"]},
  {g:"تِ", correct:"ti", options:["ta","ti","tu"]},
  {g:"تُ", correct:"tu", options:["tu","ti","ta"]},
  {g:"مَ", correct:"ma", options:["mi","ma","mu"]},
  {g:"مِ", correct:"mi", options:["ma","mi","mu"]},
  {g:"مُ", correct:"mu", options:["mu","mi","ma"]},
  {g:"نَ", correct:"na", options:["na","ni","nu"]},
  {g:"نِ", correct:"ni", options:["nu","na","ni"]},
  {g:"نُ", correct:"nu", options:["ni","nu","na"]}
];

const SURAS = [
  { name:"Fâtiha Sûresi", note:"Açan Sûre", ayat:[
    {ar:"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", tr:"Bismillâhi'r-rahmâni'r-rahîm", de:"Her şeyi yaratan, çok sevecen ve çok merhametli olan Allah'ın adıyla."},
    {ar:"الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", tr:"El-hamdü lillâhi rabbi'l-âlemîn", de:"Bütün övgüler, tüm âlemlerin Rabbi olan Allah'a aittir."},
    {ar:"الرَّحْمَٰنِ الرَّحِيمِ", tr:"Er-rahmâni'r-rahîm", de:"O, çok sevecen ve çok merhametlidir."},
    {ar:"مَالِكِ يَوْمِ الدِّينِ", tr:"Mâliki yevmi'd-dîn", de:"Hesap gününün tek sahibidir."},
    {ar:"إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", tr:"İyyâke na'büdü ve iyyâke nesta'în", de:"Yalnız Sana kulluk eder, yalnız Senden yardım isteriz."},
    {ar:"اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", tr:"İhdine's-sırâta'l-müstakîm", de:"Bizi doğru yola ilet."},
    {ar:"صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", tr:"Sırâta'l-lezîne en'amte aleyhim ğayri'l-mağdûbi aleyhim ve le'd-dâllîn", de:"Kendilerine iyilik ettiğin kimselerin yoluna; gazaba uğrayanların ya da yolunu şaşıranların yoluna değil."}
  ]},
  { name:"İhlâs Sûresi", note:"Öz ve Sadelik", ayat:[
    {ar:"قُلْ هُوَ اللَّهُ أَحَدٌ", tr:"Kul hüvallâhü ehad", de:"De ki: O, Allah'tır, tektir."},
    {ar:"اللَّهُ الصَّمَدُ", tr:"Allâhu's-samed", de:"Allah, hiçbir şeye muhtaç olmayan, her şeyin kendisine muhtaç olduğudur."},
    {ar:"لَمْ يَلِدْ وَلَمْ يُولَدْ", tr:"Lem yelid ve lem yûled", de:"O, doğurmamış ve doğurulmamıştır."},
    {ar:"وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ", tr:"Ve lem yekün lehû küfüven ehad", de:"Hiçbir şey O'na denk değildir."}
  ]},
  { name:"Nâs Sûresi", note:"İnsanlar", ayat:[
    {ar:"قُلْ أَعُوذُ بِرَبِّ النَّاسِ", tr:"Kul e'ûzü bi-rabbi'n-nâs", de:"De ki: İnsanların Rabbine sığınırım."},
    {ar:"مَلِكِ النَّاسِ", tr:"Meliki'n-nâs", de:"İnsanların hükümdarına."},
    {ar:"إِلَٰهِ النَّاسِ", tr:"İlâhi'n-nâs", de:"İnsanların ilâhına."},
    {ar:"مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", tr:"Min şerri'l-vesvâsi'l-hannâs", de:"Sinsice fısıldayanın kötülüğünden."},
    {ar:"الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", tr:"Ellezî yüvesvisü fî sudûri'n-nâs", de:"O ki insanların kalbine vesvese fısıldar."},
    {ar:"مِنَ الْجِنَّةِ وَالنَّاسِ", tr:"Mine'l-cinneti ve'n-nâs", de:"İster cinlerden olsun, ister insanlardan."}
  ]}
];

const state = { letters:{}, syllables:{}, suraAyat:{}, pages:{} };
let quizIndex = 0;
let quizOrder = [...Array(SYLLABLES.length).keys()];
let currentStage = null;

const STORAGE_KEY = 'humanur-progress-v1';
const hasStorage = (typeof window !== 'undefined') && !!window.storage;
let saveTimer = null;

async function loadProgress(){
  if(!hasStorage) return;
  try{
    const res = await window.storage.get(STORAGE_KEY, false);
    if(res && res.value){
      const saved = JSON.parse(res.value);
      if(saved.letters) Object.assign(state.letters, saved.letters);
      if(saved.syllables) Object.assign(state.syllables, saved.syllables);
      if(saved.suraAyat) Object.assign(state.suraAyat, saved.suraAyat);
      if(saved.pages) Object.assign(state.pages, saved.pages);
    }
  }catch(e){}
}

function saveProgress(){
  if(!hasStorage) return;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async ()=>{
    try{
      await window.storage.set(STORAGE_KEY, JSON.stringify(state), false);
      flashSaveIndicator();
    }catch(e){}
  }, 350);
}

function flashSaveIndicator(){
  const el = document.getElementById('saveIndicator');
  if(!el) return;
  el.classList.add('show');
  clearTimeout(flashSaveIndicator._t);
  flashSaveIndicator._t = setTimeout(()=> el.classList.remove('show'), 1400);
}

const PRAISE = ["Maşallah! ⭐","Aferin sana! 🌟","Harikasın! ✨","Çok iyi gidiyorsun! 🎉","Süpersin! 🌙"];
function randomPraise(){ return PRAISE[Math.floor(Math.random()*PRAISE.length)]; }

function totalStars(){
  const l = Object.values(state.letters).filter(Boolean).length;
  const s = Object.values(state.syllables).filter(Boolean).length;
  const q = Object.values(state.suraAyat).filter(Boolean).length;
  const p = Object.values(state.pages).filter(Boolean).length;
  return {l,s,q,p, total:l+s+q+p, max: LETTERS.length + SYLLABLES.length + 17 + 10};
}

function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2200);
}

let lastMilestone = 0;
function checkMilestone(pct){
  const steps = [25,50,75,100];
  for(const s of steps){
    if(pct>=s && lastMilestone<s){
      lastMilestone = s;
      const msgs = {25:"Yolun dörtte biri tamam! Harika gidiyorsun! ✨", 50:"Yolun yarısı bitti! Devam et! 🌙", 75:"Neredeyse tamam! Az kaldı! ⭐", 100:"Maşallah! Bütün yolculuğu tamamladın! 🏆"};
      showToast(msgs[s]);
    }
  }
}

function updateHeader(){
  const {total,max} = totalStars();
  const pct = Math.round((total/max)*100);
  document.getElementById('overallBar').style.width = pct+'%';
  document.getElementById('starsLabel').textContent = total+' / '+max+' yıldız toplandı';
  document.getElementById('moon').style.setProperty('--pct', pct);
  document.getElementById('moonPct').textContent = pct+'%';
  checkMilestone(pct);
  updateStageCards();
  saveProgress();
}

function updateStageCards(){
  const {l,s,q,p} = totalStars();
  document.getElementById('stars-letters').textContent = l+' / '+LETTERS.length+' ★';
  document.getElementById('stars-syllables').textContent = s+' / '+SYLLABLES.length+' ★';
  document.getElementById('stars-suras').textContent = q+' / 17 ★';
  document.getElementById('stars-pages').textContent = p+' / 10 ★';
  const letterPct = l/LETTERS.length;
  const syllPct = s/SYLLABLES.length;
  const suraPct = q/17;
  setLock('syllables', letterPct < 0.3);
  setLock('suras', syllPct < 0.3);
  setLock('pages', suraPct < 0.3);
}

function setLock(stage, locked){
  const node = document.querySelector('.stage-node[data-stage="'+stage+'"]');
  const icon = document.getElementById('lock-'+stage);
  if(locked){ node.classList.add('locked'); if(icon) icon.style.display='block'; }
  else { node.classList.remove('locked'); if(icon) icon.style.display='none'; }
}

function openStage(stage){
  const node = document.querySelector('.stage-node[data-stage="'+stage+'"]');
  if(node && node.classList.contains('locked')){
    showToast('Önce bir önceki bölümden birkaç yıldız topla! 🌟');
    return;
  }
  document.getElementById('mapView').style.display = 'none';
  document.getElementById('panel-'+stage).classList.add('open');
  currentStage = stage;
}
function closeStage(){
  if(currentStage) document.getElementById('panel-'+currentStage).classList.remove('open');
  document.getElementById('mapView').style.display = 'block';
  currentStage = null;
}

function switchTab(tab){
  document.getElementById('tab-cards').classList.toggle('active', tab==='cards');
  document.getElementById('tab-quiz').classList.toggle('active', tab==='quiz');
  document.getElementById('content-cards').classList.toggle('active', tab==='cards');
  document.getElementById('content-quiz').classList.toggle('active', tab==='quiz');
  if(tab==='quiz') renderLetterQuiz();
}

function buildLetters(){
  const grid = document.getElementById('lettersGrid');
  LETTERS.forEach((L, i)=>{
    const card = document.createElement('div');
    card.className = 'letter-card';
    card.id = 'letter-'+i;
    if(state.letters[i]){ card.classList.add('flipped','learned'); }
    card.innerHTML = `
      <div class="letter-inner">
        <div class="letter-face letter-front"><div class="glyph arabic">${L.g}</div></div>
        <div class="letter-face letter-back">
          <div class="name">${L.name}</div>
          <div class="word">${L.emoji} ${L.word}</div>
        </div>
      </div>`;
    card.addEventListener('click', ()=> toggleLetterFlip(i));
    grid.appendChild(card);
  });
}
function toggleLetterFlip(i){
  const card = document.getElementById('letter-'+i);
  card.classList.toggle('flipped');
  if(card.classList.contains('flipped') && !state.letters[i]){
    setTimeout(()=>{
      if(card.classList.contains('flipped')){
        state.letters[i] = true;
        card.classList.add('learned');
        updateHeader();
      }
    }, 1400);
  }
}

function shuffle(arr){ return arr.sort(()=>Math.random()-0.5); }
let letterQuizOrder = shuffle([...Array(LETTERS.length).keys()]);
let letterQuizIndex = 0;

function renderLetterQuiz(){
  if(letterQuizIndex >= letterQuizOrder.length){
    letterQuizOrder = shuffle([...Array(LETTERS.length).keys()]);
    letterQuizIndex = 0;
  }
  const idx = letterQuizOrder[letterQuizIndex];
  const item = LETTERS[idx];
  document.getElementById('letterQuizProgress').textContent = 'Soru '+(letterQuizIndex+1)+' / '+letterQuizOrder.length;
  const type = Math.random() < 0.5 ? 'nameFromGlyph' : 'glyphFromName';
  const qEl = document.getElementById('letterQuizQuestion');
  const glyphWrap = document.getElementById('letterQuizGlyphWrap');
  const optWrap = document.getElementById('letterQuizOptions');
  optWrap.innerHTML = '';
  document.getElementById('letterQuizFeedback').textContent = '';
  const distractors = shuffle(LETTERS.map((l,i)=>i).filter(i=>i!==idx)).slice(0,2);
  if(type === 'nameFromGlyph'){
    qEl.textContent = 'Bu harfin adı nedir?';
    glyphWrap.innerHTML = '<div class="quiz-glyph arabic">'+item.g+'</div>';
    const opts = shuffle([idx, ...distractors]);
    opts.forEach(oi=>{
      const btn = document.createElement('button');
      btn.className = 'quiz-opt';
      btn.textContent = LETTERS[oi].name;
      btn.onclick = ()=> answerLetterQuiz(oi===idx, idx, btn);
      optWrap.appendChild(btn);
    });
  } else {
    qEl.textContent = '"'+item.name+'" harfi hangisidir?';
    glyphWrap.innerHTML = '';
    const opts = shuffle([idx, ...distractors]);
    opts.forEach(oi=>{
      const btn = document.createElement('button');
      btn.className = 'quiz-opt arabic';
      btn.textContent = LETTERS[oi].g;
      btn.onclick = ()=> answerLetterQuiz(oi===idx, idx, btn);
      optWrap.appendChild(btn);
    });
  }
}
function answerLetterQuiz(isCorrect, idx, btn){
  const feedback = document.getElementById('letterQuizFeedback');
  if(isCorrect){
    btn.classList.add('correct');
    feedback.textContent = randomPraise();
    if(!state.letters[idx]){ state.letters[idx]=true; updateHeader(); document.getElementById('letter-'+idx).classList.add('learned'); }
    setTimeout(()=>{ letterQuizIndex++; renderLetterQuiz(); }, 900);
  } else {
    btn.classList.add('wrong');
    feedback.textContent = 'Tekrar dene, yapabilirsin!';
  }
}

function renderQuiz(){
  if(quizIndex >= quizOrder.length){ quizOrder = shuffle([...Array(SYLLABLES.length).keys()]); quizIndex = 0; }
  const item = SYLLABLES[quizOrder[quizIndex]];
  document.getElementById('quizGlyph').textContent = item.g;
  document.getElementById('quizProgress').textContent = 'Tur '+(quizIndex+1)+' / '+quizOrder.length;
  const optWrap = document.getElementById('quizOptions');
  optWrap.innerHTML = '';
  document.getElementById('quizFeedback').textContent = '';
  const opts = shuffle([...item.options]);
  opts.forEach(o=>{
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.textContent = o;
    btn.onclick = ()=> answerQuiz(o, item, btn);
    optWrap.appendChild(btn);
  });
}
function answerQuiz(choice, item, btn){
  const feedback = document.getElementById('quizFeedback');
  if(choice === item.correct){
    btn.classList.add('correct');
    feedback.textContent = randomPraise();
    const key = quizOrder[quizIndex];
    if(!state.syllables[key]){ state.syllables[key]=true; updateHeader(); }
    setTimeout(()=>{ quizIndex++; renderQuiz(); }, 900);
  } else {
    btn.classList.add('wrong');
    feedback.textContent = 'Tekrar dene!';
  }
}

const SURAH_NUMBERS = [1, 112, 114];
let currentAudio = null;
let currentPlayBtn = null;

function pad3(n){ return String(n).padStart(3,'0'); }
function audioUrl(surahNum, ayahNum){
  return 'https://everyayah.com/data/Alafasy_128kbps/'+pad3(surahNum)+pad3(ayahNum)+'.mp3';
}

function buildSuras(){
  const wrap = document.getElementById('surasWrap');
  SURAS.forEach((sura, si)=>{
    const surahNum = SURAH_NUMBERS[si];
    const block = document.createElement('div');
    block.className = 'sura-block';
    block.innerHTML = `<div class="sura-title">${sura.name} <span class="badge">${sura.note}</span>
      <button class="play-all-btn" id="playall-${si}" onclick="playWholeSura(${si})">▶ Sureyi dinle</button></div>`;
    sura.ayat.forEach((a, ai)=>{
      const key = si+'-'+ai;
      a.audio = audioUrl(surahNum, ai+1);
      const ayahDiv = document.createElement('div');
      ayahDiv.className = 'ayah';
      ayahDiv.innerHTML = `
        <div class="ayah-row">
          <button class="play-btn" id="play-${key}" onclick="playAyah(${si},${ai})">🔊</button>
          <div style="flex:1;">
            <div class="arabic">${a.ar}</div>
            <div class="translit">${a.tr}</div>
            <div class="meaning">${a.de}</div>
            <div class="play-error" id="err-${key}" style="display:none; font-size:.75rem; color:var(--coral); margin-top:4px;">Ses yüklenemedi. İnternet bağlantını kontrol et.</div>
          </div>
        </div>
        <label class="ayah-check">
          <input type="checkbox" id="check-${key}" ${state.suraAyat[key] ? 'checked' : ''} onchange="toggleAyah('${key}')">
          Bu âyeti ezbere biliyorum
        </label>`;
      block.appendChild(ayahDiv);
    });
    wrap.appendChild(block);
  });
}

function stopAudio(){
  if(currentAudio){ currentAudio.pause(); currentAudio = null; }
  if(currentPlayBtn){ currentPlayBtn.classList.remove('playing'); currentPlayBtn = null; }
}

function playAyah(si, ai){
  const a = SURAS[si].ayat[ai];
  stopAudio();
  const key = si+'-'+ai;
  const btn = document.getElementById('play-'+key);
  const errEl = document.getElementById('err-'+key);
  if(errEl) errEl.style.display = 'none';
  currentAudio = new Audio(a.audio);
  currentPlayBtn = btn;
  if(btn) btn.classList.add('playing');
  currentAudio.onended = ()=>{ if(btn) btn.classList.remove('playing'); currentAudio=null; currentPlayBtn=null; };
  currentAudio.onerror = ()=>{ if(btn) btn.classList.remove('playing'); if(errEl) errEl.style.display='block'; };
  const playPromise = currentAudio.play();
  if(playPromise && playPromise.catch){
    playPromise.catch(()=>{ if(btn) btn.classList.remove('playing'); if(errEl) errEl.style.display='block'; });
  }
}

function playWholeSura(si){
  stopAudio();
  let ai = 0;
  function next(){
    if(ai >= SURAS[si].ayat.length) return;
    const key = si+'-'+ai;
    const btn = document.getElementById('play-'+key);
    const errEl = document.getElementById('err-'+key);
    if(errEl) errEl.style.display = 'none';
    currentAudio = new Audio(SURAS[si].ayat[ai].audio);
    currentPlayBtn = btn;
    if(btn) btn.classList.add('playing');
    currentAudio.onended = ()=>{
      if(btn) btn.classList.remove('playing');
      ai++;
      next();
    };
    currentAudio.onerror = ()=>{ if(btn) btn.classList.remove('playing'); if(errEl) errEl.style.display='block'; ai++; next(); };
    const p = currentAudio.play();
    if(p && p.catch){ p.catch(()=>{ if(btn) btn.classList.remove('playing'); if(errEl) errEl.style.display='block'; ai++; next(); }); }
  }
  next();
}
function toggleAyah(key){
  const box = document.getElementById('check-'+key);
  state.suraAyat[key] = box.checked;
  updateHeader();
}

function buildPages(){
  const grid = document.getElementById('pagesGrid');
  for(let i=1;i<=10;i++){
    const chip = document.createElement('div');
    chip.className = 'page-chip';
    chip.id = 'page-'+i;
    const isRead = !!state.pages[i];
    if(isRead) chip.classList.add('read');
    chip.innerHTML = `<div class="n">Sayfa ${i}</div><div class="s">${isRead ? '★' : '☆'}</div>`;
    chip.onclick = ()=> togglePage(i, chip);
    grid.appendChild(chip);
  }
}
function togglePage(i, chip){
  const isRead = !!state.pages[i];
  state.pages[i] = !isRead;
  chip.classList.toggle('read', !isRead);
  chip.querySelector('.s').textContent = !isRead ? '★' : '☆';
  updateHeader();
}

async function init(){
  await loadProgress();
  buildLetters();
  renderQuiz();
  buildSuras();
  buildPages();
  updateHeader();
  const note = document.getElementById('persistNote');
  if(note){
    note.textContent = hasStorage
      ? 'İlerleme bu cihazda otomatik olarak kaydedilir.'
      : 'Bu görünümde ilerleme kaydı desteklenmiyor; dosyayı indirip tarayıcıda açarsan ilerleme cihazında saklanabilir.';
  }
  document.getElementById('appRoot').classList.add('ready');
}
init();
