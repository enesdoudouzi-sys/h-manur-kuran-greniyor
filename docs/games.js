// Namaz duaları (line by line with a player), Oyunlar (Harf Eşleştir,
// Harf Boya), Zikirmatik and a Kur'an-ı Kerim page. Loaded after more.js;
// started via initGames() from init().

/* ============ Namaz duaları, satır satır ============ */
const NAMAZ_DUA = [
  {id:'subhaneke', t:'Sübhâneke', w:'Namazın başında', lines:[
    ['سُبْحَانَكَ اللّٰهُمَّ وَبِحَمْدِكَ', 'Sübhânekellâhümme ve bi hamdik', 'Allah\'ım! Sen eksik sıfatlardan uzaksın, seni överim.'],
    ['وَتَبَارَكَ اسْمُكَ', 've tebârekesmük', 'Senin adın mübarektir.'],
    ['وَتَعَالٰى جَدُّكَ', 've teâlâ ceddük', 'Şanın çok yücedir.'],
    ['وَلَا إِلٰهَ غَيْرُكَ', 've lâ ilâhe ğayruk', 'Senden başka ilah yoktur.']]},
  {id:'tehiyyat', t:'Ettehiyyâtü', w:'Oturuşlarda', lines:[
    ['التَّحِيَّاتُ لِلّٰهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ', 'Ettehiyyâtü lillâhi ves-salevâtü vet-tayyibât', 'Dil ile, beden ve mal ile yapılan bütün ibadetler Allah\'adır.'],
    ['السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللّٰهِ وَبَرَكَاتُهُ', 'Esselâmü aleyke eyyühen-nebiyyü ve rahmetullâhi ve berekâtüh', 'Ey Peygamber! Allah\'ın selamı, rahmeti ve bereketi senin üzerine olsun.'],
    ['السَّلَامُ عَلَيْنَا وَعَلٰى عِبَادِ اللّٰهِ الصَّالِحِينَ', 'Esselâmü aleynâ ve alâ ibâdillâhis-sâlihîn', 'Selam bizim üzerimize ve Allah\'ın bütün iyi kulları üzerine olsun.'],
    ['أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ', 'Eşhedü en lâ ilâhe illallâh', 'Şahitlik ederim ki Allah\'tan başka ilah yoktur.'],
    ['وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ', 'Ve eşhedü enne Muhammeden abdühû ve resûlüh', 'Yine şahitlik ederim ki Muhammed O\'nun kulu ve elçisidir.']]},
  {id:'salli', t:'Allâhümme Salli', w:'Son oturuşta', lines:[
    ['اللّٰهُمَّ صَلِّ عَلٰى مُحَمَّدٍ وَعَلٰى آلِ مُحَمَّدٍ', 'Allâhümme salli alâ Muhammedin ve alâ âli Muhammed', 'Allah\'ım! Muhammed\'e ve ailesine rahmet eyle.'],
    ['كَمَا صَلَّيْتَ عَلٰى إِبْرَاهِيمَ وَعَلٰى آلِ إِبْرَاهِيمَ', 'Kemâ salleyte alâ İbrâhîme ve alâ âli İbrâhîm', 'İbrahim\'e ve ailesine rahmet ettiğin gibi.'],
    ['إِنَّكَ حَمِيدٌ مَجِيدٌ', 'İnneke hamîdün mecîd', 'Şüphesiz sen övülmeye layıksın, şanı yücesin.']]},
  {id:'barik', t:'Allâhümme Bârik', w:'Son oturuşta', lines:[
    ['اللّٰهُمَّ بَارِكْ عَلٰى مُحَمَّدٍ وَعَلٰى آلِ مُحَمَّدٍ', 'Allâhümme bârik alâ Muhammedin ve alâ âli Muhammed', 'Allah\'ım! Muhammed\'e ve ailesine bereket ver.'],
    ['كَمَا بَارَكْتَ عَلٰى إِبْرَاهِيمَ وَعَلٰى آلِ إِبْرَاهِيمَ', 'Kemâ bârakte alâ İbrâhîme ve alâ âli İbrâhîm', 'İbrahim\'e ve ailesine bereket verdiğin gibi.'],
    ['إِنَّكَ حَمِيدٌ مَجِيدٌ', 'İnneke hamîdün mecîd', 'Şüphesiz sen övülmeye layıksın, şanı yücesin.']]},
  {id:'rabbenagfirli', t:'Rabbenağfirlî', w:'Son oturuşta', lines:[
    ['رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ', 'Rabbenağfirlî ve li-vâlideyye', 'Rabbimiz! Beni ve anne babamı bağışla.'],
    ['وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ', 've lil-mü\'minîne yevme yekûmül-hisâb', 'Hesap gününde bütün müminleri de bağışla.']]},
  {id:'kunut1', t:'Kunut Duası 1', w:'Vitir namazında', lines:[
    ['اللّٰهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنَسْتَهْدِيكَ', 'Allâhümme innâ nesteînüke ve nestağfirüke ve nestehdîk', 'Allah\'ım! Senden yardım, bağışlanma ve doğru yolu isteriz.'],
    ['وَنُؤْمِنُ بِكَ وَنَتُوبُ إِلَيْكَ', 've nü\'minü bike ve netûbü ileyk', 'Sana inanır, sana tövbe ederiz.'],
    ['وَنَتَوَكَّلُ عَلَيْكَ وَنُثْنِي عَلَيْكَ الْخَيْرَ كُلَّهُ نَشْكُرُكَ', 've netevekkelü aleyke ve nüsnî aleykel-hayra küllehû neşkürük', 'Sana güvenir, seni bütün iyiliklerle överiz. Sana şükrederiz.'],
    ['وَلَا نَكْفُرُكَ وَنَخْلَعُ وَنَتْرُكُ مَنْ يَفْجُرُكَ', 've lâ nekfürüke ve nahleu ve netrükü men yefcürük', 'Nimetlerini inkâr etmeyiz; sana isyan edeni bırakırız.']]},
  {id:'kunut2', t:'Kunut Duası 2', w:'Vitir namazında', lines:[
    ['اللّٰهُمَّ إِيَّاكَ نَعْبُدُ وَلَكَ نُصَلِّي وَنَسْجُدُ', 'Allâhümme iyyâke na\'büdü ve leke nüsallî ve nescüd', 'Allah\'ım! Yalnız sana ibadet eder, senin için namaz kılar, sana secde ederiz.'],
    ['وَإِلَيْكَ نَسْعٰى وَنَحْفِدُ نَرْجُو رَحْمَتَكَ وَنَخْشٰى عَذَابَكَ', 've ileyke nes\'â ve nahfidü nercû rahmeteke ve nahşâ azâbek', 'Sana koşar, sana yaklaşırız. Rahmetini umar, azabından korkarız.'],
    ['إِنَّ عَذَابَكَ بِالْكُفَّارِ مُلْحِقٌ', 'İnne azâbeke bil-küffâri mülhık', 'Şüphesiz senin azabın inkârcılara ulaşır.']]}
];
NAMAZ_DUA.forEach(d=> DUA.push(Object.assign(d, {
  namaz:true, ar:d.lines.map(l=> l[0]).join(' '), ok:d.lines.map(l=> l[1]).join(' '), m:d.lines.map(l=> l[2]).join(' ')
})));
const rbn = DUA.find(d=> d.id === 'rabbena');
if(rbn) rbn.namaz = true;

