// İman ve İslam'ın şartları + Âmentü, 25 Peygamber, Ezan, Ramazan ve oruç,
// Namaz vakitleri + Kıble, Çıkartma albümü and the weekly parent report.
// Loaded after games.js; started via initIman() from init().

/* ============ Shared: line-by-line text with a player ============ */
const LINESETS = {};
let linePlay = null;
function stopLines(){
  linePlay = null;
  if('speechSynthesis' in window) window.speechSynthesis.cancel();
  document.querySelectorAll('.ln-set .dua-line.speaking').forEach(e=> e.classList.remove('speaking'));
  document.querySelectorAll('.ln-set .dp-play').forEach(b=> b.textContent = '▶');
}
function linesHtml(gid, title, lines, note){
  LINESETS[gid] = lines;
  return `<div class="ln-set" id="ln-${gid}"><div class="dua-player"><button type="button" class="dp-play" onclick="playLines('${gid}')" aria-label="Hepsini dinle">▶</button>
      <span class="dp-title">${title}</span><span class="ex-sub">${note || lines.length+' satır · satıra dokun, dinle'}</span></div>
    ${lines.map((l, k)=> `<button type="button" class="dua-line" onclick="sayLines('${gid}',${k})"><span class="arabic">${l[0]}</span><span class="dl-ok">${l[1]}${l[3] ? ' <small class="ln-x">'+l[3]+'</small>' : ''}</span><span class="dl-m">${l[2]}</span></button>`).join('')}</div>`;
}
function playLines(gid){
  if(linePlay && linePlay.gid === gid){ stopLines(); return; }
  stopLines();
  if(typeof stopDuaPlay === 'function') stopDuaPlay();
  const lines = LINESETS[gid], token = {gid, k:0}, box = document.getElementById('ln-'+gid);
  linePlay = token;
  box.querySelector('.dp-play').textContent = '■';
  const els = box.querySelectorAll('.dua-line');
  const step = ()=>{
    if(linePlay !== token) return;
    els.forEach((e, j)=> e.classList.toggle('speaking', j === token.k));
    if(token.k >= lines.length){ stopLines(); return; }
    els[token.k].scrollIntoView({block:'nearest', behavior:'smooth'});
    speakLine(lines[token.k][0], ()=>{ token.k++; step(); });
  };
  step();
}
function sayLines(gid, k){
  stopLines();
  const els = document.querySelectorAll('#ln-'+gid+' .dua-line');
  els.forEach((e, j)=> e.classList.toggle('speaking', j === k));
  speakLine(LINESETS[gid][k][0], ()=> els.forEach(e=> e.classList.remove('speaking')));
}
// Marks a star and re-renders the given panel.
function ivMark(key, panel, el){
  if(state.extra[key]) return;
  state.extra[key] = true;
  if(el) celebrate(el);
  showToast('Maşallah! +1 yıldız ⭐');
  updateHeader();
  if(panel) renderIman(panel);
}
const ivBtn = (key, panel, label)=> state.extra[key]
  ? '<button class="ex-learn done" type="button">✓ Tamamlandı</button>'
  : `<button class="ex-learn" type="button" onclick="ivMark('${key}','${panel}',this)">${label} ⭐</button>`;

