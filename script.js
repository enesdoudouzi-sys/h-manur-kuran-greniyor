const LETTERS = [
  {g:"ا", name:"Elif", ar:"أَلِف", word:"Esed (aslan)", emoji:"🦁"},
  {g:"ب", name:"Be", ar:"بَاء", word:"Beyt (ev)", emoji:"🏠"},
  {g:"ت", name:"Te", ar:"تَاء", word:"Tüffah (elma)", emoji:"🍎"},
  {g:"ث", name:"Se", ar:"ثَاء", word:"Sa'leb (tilki)", emoji:"🦊"},
  {g:"ج", name:"Cim", ar:"جِيم", word:"Cezer (havuç)", emoji:"🥕"},
  {g:"ح", name:"Ha", ar:"حَاء", word:"Hût (balık)", emoji:"🐟"},
  {g:"خ", name:"Hı", ar:"خَاء", word:"Havh (şeftali)", emoji:"🍑"},
  {g:"د", name:"Dal", ar:"دَال", word:"Decâce (tavuk)", emoji:"🐔"},
  {g:"ذ", name:"Zel", ar:"ذَال", word:"Zi'b (kurt)", emoji:"🐺"},
  {g:"ر", name:"Ra", ar:"رَاء", word:"Rummân (nar)", emoji:"🍈"},
  {g:"ز", name:"Ze", ar:"زَاي", word:"Zerâfe (zürafa)", emoji:"🦒"},
  {g:"س", name:"Sin", ar:"سِين", word:"Seyyâre (araba)", emoji:"🚗"},
  {g:"ش", name:"Şın", ar:"شِين", word:"Şems (güneş)", emoji:"☀️"},
  {g:"ص", name:"Sad", ar:"صَاد", word:"Sakr (şahin)", emoji:"🦅"},
  {g:"ض", name:"Dad", ar:"ضَاد", word:"Difda' (kurbağa)", emoji:"🐸"},
  {g:"ط", name:"Tı", ar:"طَاء", word:"Tâir (kuş)", emoji:"🐦"},
  {g:"ظ", name:"Zı", ar:"ظَاء", word:"Zabî (ceylan)", emoji:"🦌"},
  {g:"ع", name:"Ayn", ar:"عَيْن", word:"İneb (üzüm)", emoji:"🍇"},
  {g:"غ", name:"Ğayn", ar:"غَيْن", word:"Gurâb (karga)", emoji:"🐦‍⬛"},
  {g:"ف", name:"Fe", ar:"فَاء", word:"Fîl (fil)", emoji:"🐘"},
  {g:"ق", name:"Kaf", ar:"قَاف", word:"Kamer (ay)", emoji:"🌙"},
  {g:"ك", name:"Kef", ar:"كَاف", word:"Kelb (köpek)", emoji:"🐶"},
  {g:"ل", name:"Lâm", ar:"لَام", word:"Leymûn (limon)", emoji:"🍋"},
  {g:"م", name:"Mim", ar:"مِيم", word:"Mevz (muz)", emoji:"🍌"},
  {g:"ن", name:"Nun", ar:"نُون", word:"Nahle (arı)", emoji:"🐝"},
  {g:"و", name:"Vav", ar:"وَاو", word:"Verd (gül)", emoji:"🌹"},
  {g:"ه", name:"He", ar:"هَاء", word:"Hediyye (hediye)", emoji:"🎁"},
  {g:"ي", name:"Ye", ar:"يَاء", word:"Yed (el)", emoji:"✋"}
];

// Syllables are generated letter by letter (üstün, esre, ötre). New letters are
// only ever appended so that saved progress indices stay valid.
const HAREKE = [
  {mark:"َ", v:"a"},  // üstün (fetha)
  {mark:"ِ", v:"i"},  // esre (kesra)
  {mark:"ُ", v:"u"}   // ötre (damme)
];
const SYLLABLE_LETTERS = [
  {g:"ب", c:"b"}, {g:"ت", c:"t"}, {g:"م", c:"m"}, {g:"ن", c:"n"},
  {g:"د", c:"d"}, {g:"ر", c:"r"}, {g:"س", c:"s"}, {g:"ف", c:"f"},
  {g:"ك", c:"k"}, {g:"ل", c:"l"}
];
const SYLLABLES = [];
SYLLABLE_LETTERS.forEach((L, li)=>{
  HAREKE.forEach(h=>{
    const other = SYLLABLE_LETTERS[(li + 1 + Math.floor(Math.random()*(SYLLABLE_LETTERS.length-1))) % SYLLABLE_LETTERS.length];
    SYLLABLES.push({
      g: L.g + h.mark,
      correct: L.c + h.v,
      options: [...HAREKE.map(x=> L.c + x.v), other.c + h.v]
    });
  });
});