let duaPlay = null; // {id, line}
function stopDuaPlay(){
  duaPlay = null;
  if('speechSynthesis' in window) window.speechSynthesis.cancel();
  stopAudio();
  document.querySelectorAll('.dua-line.speaking').forEach(e=> e.classList.remove('speaking'));
  const b = document.querySelector('.dua-player .dp-play');
  if(b) b.textContent = '▶';
}
function speakLine(text, done){
  if(!('speechSynthesis' in window)){ done(); return; }
  const u = new SpeechSynthesisUtterance(text);
  u.lang = arabicVoice ? arabicVoice.lang : 'ar-SA';
  if(arabicVoice) u.voice = arabicVoice;
  u.rate = 0.7;
  let fired = false;
  const next = ()=>{ if(!fired){ fired = true; done(); } };
  u.onend = next; u.onerror = next;
  // Some browsers never fire onend; move on after a generous guess.
  setTimeout(next, 1500 + text.length * 160);
  window.speechSynthesis.speak(u);
}
function playDua(id, from){
  const d = DUA.find(x=> x.id === id);
  if(!d) return;
  if(duaPlay && duaPlay.id === id && from === undefined){ stopDuaPlay(); return; }
  stopDuaPlay();
  // A parent's recording of the whole dua wins over the device voice.
  const rec = typeof voiceUrls !== 'undefined' && voiceUrls['d:'+id];
  const btn = document.querySelector('.dua-player .dp-play');
  if(rec && from === undefined){
    const a = new Audio(rec); currentAudio = a;
    duaPlay = {id, line:-1};
    if(btn) btn.textContent = '■';
    a.onended = ()=> stopDuaPlay();
    a.play().catch(()=> stopDuaPlay());
    return;
  }
  if('speechSynthesis' in window) window.speechSynthesis.cancel();
  const lines = d.lines || [[d.ar]];
  const token = {id, line:from || 0};
  duaPlay = token;
  if(btn) btn.textContent = '■';
  const step = ()=>{
    if(duaPlay !== token) return;
    document.querySelectorAll('.dua-line').forEach((e, k)=> e.classList.toggle('speaking', k === token.line));
    if(token.line >= lines.length){ stopDuaPlay(); return; }
    const el = document.querySelector('.dua-line.speaking');
    if(el) el.scrollIntoView({block:'nearest', behavior:'smooth'});
    speakLine(lines[token.line][0], ()=>{ token.line++; step(); });
  };
  step();
}
function sayLine(id, k){
  const d = DUA.find(x=> x.id === id);
  stopDuaPlay();
  document.querySelectorAll('.dua-line').forEach((e, j)=> e.classList.toggle('speaking', j === k));
  speakLine(d.lines[k][0], ()=> document.querySelectorAll('.dua-line').forEach(e=> e.classList.remove('speaking')));
}