/* ============ İman ve İslam'ın şartları ============ */
const IMAN = [
  ['☝️', 'Allah\'a inanmak', 'Allah birdir, her şeyi O yarattı. Hiçbir şey O\'na benzemez.'],
  ['👼', 'Meleklere inanmak', 'Melekler nurdan yaratıldı. Hiç günah işlemezler, Allah\'ın emirlerini yaparlar.'],
  ['📚', 'Kitaplara inanmak', 'Allah peygamberlere kitaplar gönderdi: Tevrat, Zebur, İncil ve son kitap Kur\'an-ı Kerim.'],
  ['🌟', 'Peygamberlere inanmak', 'Allah insanlara doğru yolu göstermek için peygamberler gönderdi. İlki Hz. Âdem, sonuncusu Hz. Muhammed (s.a.v.).'],
  ['🌅', 'Ahiret gününe inanmak', 'Bu dünya bir gün sona erecek. Herkes tekrar diriltilecek ve yaptıklarının karşılığını görecek.'],
  ['🤲', 'Kadere inanmak', 'Her şey Allah\'ın bilgisi ve izniyle olur. Biz elimizden geleni yapar, sonra Allah\'a güveniriz.']
];
const ISLAM = [
  ['💬', 'Kelime-i şehâdet getirmek', 'Allah\'tan başka ilah olmadığına ve Hz. Muhammed\'in O\'nun kulu ve elçisi olduğuna şahitlik etmek.'],
  ['🕌', 'Namaz kılmak', 'Günde beş vakit namaz kılmak. Namaz dinin direğidir.'],
  ['🌙', 'Oruç tutmak', 'Ramazan ayında güneş doğmadan önceden akşama kadar yemeyip içmemek.'],
  ['💝', 'Zekât vermek', 'Zengin olanların mallarının bir kısmını ihtiyacı olanlara vermesi.'],
  ['🕋', 'Hacca gitmek', 'Gücü yeten Müslümanın ömründe bir kez Kâbe\'yi ziyaret edip haccı yapması.']
];
const AMENTU = [
  ['آمَنْتُ بِاللّٰهِ', 'Âmentü billâhi', 'Allah\'a inandım,'],
  ['وَمَلَائِكَتِهِ', 've melâiketihî', 'O\'nun meleklerine,'],
  ['وَكُتُبِهِ', 've kütübihî', 'kitaplarına,'],
  ['وَرُسُلِهِ', 've rusulihî', 'peygamberlerine,'],
  ['وَالْيَوْمِ الْآخِرِ', 'vel-yevmil-âhiri', 'ahiret gününe,'],
  ['وَبِالْقَدَرِ خَيْرِهِ وَشَرِّهِ مِنَ اللّٰهِ تَعَالٰى', 've bil-kaderi hayrihî ve şerrihî minallâhi teâlâ', 'hayrın ve şerrin Allah\'tan olduğuna (kadere),'],
  ['وَالْبَعْثُ بَعْدَ الْمَوْتِ حَقٌّ', 'vel-ba\'sü ba\'del-mevti hakkun', 'öldükten sonra dirilmenin hak olduğuna inandım.'],
  ['أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ', 'Eşhedü en lâ ilâhe illallâh', 'Şahitlik ederim ki Allah\'tan başka ilah yoktur.'],
  ['وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ', 've eşhedü enne Muhammeden abdühû ve resûlüh', 'Yine şahitlik ederim ki Muhammed O\'nun kulu ve elçisidir.']
];
EX_SETS.push(['f', ()=> IMAN.map((_, i)=> 'i'+i).concat(ISLAM.map((_, i)=> 's'+i), ['amentu', 'quiz'])]);
const iv = {iman:'iman', quiz:null};
function ivQuiz(){
  const islam = Math.random() < .5, pool = islam ? ISLAM : IMAN, other = islam ? IMAN : ISLAM;
  const right = pool[Math.floor(Math.random()*pool.length)];
  iv.quiz = {q:islam ? 'Hangisi İslam\'ın şartlarındandır?' : 'Hangisi imanın şartlarındandır?', right:right[1],
    options:shuffle([right, ...shuffle(other.slice()).slice(0, 2)]).map(x=> x[1]), n:(iv.quiz ? iv.quiz.n : 0), locked:false};
}
function vIman(){
  const tab = iv.iman;
  const tabs = [['iman','İmanın şartları'],['islam','İslam\'ın şartları'],['amentu','Âmentü'],['quiz','Bil bakalım']].map(([k, l])=>
    `<button class="tab-btn ${tab === k ? 'active' : ''}" type="button" onclick="stopLines();iv.iman='${k}';renderIman('iman')">${l}</button>`).join('');
  let body = '';
  if(tab === 'iman' || tab === 'islam'){
    const list = tab === 'iman' ? IMAN : ISLAM, p = tab === 'iman' ? 'i' : 's';
    body = `<p class="tab-hint">${tab === 'iman' ? 'İmanın 6 şartı vardır. Her karta dokun, oku ve öğren!' : 'İslam\'ın 5 şartı vardır. Her karta dokun, oku ve öğren!'}</p>
      <div class="iv-grid">${list.map((x, i)=> `<button type="button" class="iv-card ${state.extra['f:'+p+i] ? 'learned' : ''}" onclick="ivMark('f:${p}${i}','iman',this)">
        <span class="iv-no">${i + 1}</span><span class="iv-ic">${x[0]}</span><b>${x[1]}</b><span class="ex-sub">${x[2]}</span>${state.extra['f:'+p+i] ? '<span class="iv-ok">⭐</span>' : ''}</button>`).join('')}</div>`;
  }else if(tab === 'amentu'){
    body = `<p class="tab-hint">Âmentü, imanın şartlarını tek tek söylediğimiz güzel sözdür.</p>${linesHtml('amentu', 'Âmentü', AMENTU)}<div class="ex-row">${ivBtn('f:amentu', 'iman', 'Ezberledim')}</div>`;
  }else{
    if(!iv.quiz) ivQuiz();
    body = `<div class="quiz-box"><div class="quiz-question">${iv.quiz.q}</div>
      <div class="quiz-options iv-options">${iv.quiz.options.map(o=> `<button type="button" class="quiz-opt" onclick="ivAnswer(this)">${o}</button>`).join('')}</div>
      <div class="quiz-feedback" id="ivFb">${iv.quiz.n ? iv.quiz.n+' doğru 🎉' : ''}</div></div>
      ${state.extra['f:quiz'] ? '' : '<p class="tab-hint">5 soruyu doğru bil, yıldız kazan!</p>'}`;
  }
  return `<div class="tabbar">${tabs}</div>${body}`;
}
function ivAnswer(btn){
  const q = iv.quiz;
  if(q.locked) return;
  if(btn.textContent === q.right){
    q.locked = true; q.n++;
    btn.classList.add('correct'); celebrate(btn);
    document.getElementById('ivFb').textContent = randomPraise();
    if(q.n >= 5 && !state.extra['f:quiz']){ state.extra['f:quiz'] = true; updateHeader(); showToast('Maşallah! +1 yıldız ⭐'); }
    setTimeout(()=>{ ivQuiz(); renderIman('iman'); }, 1100);
  }else{
    btn.classList.add('wrong'); btn.disabled = true;
    if(typeof feedbackWrong === 'function') feedbackWrong(btn);
    document.getElementById('ivFb').textContent = 'Tekrar dene!';
  }
}