const SURAS = [
  { name:"Fâtiha Sûresi", note:"Açan Sûre", num:1, ayat:[
    {ar:"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", tr:"Bismillâhi'r-rahmâni'r-rahîm", de:"Her şeyi yaratan, çok sevecen ve çok merhametli olan Allah'ın adıyla."},
    {ar:"الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", tr:"El-hamdü lillâhi rabbi'l-âlemîn", de:"Bütün övgüler, tüm âlemlerin Rabbi olan Allah'a aittir."},
    {ar:"الرَّحْمَٰنِ الرَّحِيمِ", tr:"Er-rahmâni'r-rahîm", de:"O, çok sevecen ve çok merhametlidir."},
    {ar:"مَالِكِ يَوْمِ الدِّينِ", tr:"Mâliki yevmi'd-dîn", de:"Hesap gününün tek sahibidir."},
    {ar:"إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", tr:"İyyâke na'büdü ve iyyâke nesta'în", de:"Yalnız Sana kulluk eder, yalnız Senden yardım isteriz."},
    {ar:"اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", tr:"İhdine's-sırâta'l-müstakîm", de:"Bizi doğru yola ilet."},
    {ar:"صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", tr:"Sırâta'l-lezîne en'amte aleyhim ğayri'l-mağdûbi aleyhim ve le'd-dâllîn", de:"Kendilerine iyilik ettiğin kimselerin yoluna; gazaba uğrayanların ya da yolunu şaşıranların yoluna değil."}
  ]},
  { name:"İhlâs Sûresi", note:"Öz ve Sadelik", num:112, ayat:[
    {ar:"قُلْ هُوَ اللَّهُ أَحَدٌ", tr:"Kul hüvallâhü ehad", de:"De ki: O, Allah'tır, tektir."},
    {ar:"اللَّهُ الصَّمَدُ", tr:"Allâhu's-samed", de:"Allah, hiçbir şeye muhtaç olmayan, her şeyin kendisine muhtaç olduğudur."},
    {ar:"لَمْ يَلِدْ وَلَمْ يُولَدْ", tr:"Lem yelid ve lem yûled", de:"O, doğurmamış ve doğurulmamıştır."},
    {ar:"وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ", tr:"Ve lem yekün lehû küfüven ehad", de:"Hiçbir şey O'na denk değildir."}
  ]},
  { name:"Nâs Sûresi", note:"İnsanlar", num:114, ayat:[
    {ar:"قُلْ أَعُوذُ بِرَبِّ النَّاسِ", tr:"Kul e'ûzü bi-rabbi'n-nâs", de:"De ki: İnsanların Rabbine sığınırım."},
    {ar:"مَلِكِ النَّاسِ", tr:"Meliki'n-nâs", de:"İnsanların hükümdarına."},
    {ar:"إِلَٰهِ النَّاسِ", tr:"İlâhi'n-nâs", de:"İnsanların ilâhına."},
    {ar:"مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", tr:"Min şerri'l-vesvâsi'l-hannâs", de:"Sinsice fısıldayanın kötülüğünden."},
    {ar:"الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", tr:"Ellezî yüvesvisü fî sudûri'n-nâs", de:"O ki insanların kalbine vesvese fısıldar."},
    {ar:"مِنَ الْجِنَّةِ وَالنَّاسِ", tr:"Mine'l-cinneti ve'n-nâs", de:"İster cinlerden olsun, ister insanlardan."}
  ]},
  { name:"Felak Sûresi", note:"Sabah Aydınlığı", num:113, ayat:[
    {ar:"قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", tr:"Kul e'ûzü bi-rabbi'l-felak", de:"De ki: Sabahın Rabbine sığınırım."},
    {ar:"مِنْ شَرِّ مَا خَلَقَ", tr:"Min şerri mâ halak", de:"Yarattığı şeylerin kötülüğünden."},
    {ar:"وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ", tr:"Ve min şerri ğâsikın izâ vekab", de:"Karanlığı çöktüğünde gecenin kötülüğünden."},
    {ar:"وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", tr:"Ve min şerri'n-neffâsâti fi'l-ukad", de:"Düğümlere üfleyenlerin kötülüğünden."},
    {ar:"وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ", tr:"Ve min şerri hâsidin izâ hased", de:"Ve haset ettiğinde hasetçinin kötülüğünden."}
  ]},
  { name:"Kevser Sûresi", note:"Bol Nimet", num:108, ayat:[
    {ar:"إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", tr:"İnnâ a'taynâke'l-kevser", de:"Şüphesiz biz sana Kevser'i (bol nimeti) verdik."},
    {ar:"فَصَلِّ لِرَبِّكَ وَانْحَرْ", tr:"Fe salli li-rabbike ve'nhar", de:"Öyleyse Rabbin için namaz kıl ve kurban kes."},
    {ar:"إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", tr:"İnne şânieke hüve'l-ebter", de:"Asıl soyu kesik olan, sana kin besleyendir."}
  ]},
  { name:"Asr Sûresi", note:"Zaman", num:103, ayat:[
    {ar:"وَالْعَصْرِ", tr:"Ve'l-asr", de:"Zamana (asra) yemin olsun ki,"},
    {ar:"إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ", tr:"İnne'l-insâne lefî husr", de:"İnsan gerçekten ziyan içindedir."},
    {ar:"إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ", tr:"İlle'llezîne âmenû ve amilu's-sâlihâti ve tevâsav bi'l-hakkı ve tevâsav bi's-sabr", de:"Ancak iman edip iyi işler yapanlar, birbirlerine hakkı ve sabrı tavsiye edenler bunun dışındadır."}
  ]}
];
const TOTAL_AYAT = SURAS.reduce((n,s)=> n + s.ayat.length, 0);
const PAGE_COUNT = 10;