function duaItem(d){
  const open = exUI.dua === d.id, key = 'd:'+d.id;
  const body = !open ? '' : d.lines
    ? `<div class="ex-item-body"><div class="dua-player"><button type="button" class="dp-play" onclick="playDua('${d.id}')" aria-label="Hepsini dinle">▶</button>
        <span class="dp-title">${d.t}</span><span class="ex-sub">${d.lines.length} satır · satıra dokun, dinle</span></div>
        ${d.lines.map((l, k)=> `<button type="button" class="dua-line" onclick="sayLine('${d.id}',${k})"><span class="arabic">${l[0]}</span><span class="dl-ok">${l[1]}</span><span class="dl-m">${l[2]}</span></button>`).join('')}
        <div class="ex-row">${exBtn(key, 'Ezberledim')}</div>${typeof voiceBox === 'function' ? voiceBox(key) : ''}</div>`
    : `<div class="ex-item-body"><div class="arabic ex-ar-lg">${d.ar}</div><div class="ex-okunus">${d.ok}</div>
        <div class="ex-mean"><b>Anlamı</b><p>${d.m}</p></div><div class="ex-row">${exSpeak(d.ar)}${exBtn(key, 'Ezberledim')}</div>
        ${typeof voiceBox === 'function' ? voiceBox(key) : ''}</div>`;
  return `<div class="ex-item ${open ? 'open' : ''} ${state.extra[key] ? 'learned' : ''}" id="dua-${d.id}">
    <button class="ex-item-head" type="button" onclick="stopDuaPlay(); exUI.dua = exUI.dua==='${d.id}' ? null : '${d.id}'; renderExtra('dua')">
      <span class="ex-num">${state.extra[key] ? '✓' : d.namaz ? '🕌' : '🤲'}</span><span class="ex-grow"><b>${d.t}</b><span class="ex-sub">${d.w}</span></span><span class="chevron">▸</span></button>${body}</div>`;
}
vDua = function(){
  const nm = DUA.filter(d=> d.namaz), day = DUA.filter(d=> !d.namaz);
  return `<h3 class="sub-title">🕌 Namaz duaları</h3>${nm.map(duaItem).join('')}
    <h3 class="sub-title">🤲 Günlük dualar</h3>${day.map(duaItem).join('')}`;
};

/* ============ Oyunlar ============ */
const MEM_STAGES = [[0,1,2,3,4,5],[6,7,8,9,10,11],[12,13,14,15,16,17],[18,19,20,21,22],[23,24,25,26,27]];
EX_SETS.push(['o', ()=> MEM_STAGES.map((_, i)=> String(i))]);
EX_SETS.push(['c', ()=> LETTERS.map((_, i)=> String(i))]);
let game = null; // null = menu, {type:'mem', ...} or {type:'paint', ...}