/* ============ 25 Peygamber ============ */
const PEYGAMBER = [
  ['Âdem', '🌍', 'İlk insan ve ilk peygamberdir. Allah onu topraktan yarattı; Hz. Havva ile birlikte yaşadı.'],
  ['İdris', '✍️', 'Kalemle yazı yazan ve elbise diken ilk insan olarak bilinir.'],
  ['Nûh', '🚢', 'Allah\'ın emriyle büyük bir gemi yaptı. Tufanda gemiye binen inananlar kurtuldu.'],
  ['Hûd', '🌬️', 'Âd kavmine gönderildi. Onları tek Allah\'a inanmaya çağırdı.'],
  ['Sâlih', '🐪', 'Semûd kavmine gönderildi. Mucizesi kayadan çıkan bir dişi deveydi.'],
  ['İbrâhîm', '🔥', 'Allah\'ın dostudur (Halîlullah). Ateşe atıldı ama ateş ona serin geldi. Oğlu İsmâil ile Kâbe\'yi yaptı.'],
  ['Lût', '🏘️', 'Hz. İbrâhîm\'in yeğenidir. Kavmini kötülüklerden vazgeçmeye çağırdı.'],
  ['İsmâil', '💧', 'Hz. İbrâhîm\'in oğludur. Babasıyla Kâbe\'yi yaptı. Zemzem suyu onun için çıktı.'],
  ['İshâk', '🌿', 'Hz. İbrâhîm\'in diğer oğlu, Hz. Yakûb\'un babasıdır.'],
  ['Yakûb', '👨‍👦', 'On iki oğlu vardı. Oğlu Yûsuf\'u kaybedince çok üzüldü ama hep sabretti.'],
  ['Yûsuf', '🌾', 'Kardeşleri onu kuyuya attı. Sabrı ve dürüstlüğüyle Mısır\'da yönetici oldu. Rüyaları yorumlardı.'],
  ['Eyyûb', '🌱', 'Hastalığa ve zorluklara çok sabretti. Sabrın en güzel örneğidir.'],
  ['Şuayb', '⚖️', 'Medyen halkına gönderildi. Alışverişte ölçü ve tartıda dürüst olmayı öğütledi.'],
  ['Mûsâ', '🌊', 'Zalim Firavun\'a karşı çıktı. Allah denizi onun için ikiye ayırdı. Tevrat ona verildi.'],
  ['Hârûn', '🗣️', 'Hz. Mûsâ\'nın kardeşi ve yardımcısıdır. Çok güzel konuşurdu.'],
  ['Zülkifl', '🤝', 'Sabırlı ve sözünü daima tutan bir peygamberdi.'],
  ['Dâvûd', '🎵', 'Zebur ona verildi. Çok güzel sesi vardı; demiri yumuşatıp zırh yapardı.'],
  ['Süleymân', '🐜', 'Hz. Dâvûd\'un oğludur. Hayvanların dilini bilirdi; karıncanın sözünü duyup gülümsedi.'],
  ['İlyâs', '⛰️', 'İnsanları putlara tapmaktan vazgeçip tek Allah\'a inanmaya çağırdı.'],
  ['Elyesa', '🕯️', 'Hz. İlyâs\'tan sonra insanları doğru yola çağırdı.'],
  ['Yûnus', '🐋', 'Büyük bir balığın karnında Allah\'a dua etti ve kurtuldu.'],
  ['Zekeriyyâ', '🙏', 'Hz. Meryem\'e o baktı. Yaşlıyken Allah ona Yahyâ adında bir oğul verdi.'],
  ['Yahyâ', '📜', 'Hz. Zekeriyyâ\'nın oğludur. Allah ona küçük yaşta hikmet verdi.'],
  ['Îsâ', '⭐', 'Hz. Meryem\'in oğludur. İncil ona verildi; beşikte konuştu.'],
  ['Muhammed (s.a.v.)', '🌙', 'Son peygamberdir. Mekke\'de doğdu. Kur\'an-ı Kerim ona indirildi; bütün insanlara rahmettir.']
];
EX_SETS.push(['y', ()=> PEYGAMBER.map((_, i)=> String(i))]);
const pg = {open:null, game:null};
function vPeygamber(){
  const done = exCount('y');
  return `<p class="tab-hint">Kur'an'da adı geçen 25 peygamber. Karta dokun, oku ve yıldızı kazan! (${done}/25 ⭐)</p>
    <div class="ex-row ex-nav"><button type="button" class="ex-learn" onclick="pgGame()">🎯 Sırayla bil oyunu</button></div>
    ${pg.game ? pgGameHtml() : ''}
    <div class="pg-list">${PEYGAMBER.map((p, i)=> `<button type="button" class="pg-card ${state.extra['y:'+i] ? 'learned' : ''} ${pg.open === i ? 'open' : ''}" onclick="pgOpen(${i}, this)">
      <span class="pg-no">${i + 1}</span><span class="pg-ic">${p[1]}</span><span class="ex-grow"><b>Hz. ${p[0]}</b>${pg.open === i ? `<span class="pg-fact">${p[2]}</span>` : ''}</span>${state.extra['y:'+i] ? '⭐' : ''}</button>`).join('')}</div>`;
}
function pgOpen(i, el){
  pg.open = pg.open === i ? null : i;
  if(!state.extra['y:'+i]){ state.extra['y:'+i] = true; celebrate(el); updateHeader(); }
  renderIman('peygamber');
}
function pgGame(){ pg.game = {k:0, wrong:0}; renderIman('peygamber'); }
function pgGameHtml(){
  const g = pg.game;
  if(g.k >= PEYGAMBER.length) return `<div class="ex-card ex-center"><div class="ex-level">🏆</div><b>25 peygamberi sırayla bildin!</b><p class="ex-sub">${g.wrong} yanlış. Maşallah!</p></div>`;
  if(!g.opts) g.opts = shuffle([g.k, ...shuffle(PEYGAMBER.map((_, i)=> i).filter(i=> i !== g.k)).slice(0, 2)]);
  return `<div class="quiz-box pg-game"><div class="quiz-question">${g.k === 0 ? 'İlk peygamber kim?' : 'Sıradaki peygamber kim?<div class="ex-sub">Önceki: Hz. '+PEYGAMBER[g.k - 1][0]+'</div>'}</div>
    <div class="daily-steps">${PEYGAMBER.map((_, j)=> `<i class="${j < g.k ? 'on' : j === g.k ? 'cur' : ''}"></i>`).join('')}</div>
    <div class="quiz-options">${g.opts.map(i=> `<button type="button" class="quiz-opt" onclick="pgPick(this,${i})">${PEYGAMBER[i][1]} Hz. ${PEYGAMBER[i][0]}</button>`).join('')}</div>
    <div class="quiz-feedback" id="pgFb"></div></div>`;
}
function pgPick(btn, i){
  const g = pg.game;
  if(g.locked) return;
  if(i === g.k){
    g.locked = true; btn.classList.add('correct'); celebrate(btn);
    setTimeout(()=>{ g.k++; g.opts = null; g.locked = false; renderIman('peygamber'); }, 700);
  }else{
    g.wrong++; btn.classList.add('wrong'); btn.disabled = true;
    if(typeof feedbackWrong === 'function') feedbackWrong(btn);
    document.getElementById('pgFb').textContent = 'Tekrar dene!';
  }
}