const state = { letters:{}, syllables:{}, suraAyat:{}, pages:{} };
let currentStage = null;

// ---------- Persistence ----------
// Prefers the hosted window.storage API when present (Claude artifacts),
// otherwise falls back to localStorage so progress survives on GitHub Pages.
const STORAGE_KEY = 'humanur-progress-v1';
const hostedStorage = (typeof window !== 'undefined') && !!window.storage;
const localStore = (()=>{
  try{
    const k = '__humanur_test__';
    window.localStorage.setItem(k, '1');
    window.localStorage.removeItem(k);
    return window.localStorage;
  }catch(e){ return null; }
})();
const hasStorage = hostedStorage || !!localStore;
let saveTimer = null;

function applySaved(saved){
  if(!saved) return;
  if(saved.letters) Object.assign(state.letters, saved.letters);
  if(saved.syllables) Object.assign(state.syllables, saved.syllables);
  if(saved.suraAyat) Object.assign(state.suraAyat, saved.suraAyat);
  if(saved.pages) Object.assign(state.pages, saved.pages);
}

async function loadProgress(){
  try{
    if(hostedStorage){
      const res = await window.storage.get(STORAGE_KEY, false);
      if(res && res.value){ applySaved(JSON.parse(res.value)); return; }
    }
    if(localStore){
      const raw = localStore.getItem(STORAGE_KEY);
      if(raw) applySaved(JSON.parse(raw));
    }
  }catch(e){}
}

function saveProgress(){
  if(!hasStorage) return;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async ()=>{
    const json = JSON.stringify(state);
    try{
      if(hostedStorage) await window.storage.set(STORAGE_KEY, json, false);
      else localStore.setItem(STORAGE_KEY, json);
      flashSaveIndicator();
    }catch(e){}
  }, 350);
}