function renderGames(){
  const el = document.getElementById('exbody-oyunlar');
  if(!el) return;
  if(!game){
    el.innerHTML = `<p class="tab-hint">Öğrendiklerini eğlenerek pekiştir!</p>
      <button type="button" class="game-card" onclick="startMem(${Math.min(exCount('o'), MEM_STAGES.length - 1)})"><span class="gc-ic">🧩</span><span class="ex-grow"><b>Harfleri Eşleştir</b><span class="ex-sub">Kartları aç, aynı iki harfi bul · ${exCount('o')}/${MEM_STAGES.length} aşama</span></span><span class="chevron">▸</span></button>
      <button type="button" class="game-card" onclick="startPaint(firstUnpainted())"><span class="gc-ic">🎨</span><span class="ex-grow"><b>Harf Boya</b><span class="ex-sub">Parmağınla harfin içini boya · ${exCount('c')}/${LETTERS.length} harf</span></span><span class="chevron">▸</span></button>`;
    return;
  }
  if(game.type === 'mem') renderMem(el); else renderPaint(el);
}
const backToGames = `<button type="button" class="voice-btn ghost game-back" onclick="game=null;renderGames()">‹ Oyunlara dön</button>`;

// --- Harfleri Eşleştir ---
function startMem(stage){
  const cards = shuffle(MEM_STAGES[stage].concat(MEM_STAGES[stage]).map(i=> ({i})));
  game = {type:'mem', stage, cards, open:[], done:0, moves:0, busy:false};
  renderGames();
}
function renderMem(el){
  const g = game, total = MEM_STAGES[g.stage].length;
  if(g.done === total){
    el.innerHTML = `${backToGames}<div class="ex-card ex-center"><div class="ex-level">🎉</div><h3>Aşama ${g.stage + 1} tamam!</h3><p>${g.moves} denemede bütün harfleri buldun. Maşallah!</p>
      <div class="ex-row ex-nav">${g.stage < MEM_STAGES.length - 1 ? `<button type="button" class="ex-learn" onclick="startMem(${g.stage + 1})">Sonraki aşama ›</button>` : ''}
      <button type="button" class="voice-btn ghost" onclick="startMem(${g.stage})">Tekrar oyna</button></div></div>`;
    return;
  }
  el.innerHTML = `${backToGames}<div class="mem-head"><b>🧩 Harfleri Eşleştir</b><span>Aşama ${g.stage + 1}/${MEM_STAGES.length} · ${g.done}/${total} çift · ${g.moves} deneme</span></div>
    <div class="mem-stages">${MEM_STAGES.map((_, s)=> `<button type="button" class="chip ${s === g.stage ? 'on' : state.extra['o:'+s] ? 'gold' : ''}" onclick="startMem(${s})">${state.extra['o:'+s] ? '⭐' : ''}${s + 1}</button>`).join('')}</div>
    <div class="mem-grid">${g.cards.map((c, k)=> `<button type="button" class="mem-card ${c.up || c.ok ? 'up' : ''} ${c.ok ? 'ok' : ''}" onclick="flipMem(${k})" aria-label="Kart">
      <span class="mem-front arabic">${LETTERS[c.i].g}</span><span class="mem-back">؟</span></button>`).join('')}</div>`;
}
function flipMem(k){
  const g = game, c = g.cards[k];
  if(g.busy || c.up || c.ok) return;
  c.up = true; g.open.push(k);
  if(typeof playSfx === 'function') playSfx('tap');
  if(g.open.length === 2){
    g.moves++;
    const [a, b] = g.open.map(x=> g.cards[x]);
    if(a.i === b.i){
      a.ok = b.ok = true; a.up = b.up = false; g.open = []; g.done++;
      speakArabic(LETTERS[a.i].ar);
      if(g.done === MEM_STAGES[g.stage].length){
        if(!state.extra['o:'+g.stage]){ state.extra['o:'+g.stage] = true; updateHeader(); }
        if(typeof playSfx === 'function') playSfx('win');
        setTimeout(()=>{ renderGames(); celebrate(document.querySelector('#exbody-oyunlar .ex-level')); }, 700);
      }
    }else{
      g.busy = true;
      setTimeout(()=>{ a.up = b.up = false; g.open = []; g.busy = false; renderGames(); }, 900);
    }
  }
  renderGames();
}