/* ============ Ezan ============ */
const EZAN = [
  ['اللّٰهُ أَكْبَرُ اللّٰهُ أَكْبَرُ', 'Allâhu ekber, Allâhu ekber', 'Allah en büyüktür, Allah en büyüktür.', '×2'],
  ['أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ', 'Eşhedü en lâ ilâhe illallâh', 'Şahitlik ederim ki Allah\'tan başka ilah yoktur.', '×2'],
  ['أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللّٰهِ', 'Eşhedü enne Muhammeden resûlullâh', 'Şahitlik ederim ki Muhammed Allah\'ın elçisidir.', '×2'],
  ['حَيَّ عَلَى الصَّلَاةِ', 'Hayye ales-salâh', 'Haydi namaza!', '×2'],
  ['حَيَّ عَلَى الْفَلَاحِ', 'Hayye alel-felâh', 'Haydi kurtuluşa!', '×2'],
  ['الصَّلَاةُ خَيْرٌ مِنَ النَّوْمِ', 'Es-salâtü hayrun minen-nevm', 'Namaz uykudan hayırlıdır. (Sadece sabah ezanında)', '×2'],
  ['اللّٰهُ أَكْبَرُ اللّٰهُ أَكْبَرُ', 'Allâhu ekber, Allâhu ekber', 'Allah en büyüktür, Allah en büyüktür.'],
  ['لَا إِلٰهَ إِلَّا اللّٰهُ', 'Lâ ilâhe illallâh', 'Allah\'tan başka ilah yoktur.']
];
const EZAN_DUA = [
  ['اللّٰهُمَّ رَبَّ هٰذِهِ الدَّعْوَةِ التَّامَّةِ', 'Allâhümme rabbe hâzihid-da\'vetit-tâmmeh', 'Ey bu eksiksiz çağrının Rabbi olan Allah\'ım!'],
  ['وَالصَّلَاةِ الْقَائِمَةِ', 'ves-salâtil-kâimeh', 'Ve kılınacak namazın Rabbi!'],
  ['آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ', 'âti Muhammedenil-vesîlete vel-fadîleh', 'Hz. Muhammed\'e vesîleyi ve üstünlüğü ver.'],
  ['وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ', 'veb\'ashü makâmen mahmûdenillezî veadteh', 'Onu söz verdiğin Makâm-ı Mahmûd\'a ulaştır.']
];
EX_SETS.push(['x', ()=> ['ezan', 'dua', 'sira']]);
const ez = {tab:'ezan', order:null};
function vEzan(){
  const tabs = [['ezan','Ezan'],['dua','Ezan duası'],['sira','Sırala']].map(([k, l])=>
    `<button class="tab-btn ${ez.tab === k ? 'active' : ''}" type="button" onclick="stopLines();ez.tab='${k}';renderIman('ezan')">${l}</button>`).join('');
  let body;
  if(ez.tab === 'ezan'){
    body = `<p class="tab-hint">Ezan, Müslümanları namaza çağırır. Günde beş kez okunur. Ezanı duyunca susar, dinler ve cümleleri içimizden tekrar ederiz.</p>
      ${linesHtml('ezan', 'Ezan', EZAN)}<div class="ex-row">${ivBtn('x:ezan', 'ezan', 'Ezanı öğrendim')}</div>`;
  }else if(ez.tab === 'dua'){
    body = `<p class="tab-hint">Ezan bitince önce salavat getirilir, sonra bu dua okunur.</p>
      ${linesHtml('ezandua', 'Ezan duası', EZAN_DUA)}<div class="ex-row">${ivBtn('x:dua', 'ezan', 'Ezberledim')}</div>`;
  }else{
    if(!ez.order) ez.order = {k:0, opts:null, wrong:0};
    const o = ez.order, seq = [0, 1, 2, 3, 4, 6, 7];
    if(o.k >= seq.length){
      if(!state.extra['x:sira']){ state.extra['x:sira'] = true; updateHeader(); }
      body = `<div class="ex-card ex-center"><div class="ex-level">🕌</div><b>Ezanı doğru sıraladın!</b><p class="ex-sub">${o.wrong} yanlış</p>
        <button type="button" class="ex-learn" onclick="ez.order=null;renderIman('ezan')">Tekrar oyna</button></div>`;
    }else{
      if(!o.opts) o.opts = shuffle([seq[o.k], ...shuffle(seq.filter(x=> x !== seq[o.k] && EZAN[x][1] !== EZAN[seq[o.k]][1])).slice(0, 2)]);
      body = `<div class="quiz-box"><div class="quiz-question">Ezanın ${o.k + 1}. cümlesi hangisi?</div>
        <div class="daily-steps">${seq.map((_, j)=> `<i class="${j < o.k ? 'on' : j === o.k ? 'cur' : ''}"></i>`).join('')}</div>
        <div class="quiz-options iv-options">${o.opts.map(x=> `<button type="button" class="quiz-opt ez-opt" onclick="ezPick(this,${x})"><span class="arabic">${EZAN[x][0]}</span><small>${EZAN[x][1]}</small></button>`).join('')}</div>
        <div class="quiz-feedback" id="ezFb"></div></div>`;
    }
  }
  return `<div class="tabbar">${tabs}</div>${body}`;
}
function ezPick(btn, x){
  const o = ez.order, seq = [0, 1, 2, 3, 4, 6, 7];
  if(o.locked) return;
  if(EZAN[x][1] === EZAN[seq[o.k]][1]){
    o.locked = true; btn.classList.add('correct'); celebrate(btn); speakArabic(EZAN[x][0]);
    setTimeout(()=>{ o.k++; o.opts = null; o.locked = false; renderIman('ezan'); }, 900);
  }else{
    o.wrong++; btn.classList.add('wrong'); btn.disabled = true;
    if(typeof feedbackWrong === 'function') feedbackWrong(btn);
    document.getElementById('ezFb').textContent = 'Tekrar dene!';
  }
}

/* ============ Ramazan ve oruç ============ */
const IFTAR = [['اللّٰهُمَّ لَكَ صُمْتُ وَبِكَ آمَنْتُ', 'Allâhümme leke sumtü ve bike âmentü', 'Allah\'ım! Senin için oruç tuttum, sana inandım,'],
  ['وَعَلَيْكَ تَوَكَّلْتُ وَعَلٰى رِزْقِكَ أَفْطَرْتُ', 've aleyke tevekkeltü ve alâ rızkıke eftartü', 'sana güvendim ve senin verdiğin rızıkla orucumu açtım.']];