async function resetProgress(){
  if(!confirm('Tüm ilerleme silinsin mi? Bu işlem geri alınamaz.')) return;
  clearTimeout(saveTimer);
  try{
    if(hostedStorage) await window.storage.set(STORAGE_KEY, JSON.stringify({}), false);
    if(localStore) localStore.removeItem(STORAGE_KEY);
  }catch(e){}
  location.reload();
}

function flashSaveIndicator(){
  const el = document.getElementById('saveIndicator');
  if(!el) return;
  el.classList.add('show');
  clearTimeout(flashSaveIndicator._t);
  flashSaveIndicator._t = setTimeout(()=> el.classList.remove('show'), 1400);
}

// ---------- Speech (letter names & syllables) ----------
let arabicVoice = null;
function pickArabicVoice(){
  if(!('speechSynthesis' in window)) return;
  const voices = window.speechSynthesis.getVoices();
  arabicVoice = voices.find(v=> /^ar(-|_|$)/i.test(v.lang)) || null;
}
if('speechSynthesis' in window){
  pickArabicVoice();
  window.speechSynthesis.onvoiceschanged = pickArabicVoice;
}
function speakArabic(text){
  if(!('speechSynthesis' in window)){
    showToast('Bu cihazda sesli okuma desteklenmiyor.');
    return;
  }
  stopAudio();
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = arabicVoice ? arabicVoice.lang : 'ar-SA';
  if(arabicVoice) u.voice = arabicVoice;
  u.rate = 0.75;
  window.speechSynthesis.speak(u);
  if(!arabicVoice && !speakArabic._hinted){
    speakArabic._hinted = true;
    showToast('İpucu: Daha iyi ses için cihaza Arapça ses paketi yükleyebilirsin.');
  }
}

// ---------- Helpers ----------
const PRAISE = ["Maşallah! ⭐","Aferin sana! 🌟","Harikasın! ✨","Çok iyi gidiyorsun! 🎉","Süpersin! 🌙"];
function randomPraise(){ return PRAISE[Math.floor(Math.random()*PRAISE.length)]; }

function shuffle(arr){
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function countTrue(obj){ return Object.values(obj).filter(Boolean).length; }

function totalStars(){
  const l = countTrue(state.letters);
  const s = countTrue(state.syllables);
  const q = countTrue(state.suraAyat);
  const p = countTrue(state.pages);
  return {l,s,q,p, total:l+s+q+p, max: LETTERS.length + SYLLABLES.length + TOTAL_AYAT + PAGE_COUNT};
}

function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(()=>t.classList.remove('show'), 2600);
}

let lastMilestone = 0;
function currentPct(){
  const {total,max} = totalStars();
  return Math.round((total/max)*100);
}
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
  const pct = currentPct();
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
  document.getElementById('stars-suras').textContent = q+' / '+TOTAL_AYAT+' ★';
  document.getElementById('stars-pages').textContent = p+' / '+PAGE_COUNT+' ★';
  setLock('syllables', l/LETTERS.length < 0.3);
  setLock('suras', s/SYLLABLES.length < 0.3);
  setLock('pages', q/TOTAL_AYAT < 0.3);

  // Highlight the stage the child should work on next.
  const progress = {letters:l/LETTERS.length, syllables:s/SYLLABLES.length, suras:q/TOTAL_AYAT, pages:p/PAGE_COUNT};
  const nodes = [...document.querySelectorAll('.stage-node')];
  nodes.forEach(n=> n.classList.remove('active'));
  const next = nodes.find(n=> !n.classList.contains('locked') && progress[n.dataset.stage] < 1);
  if(next) next.classList.add('active');
}

function setLock(stage, locked){
  const node = document.querySelector('.stage-node[data-stage="'+stage+'"]');
  const icon = document.getElementById('lock-'+stage);
  node.classList.toggle('locked', locked);
  node.setAttribute('aria-disabled', locked ? 'true' : 'false');
  if(icon) icon.style.display = locked ? 'block' : 'none';
}