// --- Harf Boya ---
const PAINT_COLORS = ['#E63946','#F4A261','#F6C90E','#2A9D8F','#06D6A0','#118AB2','#5A4FCF','#B5179E','#FF5D8F','#8D5524','#22312D','#FFFFFF'];
function firstUnpainted(){ const i = LETTERS.findIndex((_, j)=> !state.extra['c:'+j]); return i < 0 ? 0 : i; }
function startPaint(i){
  game = {type:'paint', i, color:game && game.color || PAINT_COLORS[0]};
  renderGames();
}
function renderPaint(el){
  const g = game, L = LETTERS[g.i];
  el.innerHTML = `${backToGames}<div class="mem-head"><b>🎨 Harf Boya</b><span>Harf ${g.i + 1}/${LETTERS.length} · ${L.name} ${state.extra['c:'+g.i] ? '⭐' : ''}</span></div>
    <p class="tab-hint">Parmağınla harfin içini boya!</p>
    <div class="paint-wrap"><canvas id="paintCv" width="600" height="600"></canvas></div>
    <div class="paint-colors">${PAINT_COLORS.map(c=> `<button type="button" class="paint-c ${c === g.color ? 'on' : ''}" style="background:${c}" onclick="game.color='${c}';document.querySelectorAll('.paint-c').forEach(b=>b.classList.toggle('on', b.style.background===this.style.background))" aria-label="Renk"></button>`).join('')}</div>
    <div class="ex-row ex-nav paint-btns"><button type="button" class="voice-btn ghost" onclick="startPaint(game.i)">↺ Temizle</button>
      <button type="button" class="ex-learn" onclick="speakArabic(LETTERS[game.i].ar)">🔊 Harfi dinle</button></div>
    <div class="ex-row ex-nav paint-btns"><button type="button" class="voice-btn ghost" ${g.i === 0 ? 'disabled' : ''} onclick="startPaint(game.i-1)">‹ Önceki</button>
      <button type="button" class="voice-btn ghost" ${g.i === LETTERS.length - 1 ? 'disabled' : ''} onclick="startPaint(game.i+1)">Sonraki ›</button></div>`;
  setupPaint();
}
async function setupPaint(){
  const cv = document.getElementById('paintCv');
  if(!cv) return;
  try{ await document.fonts.load('400px "Scheherazade New"'); }catch(e){}
  if(!game || game.type !== 'paint' || !cv.isConnected) return;
  const W = cv.width, H = cv.height, glyph = LETTERS[game.i].g;
  const mask = document.createElement('canvas'); mask.width = W; mask.height = H;
  const mx = mask.getContext('2d');
  let size = 420;
  mx.font = size+'px "Scheherazade New"';
  let m = mx.measureText(glyph);
  const bw = m.actualBoundingBoxLeft + m.actualBoundingBoxRight, bh = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
  size = Math.floor(size * Math.min(1.4, 440 / Math.max(bw, bh, 1)));
  mx.font = size+'px "Scheherazade New"';
  m = mx.measureText(glyph);
  const x = W/2 + (m.actualBoundingBoxLeft - m.actualBoundingBoxRight)/2;
  const y = H/2 + (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent)/2;
  mx.textAlign = 'left'; mx.textBaseline = 'alphabetic'; mx.fillStyle = '#000';
  mx.fillText(glyph, x, y);
  const paint = document.createElement('canvas'); paint.width = W; paint.height = H;
  const px = paint.getContext('2d');
  const ctx = cv.getContext('2d');
  const md = mx.getImageData(0, 0, W, H).data;
  let maskN = 0; for(let k = 3; k < md.length; k += 32) if(md[k] > 128) maskN++;
  const draw = ()=>{
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#F4EEE2'; ctx.font = mx.font; ctx.fillText(glyph, x, y);
    ctx.drawImage(paint, 0, 0);
    ctx.globalCompositeOperation = 'destination-in'; ctx.drawImage(mask, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.lineWidth = 5; ctx.strokeStyle = '#22312D'; ctx.lineJoin = 'round'; ctx.strokeText(glyph, x, y);
  };
  draw();
  let down = false, last = null;
  const pos = e=>{ const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * W / r.width, (e.clientY - r.top) * H / r.height]; };
  const dab = p=>{
    px.strokeStyle = px.fillStyle = game.color; px.lineWidth = 46; px.lineCap = 'round';
    px.beginPath();
    if(last){ px.moveTo(last[0], last[1]); px.lineTo(p[0], p[1]); px.stroke(); }
    else { px.arc(p[0], p[1], 23, 0, Math.PI*2); px.fill(); }
    last = p; draw();
  };
  cv.onpointerdown = e=>{ down = true; last = null; cv.setPointerCapture(e.pointerId); dab(pos(e)); };
  cv.onpointermove = e=>{ if(down) dab(pos(e)); };
  cv.onpointerup = cv.onpointercancel = ()=>{
    if(!down) return;
    down = false; last = null;
    if(state.extra['c:'+game.i]) return;
    const pd = px.getImageData(0, 0, W, H).data;
    let hit = 0; for(let k = 3; k < md.length; k += 32) if(md[k] > 128 && pd[k] > 0) hit++;
    if(maskN && hit / maskN > 0.7){
      state.extra['c:'+game.i] = true;
      updateHeader();
      celebrate(cv);
      if(typeof playSfx === 'function') playSfx('win');
      speakArabic(LETTERS[game.i].ar);
      showToast('Harika boyadın! '+LETTERS[game.i].name+' ⭐');
      const head = document.querySelector('#exbody-oyunlar .mem-head span');
      if(head) head.textContent += ' ⭐';
    }
  };
}