EX_SETS.push(['r', ()=> ['oruc', 'niyet', 'iftar']]);
// Ramadan of the current or next Hijri year: {y, start, days, today}
function ramazanInfo(){
  if(typeof HF === 'undefined' || !HF) return null;
  try{
    const base = new Date(); base.setHours(12, 0, 0, 0);
    const now = hij(base);
    let start = null, y = null;
    for(let i = -31; i < 400 && !start; i++){
      const d = new Date(base.getTime() + i*864e5), h = hij(d);
      if(h.m === 9 && h.d === 1 && (i >= 0 || now.m === 9)){ start = d; y = h.y; }
    }
    if(!start) return null;
    let days = 29;
    for(let k = 29; k <= 30; k++){ const h = hij(new Date(start.getTime() + k*864e5)); if(h.m === 9) days = k + 1; }
    const today = Math.round((base - start) / 864e5) + 1;
    return {y, start, days, today};
  }catch(e){ return null; }
}
function vRamazan(){
  const R = ramazanInfo();
  let cal = '<p class="ex-sub">Bu cihaz hicrî takvimi desteklemiyor.</p>';
  if(R){
    const inR = R.today >= 1 && R.today <= R.days;
    const fasted = Array.from({length:R.days}, (_, i)=> state.extra['oruc:'+R.y+'-'+(i + 1)] || 0);
    const full = fasted.filter(v=> v === 2).length, half = fasted.filter(v=> v === 1).length;
    cal = `<div class="ex-card ex-center ram-head"><div class="ex-level">🌙</div>
        ${inR ? `<b>Hayırlı Ramazanlar! Bugün Ramazan'ın ${R.today}. günü</b>` : `<b>Ramazan'a ${R.today < 1 ? (1 - R.today)+' gün kaldı' : 'kalan gün'}</b>`}
        <div class="ex-sub">${R.y} Ramazanı: ${R.start.toLocaleDateString('tr-TR', {day:'numeric', month:'long', year:'numeric'})} · ${R.days} gün (yaklaşık; kesin tarih için Diyanet takvimine bakın)</div></div>
      <div class="ex-label">Benim oruç takvimim</div>
      <p class="tab-hint">Oruç tuttuğun günlere dokun: 1 kez = yarım gün 🌗, 2 kez = tam gün 🌕. Küçükler yarım gün tutarak alışabilir.</p>
      <div class="ram-grid">${fasted.map((v, i)=> `<button type="button" class="ram-day v${v} ${inR && i + 1 === R.today ? 'today' : ''}" ${R.today < i + 1 ? 'disabled' : ''} onclick="ramToggle(${R.y},${i + 1})"><small>${i + 1}</small><span>${v === 2 ? '🌕' : v === 1 ? '🌗' : '·'}</span></button>`).join('')}</div>
      <p class="tab-hint">🌕 ${full} tam gün · 🌗 ${half} yarım gün</p>`;
  }
  return `${cal}
    <div class="ex-label">Oruç nedir?</div>
    <div class="ex-card"><p>Oruç, Ramazan ayında imsak vaktinden (sabaha karşı) akşam ezanına kadar hiçbir şey yememek ve içmemektir. Oruç bize sabrı, şükrü ve aç olanları anlamayı öğretir. Sahurda yemek yeriz, akşam ezanıyla iftar ederiz.</p>
      <p>Ramazan'da Kur'an indirilmeye başlandı. Kadir gecesi bu aydadır. Ramazan bitince Ramazan Bayramı gelir. 🎉</p>${ivBtn('r:oruc', 'ramazan', 'Öğrendim')}</div>
    <div class="ex-label">Sahurda niyet</div>
    <div class="ex-card"><p class="ram-niyet">“Niyet ettim Allah rızası için bugünkü Ramazan orucunu tutmaya.”</p>
      <p class="ex-sub">Niyet kalple yapılır; dille söylemek de güzeldir.</p>${ivBtn('r:niyet', 'ramazan', 'Öğrendim')}</div>
    <div class="ex-label">İftar duası</div>
    ${linesHtml('iftar', 'İftar duası', IFTAR)}<div class="ex-row">${ivBtn('r:iftar', 'ramazan', 'Ezberledim')}</div>`;
}
function ramToggle(y, d){
  const k = 'oruc:'+y+'-'+d, v = ((state.extra[k] || 0) + 1) % 3;
  if(v) state.extra[k] = v; else delete state.extra[k];
  if(v === 2) showToast('Maşallah! Tam gün oruç 🌕');
  saveProgress();
  renderIman('ramazan');
}