// ---------- Navigation ----------
function openStage(stage){
  const node = document.querySelector('.stage-node[data-stage="'+stage+'"]');
  if(node && node.classList.contains('locked')){
    showToast('Önce bir önceki bölümden birkaç yıldız topla! 🌟');
    return;
  }
  document.getElementById('mapView').style.display = 'none';
  document.getElementById('panel-'+stage).classList.add('open');
  currentStage = stage;
  window.scrollTo({top:0, behavior:'smooth'});
}
function closeStage(){
  stopAudio();
  if(currentStage) document.getElementById('panel-'+currentStage).classList.remove('open');
  document.getElementById('mapView').style.display = 'block';
  currentStage = null;
}
function onStageKey(e, stage){
  if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openStage(stage); }
}

function switchTab(tab){
  document.getElementById('tab-cards').classList.toggle('active', tab==='cards');
  document.getElementById('tab-quiz').classList.toggle('active', tab==='quiz');
  document.getElementById('content-cards').classList.toggle('active', tab==='cards');
  document.getElementById('content-quiz').classList.toggle('active', tab==='quiz');
  if(tab==='quiz') renderLetterQuiz();
}

// ---------- Stage 1: Letters ----------
function buildLetters(){
  const grid = document.getElementById('lettersGrid');
  LETTERS.forEach((L, i)=>{
    const card = document.createElement('div');
    card.className = 'letter-card';
    card.id = 'letter-'+i;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Harf kartı '+(i+1));
    if(state.letters[i]){ card.classList.add('learned'); }
    card.innerHTML = `
      <div class="letter-inner">
        <div class="letter-face letter-front"><div class="glyph arabic">${L.g}</div></div>
        <div class="letter-face letter-back">
          <div class="name">${L.name} <span class="arabic ar-name">${L.ar}</span></div>
          <div class="word">${L.emoji} ${L.word}</div>
          <button class="speak-btn" type="button" aria-label="${L.name} harfini dinle">🔊</button>
        </div>
      </div>`;
    card.addEventListener('click', ()=> toggleLetterFlip(i));
    card.addEventListener('keydown', e=>{
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggleLetterFlip(i); }
    });
    card.querySelector('.speak-btn').addEventListener('click', e=>{
      e.stopPropagation();
      speakArabic(L.ar);
    });
    grid.appendChild(card);
  });
}
function toggleLetterFlip(i){
  const card = document.getElementById('letter-'+i);
  card.classList.toggle('flipped');
  if(card.classList.contains('flipped') && !state.letters[i]){
    setTimeout(()=>{
      if(card.classList.contains('flipped') && !state.letters[i]){
        state.letters[i] = true;
        card.classList.add('learned');
        updateHeader();
      }
    }, 1400);
  }
}

let letterQuizOrder = shuffle([...Array(LETTERS.length).keys()]);
let letterQuizIndex = 0;
let letterQuizLocked = false;

function renderLetterQuiz(){
  letterQuizLocked = false;
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
  const distractors = shuffle(LETTERS.map((l,i)=>i).filter(i=>i!==idx)).slice(0,3);
  const opts = shuffle([idx, ...distractors]);
  if(type === 'nameFromGlyph'){
    qEl.textContent = 'Bu harfin adı nedir?';
    glyphWrap.innerHTML = '<div class="quiz-glyph arabic">'+item.g+'</div>';
  } else {
    qEl.textContent = '"'+item.name+'" harfi hangisidir?';
    glyphWrap.innerHTML = '';
  }
  opts.forEach(oi=>{
    const btn = document.createElement('button');
    btn.className = type === 'nameFromGlyph' ? 'quiz-opt' : 'quiz-opt arabic';
    btn.textContent = type === 'nameFromGlyph' ? LETTERS[oi].name : LETTERS[oi].g;
    btn.onclick = ()=> answerLetterQuiz(oi===idx, idx, btn);
    optWrap.appendChild(btn);
  });
}
function answerLetterQuiz(isCorrect, idx, btn){
  if(letterQuizLocked) return;
  const feedback = document.getElementById('letterQuizFeedback');
  if(isCorrect){
    letterQuizLocked = true;
    btn.classList.add('correct');
    feedback.textContent = randomPraise();
    speakArabic(LETTERS[idx].ar);
    if(!state.letters[idx]){
      state.letters[idx] = true;
      document.getElementById('letter-'+idx).classList.add('learned');
      updateHeader();
    }
    setTimeout(()=>{ letterQuizIndex++; renderLetterQuiz(); }, 1100);
  } else {
    btn.classList.add('wrong');
    btn.disabled = true;
    feedback.textContent = 'Tekrar dene, yapabilirsin!';
  }
}