/* ============ Zikirmatik ============ */
const ZIKIR = [
  ['subhan', 'سُبْحَانَ اللّٰهِ', 'Sübhânallâh', 'Allah her türlü eksiklikten uzaktır.'],
  ['hamd', 'اَلْحَمْدُ لِلّٰهِ', 'Elhamdülillâh', 'Hamd Allah\'adır.'],
  ['tekbir', 'اَللّٰهُ أَكْبَرُ', 'Allâhu ekber', 'Allah en büyüktür.'],
  ['tevhid', 'لَا إِلٰهَ إِلَّا اللّٰهُ', 'Lâ ilâhe illallâh', 'Allah\'tan başka ilah yoktur.'],
  ['salavat', 'اللّٰهُمَّ صَلِّ عَلٰى مُحَمَّدٍ', 'Allâhümme salli alâ Muhammed', 'Allah\'ım, Peygamberimize rahmet eyle.'],
  ['istigfar', 'أَسْتَغْفِرُ اللّٰهَ', 'Estağfirullâh', 'Allah\'tan bağışlanma dilerim.']
];
const ZK_KEY = 'humanur-zikir';
let zk = {sel:'subhan', target:33, n:0, day:{}};
try{ Object.assign(zk, JSON.parse(localStorage.getItem(ZK_KEY)) || {}); }catch(e){}
function zkSave(){ try{ localStorage.setItem(ZK_KEY, JSON.stringify(zk)); }catch(e){} }
function zkToday(){ const d = zk.day[DK] || {}; return Object.values(d).reduce((a, b)=> a + b, 0); }
function renderZikir(){
  const el = document.getElementById('exbody-zikir');
  if(!el) return;
  const z = ZIKIR.find(x=> x[0] === zk.sel) || ZIKIR[0];
  const pct = zk.target ? Math.min(1, zk.n / zk.target) : 0, C = 2 * Math.PI * 92;
  el.innerHTML = `<div class="chips zk-list">${ZIKIR.map(x=> `<button type="button" class="chip ${x[0] === zk.sel ? 'on' : ''}" onclick="zk.sel='${x[0]}';zk.n=0;zkSave();renderZikir()">${x[2]}</button>`).join('')}</div>
    <div class="ex-card ex-center zk-card"><div class="arabic zk-ar">${z[1]}</div><b>${z[2]}</b><div class="ex-sub">${z[3]}</div></div>
    <button type="button" class="zk-btn" onclick="tapZikir(this)" aria-label="Say">
      <svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="92" class="zk-track"/><circle cx="100" cy="100" r="92" class="zk-ring" style="stroke-dasharray:${C};stroke-dashoffset:${C * (1 - pct)}"/></svg>
      <span class="zk-n">${zk.n}</span><span class="zk-t">${zk.target ? '/ '+zk.target : 'dokun'}</span></button>
    <div class="ex-row ex-nav"><span class="ex-sub">Hedef:</span>${[33, 99, 100, 0].map(t=> `<button type="button" class="chip ${zk.target === t ? 'on' : ''}" onclick="zk.target=${t};zk.n=0;zkSave();renderZikir()">${t || '∞'}</button>`).join('')}
      <button type="button" class="voice-btn ghost" onclick="zk.n=0;zkSave();renderZikir()">↺ Sıfırla</button></div>
    <p class="tab-hint">Bugün toplam: <b>${zkToday()}</b> zikir 📿</p>`;
}
function tapZikir(btn){
  zk.n++;
  const d = zk.day[DK] || (zk.day[DK] = {});
  d[zk.sel] = (d[zk.sel] || 0) + 1;
  // keep only the last 30 days
  const keys = Object.keys(zk.day).sort();
  while(keys.length > 30) delete zk.day[keys.shift()];
  if(typeof buzz === 'function') buzz(15);
  if(zk.target && zk.n === zk.target){
    if(typeof buzz === 'function') buzz([80, 60, 80]);
    if(typeof playSfx === 'function') playSfx('win');
    showToast('Maşallah! '+zk.target+' kere söyledin 📿');
    setTimeout(()=> celebrate(document.querySelector('.zk-btn')), 50);
  }else if(typeof playSfx === 'function') playSfx('tap');
  zkSave();
  renderZikir();
}