/* ============ Namaz vakitleri + Kıble ============ */
const VK_KEY = 'humanur-vakit';
let vk = {city:'', lat:null, lon:null, label:'', data:null, date:'', err:''};
try{ Object.assign(vk, JSON.parse(localStorage.getItem(VK_KEY)) || {}); }catch(e){}
function vkSave(){ try{ localStorage.setItem(VK_KEY, JSON.stringify(Object.assign({}, vk, {err:''}))); }catch(e){} }
const VK_NAMES = [['Fajr','İmsak','🌌'],['Sunrise','Güneş','🌅'],['Dhuhr','Öğle','☀️'],['Asr','İkindi','🌤️'],['Maghrib','Akşam','🌇'],['Isha','Yatsı','🌙']];
const KAABA = [21.4225, 39.8262];
function qiblaBearing(lat, lon){
  const r = Math.PI/180, f1 = lat*r, f2 = KAABA[0]*r, dl = (KAABA[1] - lon)*r;
  const y = Math.sin(dl)*Math.cos(f2), x = Math.cos(f1)*Math.sin(f2) - Math.sin(f1)*Math.cos(f2)*Math.cos(dl);
  return (Math.atan2(y, x)/r + 360) % 360;
}
async function vkFetch(){
  vk.err = '';
  const today = new Date(), ds = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  const url = vk.lat !== null
    ? `https://api.aladhan.com/v1/timings/${ds}?latitude=${vk.lat}&longitude=${vk.lon}&method=13`
    : `https://api.aladhan.com/v1/timingsByAddress/${ds}?address=${encodeURIComponent(vk.city)}&method=13`;
  try{
    const r = await fetch(url);
    const j = await r.json();
    if(!r.ok || !j.data) throw new Error('bad');
    vk.data = j.data.timings; vk.date = DK;
    if(vk.lat === null && j.data.meta){ vk.lat = +j.data.meta.latitude; vk.lon = +j.data.meta.longitude; vk.geo = false; }
  }catch(e){ vk.err = 'Vakitler alınamadı. İnternet bağlantısını ve şehir adını kontrol et.'; }
  vkSave();
  renderIman('vakit');
}
function vkCity(v){ v = String(v || '').trim(); if(!v) return; vk.city = v; vk.label = v; vk.lat = vk.lon = null; vk.data = null; vkFetch(); }
function vkLocate(){
  if(!navigator.geolocation){ vk.err = 'Bu cihazda konum yok. Şehir adını yaz.'; renderIman('vakit'); return; }
  navigator.geolocation.getCurrentPosition(p=>{
    vk.lat = +p.coords.latitude.toFixed(4); vk.lon = +p.coords.longitude.toFixed(4); vk.label = 'Bulunduğum yer'; vk.city = ''; vk.data = null; vkFetch();
  }, ()=>{ vk.err = 'Konum izni verilmedi. Şehir adını yazabilirsin.'; renderIman('vakit'); }, {timeout:10000});
}
function vkNext(){
  if(!vk.data) return null;
  const now = new Date(), mins = now.getHours()*60 + now.getMinutes();
  for(const [k, n] of VK_NAMES){
    const [h, m] = String(vk.data[k]).slice(0, 5).split(':').map(Number);
    if(h*60 + m > mins) return {k, n, left:h*60 + m - mins};
  }
  return {k:'Fajr', n:'İmsak', left:null};
}
let compassOn = false, heading = null;
function onOrient(e){
  let h = null;
  if(typeof e.webkitCompassHeading === 'number') h = e.webkitCompassHeading;
  else if(e.absolute && typeof e.alpha === 'number') h = 360 - e.alpha;
  if(h === null) return;
  heading = h;
  const needle = document.getElementById('qNeedle'), dial = document.getElementById('qDial');
  if(dial) dial.style.transform = `rotate(${-h}deg)`;
  if(needle && vk.lat !== null){
    const diff = ((qiblaBearing(vk.lat, vk.lon) - h) % 360 + 360) % 360;
    const ok = diff < 6 || diff > 354;
    document.getElementById('qState').textContent = ok ? '✅ Kıble bu yönde!' : 'Telefonu yavaşça döndür…';
    if(ok && !onOrient._ok && typeof buzz === 'function') buzz(60);
    onOrient._ok = ok;
  }
}
async function startCompass(){
  try{
    if(window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function'){
      const p = await DeviceOrientationEvent.requestPermission();
      if(p !== 'granted') throw new Error('denied');
    }
    if(!compassOn){
      window.addEventListener('deviceorientationabsolute', onOrient);
      window.addEventListener('deviceorientation', onOrient);
      compassOn = true;
    }
    showToast('Telefonu düz tut ve yavaşça çevir 🧭');
    setTimeout(()=>{ if(heading === null){ const s = document.getElementById('qState'); if(s) s.textContent = 'Bu cihazda pusula bulunamadı. Derece değerini kullan.'; } }, 2500);
  }catch(e){ showToast('Pusula izni verilmedi.'); }
}
function vVakit(){
  const nx = vkNext(), qb = vk.lat !== null ? Math.round(qiblaBearing(vk.lat, vk.lon)) : null;
  if(vk.data && vk.date !== DK && !vk.loading){ vk.loading = true; setTimeout(()=>{ vk.loading = false; vkFetch(); }, 0); }
  return `<div class="ex-card vk-loc"><div class="ex-label">📍 Konum</div>
      <form class="chat-form" onsubmit="event.preventDefault();vkCity(this.c.value)"><input name="c" class="ex-input" placeholder="Şehir, ör. Köln veya İstanbul" value="${escHtml(vk.city || '')}" autocomplete="off"><button class="ex-learn" type="submit">Ara</button></form>
      <button type="button" class="voice-btn ghost" onclick="vkLocate()">📡 Konumumu kullan</button>
      ${vk.label ? `<div class="ex-sub">Seçili: <b>${escHtml(vk.label)}</b> · Hesaplama: Diyanet yöntemi</div>` : ''}
      ${vk.err ? `<p class="ex-err">${vk.err}</p>` : ''}</div>
    ${vk.data ? `${nx && nx.left !== null ? `<div class="ex-card ex-center vk-next"><div class="ex-sub">Sıradaki vakit</div><b>${VK_NAMES.find(x=> x[0] === nx.k)[2]} ${nx.n}</b><div>${Math.floor(nx.left/60) ? Math.floor(nx.left/60)+' saat ' : ''}${nx.left % 60} dakika sonra</div></div>` : ''}
      <div class="vk-grid">${VK_NAMES.map(([k, n, ic])=> `<div class="vk-cell ${nx && nx.k === k ? 'next' : ''}"><span>${ic}</span><b>${n}</b><em>${String(vk.data[k]).slice(0, 5)}</em></div>`).join('')}</div>
      <p class="ex-sub">Vakitler aladhan.com'dan alınır (Diyanet hesaplama yöntemi). Küçük farklar olabilir; kesin vakitler için caminin veya Diyanet'in takvimine bakın.</p>`
    : vk.label && !vk.err ? '<p class="tab-hint">Vakitler yükleniyor…</p>' : '<p class="tab-hint">Namaz vakitleri ve kıble için şehrini yaz veya konumunu kullan.</p>'}
    ${qb !== null ? `<div class="ex-label">🕋 Kıble</div>
      <div class="ex-card ex-center"><div class="q-compass"><div class="q-dial" id="qDial"><span class="q-n">K</span><span class="q-e">D</span><span class="q-s">G</span><span class="q-w">B</span>
        <div class="q-needle" id="qNeedle" style="transform:rotate(${qb}deg)"><span>🕋</span></div></div></div>
        <b>Kıble, kuzeyden saat yönünde ${qb}°</b><div class="ex-sub" id="qState">Pusulayı açınca telefonunu çevir; Kâbe işareti üstte olunca kıbleye dönmüşsün.</div>
        <button type="button" class="ex-learn" onclick="startCompass()">🧭 Pusulayı aç</button></div>` : ''}`;
}