// ---------- Stage 2: Syllables ----------
let quizOrder = shuffle([...Array(SYLLABLES.length).keys()]);
let quizIndex = 0;
let quizLocked = false;

function renderQuiz(){
  quizLocked = false;
  if(quizIndex >= quizOrder.length){ quizOrder = shuffle([...Array(SYLLABLES.length).keys()]); quizIndex = 0; }
  const item = SYLLABLES[quizOrder[quizIndex]];
  document.getElementById('quizGlyph').textContent = item.g;
  document.getElementById('quizProgress').textContent = 'Tur '+(quizIndex+1)+' / '+quizOrder.length;
  const optWrap = document.getElementById('quizOptions');
  optWrap.innerHTML = '';
  document.getElementById('quizFeedback').textContent = '';
  shuffle([...item.options]).forEach(o=>{
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.textContent = o;
    btn.onclick = ()=> answerQuiz(o, item, btn);
    optWrap.appendChild(btn);
  });
}
function answerQuiz(choice, item, btn){
  if(quizLocked) return;
  const feedback = document.getElementById('quizFeedback');
  if(choice === item.correct){
    quizLocked = true;
    btn.classList.add('correct');
    feedback.textContent = randomPraise();
    speakArabic(item.g);
    const key = quizOrder[quizIndex];
    if(!state.syllables[key]){ state.syllables[key] = true; updateHeader(); }
    setTimeout(()=>{ quizIndex++; renderQuiz(); }, 1100);
  } else {
    btn.classList.add('wrong');
    btn.disabled = true;
    feedback.textContent = 'Tekrar dene!';
  }
}

// ---------- Stage 3: Suras ----------
let currentAudio = null;
let currentPlayBtn = null;
let playAllSura = null;

function pad3(n){ return String(n).padStart(3,'0'); }
function audioUrl(surahNum, ayahNum){
  return 'https://everyayah.com/data/Alafasy_128kbps/'+pad3(surahNum)+pad3(ayahNum)+'.mp3';
}

function buildSuras(){
  const wrap = document.getElementById('surasWrap');
  SURAS.forEach((sura, si)=>{
    const block = document.createElement('div');
    block.className = 'sura-block';
    block.innerHTML = `<div class="sura-title">${sura.name} <span class="badge">${sura.note}</span>
      <span class="sura-count" id="suracount-${si}"></span>
      <button class="play-all-btn" id="playall-${si}" onclick="toggleWholeSura(${si})">▶ Sûreyi dinle</button></div>`;
    sura.ayat.forEach((a, ai)=>{
      const key = si+'-'+ai;
      a.audio = audioUrl(sura.num, ai+1);
      const ayahDiv = document.createElement('div');
      ayahDiv.className = 'ayah';
      ayahDiv.innerHTML = `
        <div class="ayah-row">
          <button class="play-btn" id="play-${key}" onclick="playAyah(${si},${ai})" aria-label="Âyeti dinle">🔊</button>
          <div style="flex:1;">
            <div class="arabic">${a.ar}</div>
            <div class="translit">${a.tr}</div>
            <div class="meaning">${a.de}</div>
            <div class="play-error" id="err-${key}">Ses yüklenemedi. İnternet bağlantını kontrol et.</div>
          </div>
        </div>
        <label class="ayah-check">
          <input type="checkbox" id="check-${key}" ${state.suraAyat[key] ? 'checked' : ''} onchange="toggleAyah('${key}', ${si})">
          Bu âyeti ezbere biliyorum
        </label>`;
      block.appendChild(ayahDiv);
    });
    wrap.appendChild(block);
    updateSuraCount(si);
  });
}

function updateSuraCount(si){
  const el = document.getElementById('suracount-'+si);
  if(!el) return;
  const n = SURAS[si].ayat.length;
  const done = SURAS[si].ayat.filter((_, ai)=> state.suraAyat[si+'-'+ai]).length;
  el.textContent = done === n ? '🏅' : done+'/'+n;
  el.classList.toggle('complete', done === n);
}