/* ============ Kur'an-ı Kerim ============ */
function renderKuran(){
  const el = document.getElementById('exbody-kuran');
  if(!el) return;
  el.innerHTML = `<div class="ex-card ex-center"><div class="ex-level">📗</div><h3>Kur'an-ı Kerim</h3>
      <p>Diyanet'in Kur'an-ı Kerim sitesinde mushafı sayfa sayfa okuyabilir, meâlini ve dinlemesini bulabilirsin.</p>
      <a class="ex-learn kuran-link" href="https://kuran.diyanet.gov.tr/" target="_blank" rel="noopener">📖 Diyanet Kur'an-ı Kerim'i aç</a>
      <p class="ex-sub">Yeni sekmede açılır. Bir büyüğünle birlikte kullan.</p></div>
    <div class="ex-label">Uygulamada</div>
    <button type="button" class="game-card" onclick="closeStage();openStage('suras')"><span class="gc-ic">☾</span><span class="ex-grow"><b>Sûreler</b><span class="ex-sub">${SURAS.length} sûre · 5 kâriden dinle · Ezber modu</span></span><span class="chevron">▸</span></button>
    <button type="button" class="game-card" onclick="closeStage();openStage('pages')"><span class="gc-ic">📄</span><span class="ex-grow"><b>Sayfalar</b><span class="ex-sub">Kur'an sayfası gibi okuma</span></span><span class="chevron">▸</span></button>`;
}

/* ============ Panels + start-up ============ */
function initGames(){
  const map = document.getElementById('mapView'), main = document.querySelector('main');
  [
    {id:'oyunlar', icon:'🎮', title:'Oyunlar',        desc:'Öğrendiklerini eğlenerek pekiştir', render:renderGames},
    {id:'zikir',   icon:'📿', title:'Zikirmatik',     desc:'Hedef belirle, zikrini say', render:renderZikir},
    {id:'kuran',   icon:'📗', title:'Kur\'an-ı Kerim', desc:'Mushafı oku', render:renderKuran}
  ].forEach(st=>{
    const n = document.createElement('div');
    n.className = 'stage-node ex-node';
    n.dataset.stage = st.id;
    n.innerHTML = `<div class="stage-badge">${st.icon}</div><div class="stage-body"><h3>${st.title}</h3><p>${st.desc}</p><div class="stage-stars" id="stars-${st.id}"></div></div>`;
    map.appendChild(n);
    const sec = document.createElement('section');
    sec.className = 'panel';
    sec.id = 'panel-'+st.id;
    sec.innerHTML = `<button class="back-btn" onclick="closeStage()">← Yolculuğa dön</button>
      <div class="panel-header"><h2>${st.title}</h2><p>${st.desc}</p></div><div class="ex-body" id="exbody-${st.id}"></div>`;
    main.appendChild(sec);
  });
  const _close = closeStage;
  closeStage = function(){ stopDuaPlay(); _close(); };
  const _open = openStage;
  openStage = function(stage){
    if(stage === 'oyunlar'){ game = null; renderGames(); }
    if(stage === 'zikir') renderZikir();
    if(stage === 'kuran') renderKuran();
    if(stage !== 'dua') stopDuaPlay();
    _open(stage);
  };
}