/* ============ Çıkartma albümü ============ */
const STICKERS = [
  ['🌱','Filiz','İlk adım! Küçük bir tohum büyük ağaç olur.'],['🌙','Hilal','Hicrî aylar hilalle başlar.'],['⭐','Yıldız','Gökyüzünü süsleyen yıldızlar.'],
  ['🌷','Lale','Osmanlı\'nın sevdiği çiçek; adı "Allah" kelimesiyle aynı harflerle yazılır.'],['🕌','Cami','Allah\'ın evi; namaz kıldığımız yer.'],['📖','Mushaf','Kur\'an-ı Kerim\'in yazılı hâli.'],
  ['🤲','Dua','Allah ile konuşmanın en güzel yolu.'],['📿','Tesbih','Zikirleri saymaya yarar.'],['🐪','Deve','Çölün gemisi; Sâlih peygamberin mucizesi bir deveydi.'],
  ['🌴','Hurma','Peygamberimizin sevdiği meyve; iftarı hurmayla açarız.'],['💧','Zemzem','Hz. İsmâil için çıkan mübarek su.'],['🕋','Kâbe','Namazda yöneldiğimiz kıble.'],
  ['🚢','Nûh\'un gemisi','Tufanda inananları taşıyan gemi.'],['🐋','Yûnus\'un balığı','Hz. Yûnus balığın karnında dua etti.'],['🐜','Karınca','Hz. Süleymân karıncanın sözünü duydu.'],
  ['🐝','Arı','Kur\'an\'da Nahl (Arı) sûresi vardır.'],['🕷️','Örümcek','Sevr mağarasında ağ ören örümcek.'],['🕊️','Güvercin','Mağaranın önüne yuva yapan güvercin.'],
  ['🐦','Ebâbil','Fîl sûresindeki küçük kuşlar.'],['🍯','Bal','Arının yaptığı şifalı bal.'],['🫒','Zeytin','Tîn sûresinde adı geçen mübarek ağaç.'],
  ['🌾','Başak','Bir tohumdan yedi başak; sadakanın bereketi.'],['⛰️','Hira Dağı','İlk vahyin geldiği yer.'],['🏮','Kandil','Mübarek gecelerin ışığı.'],
  ['🌹','Gül','Peygamberimizin hatırası sayılan çiçek.'],['🏺','Testi','Abdest suyunun testisi.'],['🌌','Gökyüzü','Allah\'ın yarattığı sonsuz gökler.'],
  ['🌅','Sabah','Sabah namazının vakti.'],['🎉','Bayram','Ramazan ve Kurban bayramının sevinci.'],['🏆','Şampiyon','Bütün albümü tamamladın! Maşallah!']
];
const stickerNeed = k=> Math.round(5 + k*k*0.75);
function stickersGot(){ const t = totalStars().total; return STICKERS.filter((_, k)=> t >= stickerNeed(k)).length; }
let stickerSel = null;
function vAlbum(){
  const got = stickersGot(), t = totalStars().total;
  const next = got < STICKERS.length ? stickerNeed(got) - t : 0;
  const sel = stickerSel !== null && stickerSel < got ? STICKERS[stickerSel] : null;
  return `<div class="ex-card ex-center"><b>📒 ${got} / ${STICKERS.length} çıkartma</b><div class="ex-sub">${next > 0 ? 'Sonraki çıkartmaya '+next+' yıldız kaldı ⭐' : 'Albüm tamam! 🏆'}</div>
      <div class="tile-bar alb-bar"><i style="width:${Math.round(got/STICKERS.length*100)}%"></i></div></div>
    ${sel ? `<div class="ex-card ex-center alb-sel"><div class="alb-big">${sel[0]}</div><b>${sel[1]}</b><p>${sel[2]}</p></div>` : ''}
    <div class="alb-grid">${STICKERS.map((s, k)=> k < got
      ? `<button type="button" class="alb-st ${stickerSel === k ? 'on' : ''}" onclick="stickerSel=${k};renderIman('album')"><span>${s[0]}</span><small>${s[1]}</small></button>`
      : `<div class="alb-st locked"><span>❔</span><small>${stickerNeed(k)} ⭐</small></div>`).join('')}</div>`;
}
let stickersSeen = null;
function checkStickers(){
  const got = stickersGot();
  if(stickersSeen === null){
    let raw = null;
    try{ raw = localStorage.getItem('humanur-stickers'); }catch(e){}
    stickersSeen = raw === null || isNaN(+raw) ? got : +raw;
  }
  if(got > stickersSeen){
    const s = STICKERS[got - 1];
    setTimeout(()=> showToast('Yeni çıkartma: '+s[0]+' '+s[1]+'! 📒'), 1600);
  }
  stickersSeen = got;
  try{ localStorage.setItem('humanur-stickers', String(got)); }catch(e){}
}