function setPlayAllLabel(si, playing){
  const b = document.getElementById('playall-'+si);
  if(b) b.textContent = playing ? '■ Durdur' : '▶ Sûreyi dinle';
}

function stopAudio(){
  if(currentAudio){
    currentAudio.onended = null;
    currentAudio.onerror = null;
    currentAudio.pause();
    currentAudio = null;
  }
  if(currentPlayBtn){ currentPlayBtn.classList.remove('playing'); currentPlayBtn = null; }
  if(playAllSura !== null){ setPlayAllLabel(playAllSura, false); playAllSura = null; }
  if('speechSynthesis' in window) window.speechSynthesis.cancel();
}

// Plays one ayah; calls onDone(ok) exactly once when it ends or fails.
function startAyahAudio(si, ai, onDone){
  const key = si+'-'+ai;
  const btn = document.getElementById('play-'+key);
  const errEl = document.getElementById('err-'+key);
  if(errEl) errEl.style.display = 'none';
  const audio = new Audio(SURAS[si].ayat[ai].audio);
  currentAudio = audio;
  currentPlayBtn = btn;
  if(btn) btn.classList.add('playing');
  let finished = false;
  const finish = ok=>{
    if(finished || currentAudio !== audio) return;
    finished = true;
    if(btn) btn.classList.remove('playing');
    if(!ok && errEl) errEl.style.display = 'block';
    currentAudio = null;
    currentPlayBtn = null;
    if(onDone) onDone(ok);
  };
  audio.onended = ()=> finish(true);
  audio.onerror = ()=> finish(false);
  const p = audio.play();
  if(p && p.catch) p.catch(()=> finish(false));
}

function playAyah(si, ai){
  const wasPlaying = currentPlayBtn && currentPlayBtn.id === 'play-'+si+'-'+ai;
  stopAudio();
  if(wasPlaying) return;
  startAyahAudio(si, ai);
}

function toggleWholeSura(si){
  if(playAllSura === si){ stopAudio(); return; }
  stopAudio();
  playAllSura = si;
  setPlayAllLabel(si, true);
  let ai = 0;
  const next = ()=>{
    if(playAllSura !== si) return;
    if(ai >= SURAS[si].ayat.length){ setPlayAllLabel(si, false); playAllSura = null; return; }
    const cur = ai++;
    startAyahAudio(si, cur, ok=>{
      if(!ok){ setPlayAllLabel(si, false); playAllSura = null; return; }
      next();
    });
  };
  next();
}

function toggleAyah(key, si){
  const box = document.getElementById('check-'+key);
  state.suraAyat[key] = box.checked;
  updateSuraCount(si);
  const sura = SURAS[si];
  if(box.checked && sura.ayat.every((_, ai)=> state.suraAyat[si+'-'+ai])){
    showToast(sura.name+' tamamen ezberlendi! Maşallah! 🏅');
  }
  updateHeader();
}

// ---------- Stage 4: Pages ----------
function buildPages(){
  const grid = document.getElementById('pagesGrid');
  for(let i=1;i<=PAGE_COUNT;i++){
    const chip = document.createElement('button');
    chip.type = 'button';
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
  if(!isRead) showToast(randomPraise());
  updateHeader();
}

// ---------- Init ----------
async function init(){
  await loadProgress();
  // Don't replay milestone toasts for progress that was already saved.
  const startPct = currentPct();
  lastMilestone = [25,50,75,100].filter(s=> startPct >= s).pop() || 0;
  buildLetters();
  renderQuiz();
  buildSuras();
  buildPages();
  updateHeader();
  const note = document.getElementById('persistNote');
  if(note){
    note.textContent = hasStorage
      ? 'İlerleme bu cihazda otomatik olarak kaydedilir.'
      : 'Bu tarayıcıda ilerleme kaydı desteklenmiyor (örn. gizli sekme); sayfa kapanınca yıldızlar sıfırlanır.';
  }
  document.getElementById('appRoot').classList.add('ready');
}
init();

if('serviceWorker' in navigator && location.protocol.startsWith('http')){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  });
}