/* ============ Haftalık veli raporu ============ */
function weekReport(){
  const t = totalStars(), days = [], gun = ['Paz','Pzt','Sal','Çar','Per','Cum','Cmt'];
  for(let i = 6; i >= 0; i--){
    const d = new Date(); d.setDate(d.getDate() - i);
    const k = dkOf(d), x = state.days[k] || {};
    const zd = typeof zk !== 'undefined' && zk.day[k] ? Object.values(zk.day[k]).reduce((a, b)=> a + b, 0) : 0;
    days.push({lab:gun[d.getDay()]+' '+d.getDate()+'.', n:x.n || 0, daily:!!x.daily, ev:(x.s || []).filter(Boolean).length, zk:zd});
  }
  const sum = days.reduce((a, d)=> a + d.n, 0), active = days.filter(d=> d.n > 0 || d.daily).length;
  const weak = typeof weakItems === 'function' ? weakItems(8).map(weakLabel) : [];
  const from = new Date(); from.setDate(from.getDate() - 6);
  return {t, days, sum, active, weak, from, name:(typeof certName === 'function' ? certName() : 'Hümanur')};
}
function reportHtml(){
  const r = weekReport(), f = d=> d.toLocaleDateString('tr-TR', {day:'numeric', month:'long'});
  const best = r.days.reduce((a, d)=> d.n > a.n ? d : a, r.days[0]);
  return `<div class="rep">
    <div class="rep-head"><span>☾</span><div><b>${escHtml(r.name)} · Haftalık rapor</b><div class="ex-sub">${f(r.from)} – ${f(new Date())}</div></div></div>
    <div class="ex-stats-grid">
      <div class="ex-card ex-center"><b>⭐ ${r.sum}</b><div class="ex-sub">bu hafta yıldız</div></div>
      <div class="ex-card ex-center"><b>📅 ${r.active}/7</b><div class="ex-sub">çalışılan gün</div></div>
      <div class="ex-card ex-center"><b>🔥 ${streak()}</b><div class="ex-sub">gün serisi</div></div>
      <div class="ex-card ex-center"><b>${r.t.total}/${r.t.max}</b><div class="ex-sub">toplam yıldız</div></div></div>
    <table class="rep-table"><tr><th>Gün</th><th>⭐</th><th>Günlük ders</th><th>Akşam sofrası</th><th>Zikir</th></tr>
      ${r.days.map(d=> `<tr><td>${d.lab}</td><td>${d.n}</td><td>${d.daily ? '✅' : '–'}</td><td>${d.ev}/5</td><td>${d.zk || '–'}</td></tr>`).join('')}</table>
    <div class="ex-label">Durum</div>
    <ul class="rep-list">
      <li>Elifbe: ${r.t.stage1}/${STAGE1_MAX} · Hece: ${r.t.s}/${SYLLABLES.length} · Okuma: ${r.t.d}/${LESSON_ITEM_COUNT}</li>
      <li>Ezberlenen sûre: ${SURAS.filter((_, i)=> suraDone(i)).length}/${SURAS.length} · Dua: ${exCount('d')}/${DUA.length} · Peygamber: ${exCount('y')}/25</li>
      <li>Çıkartma albümü: ${stickersGot()}/${STICKERS.length}</li>
      ${best.n ? `<li>En verimli gün: <b>${best.lab}</b> (${best.n} yıldız)</li>` : ''}</ul>
    <div class="ex-label">Zorlandıkları</div>
    <p>${r.weak.length ? r.weak.map(w=> `<span class="chip weak-chip">${w}</span>`).join(' ') : 'Bu hafta belirgin bir zorlanma yok. 👏'}</p>
    <p class="ex-sub">Hümanur'un Kur'an Yolculuğu · ${new Date().toLocaleDateString('tr-TR')}</p></div>`;
}
function reportText(){
  const r = weekReport();
  return `${r.name} · Haftalık rapor\n⭐ Bu hafta ${r.sum} yıldız, ${r.active}/7 gün çalıştı, 🔥 ${streak()} gün seri.\nToplam: ${r.t.total}/${r.t.max} yıldız. Sûre: ${SURAS.filter((_, i)=> suraDone(i)).length}/${SURAS.length}, Dua: ${exCount('d')}/${DUA.length}.\n${r.weak.length ? 'Zorlandıkları: '+r.weak.join(', ') : ''}`;
}
function openReport(){
  const el = document.getElementById('repBox');
  if(!el) return;
  el.innerHTML = reportHtml() + `<div class="ex-row ex-nav"><button class="ex-learn" type="button" onclick="printReport()">🖨️ Yazdır / PDF</button>
    <button class="voice-btn ghost" type="button" onclick="shareReport()">📤 Paylaş</button></div>`;
  el.scrollIntoView({block:'start', behavior:'smooth'});
}
function printReport(){
  let p = document.getElementById('reportPrint');
  if(!p){ p = document.createElement('div'); p.id = 'reportPrint'; document.body.appendChild(p); }
  p.innerHTML = reportHtml();
  document.body.classList.add('print-report');
  const done = ()=>{ document.body.classList.remove('print-report'); window.removeEventListener('afterprint', done); };
  window.addEventListener('afterprint', done);
  setTimeout(()=> window.print(), 100);
}
async function shareReport(){
  const text = reportText();
  try{
    if(navigator.share){ await navigator.share({title:'Haftalık rapor', text}); return; }
    await navigator.clipboard.writeText(text); showToast('Rapor kopyalandı 📋');
  }catch(e){}
}

/* ============ Panels + start-up ============ */
const IMAN_PANELS = {iman:vIman, peygamber:vPeygamber, ezan:vEzan, ramazan:vRamazan, vakit:vVakit, album:vAlbum};
function renderIman(id){
  const el = document.getElementById('exbody-'+id);
  if(el && IMAN_PANELS[id]) el.innerHTML = IMAN_PANELS[id]();
}
function initIman(){
  const map = document.getElementById('mapView'), main = document.querySelector('main');
  [
    {id:'iman',      icon:'💚', title:'İman ve İslam',     desc:'İmanın ve İslam\'ın şartları, Âmentü'},
    {id:'peygamber', icon:'🌟', title:'25 Peygamber',      desc:'Kur\'an\'da adı geçen peygamberler'},
    {id:'ezan',      icon:'📢', title:'Ezan',              desc:'Ezan ve ezan duası'},
    {id:'ramazan',   icon:'🌙', title:'Ramazan ve Oruç',   desc:'Oruç takvimim, sahur ve iftar'},
    {id:'vakit',     icon:'🧭', title:'Vakitler ve Kıble', desc:'Namaz vakitleri ve kıble pusulası'},
    {id:'album',     icon:'📒', title:'Çıkartma Albümü',   desc:'Yıldız topla, çıkartma kazan'}
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
  // Weekly report button in the parent panel
  const _vVeli = vVeli;
  vVeli = function(){
    const html = _vVeli();
    if(!exUI.pOk) return html;
    return `<div class="ex-card rep-cta"><b>📄 Haftalık rapor</b><p class="ex-sub">Bu hafta neler öğrenildi, nerede zorlanıldı. Yazdırabilir veya paylaşabilirsiniz.</p>
      <button class="ex-learn" type="button" onclick="openReport()">Raporu göster</button></div><div id="repBox"></div>` + html;
  };
  const _close = closeStage;
  closeStage = function(){ stopLines(); _close(); };
  const _open = openStage;
  openStage = function(stage){
    if(IMAN_PANELS[stage]){ if(stage === 'peygamber') pg.game = null; renderIman(stage); }
    _open(stage);
    if(stage === 'vakit' && vk.label && !vk.data && !vk.err) vkFetch();
  };
  const _uh = updateHeader;
  updateHeader = function(){ _uh(); checkStickers(); };
  checkStickers();
}
