// Weak-spot practice, listening quiz, ezber (memorise) mode, certificates,
// tecvid for children, and more suras and duas.
// Loaded after chat.js and before fun.js; started from init() via initMore().

/* ============ More suras (appended so saved keys stay valid) ============ */
SURAS.push(
  { name:"Duhâ Sûresi", note:"Kuşluk Vakti", num:93, ayat:[
    {ar:"وَالضُّحَىٰ", tr:"Ve'd-duhâ", de:"Kuşluk vaktine andolsun,"},
    {ar:"وَاللَّيْلِ إِذَا سَجَىٰ", tr:"Ve'l-leyli izâ secâ", de:"Sükûna erdiğinde geceye andolsun ki,"},
    {ar:"مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ", tr:"Mâ vedde'ake rabbüke ve mâ kalâ", de:"Rabbin seni bırakmadı ve sana darılmadı."},
    {ar:"وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ", tr:"Ve le'l-âhiratü hayrun leke mine'l-ûlâ", de:"Elbette senin için ahiret dünyadan daha hayırlıdır."},
    {ar:"وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ", tr:"Ve le-sevfe yu'tîke rabbüke fe-terdâ", de:"Rabbin sana verecek, sen de razı olacaksın."},
    {ar:"أَلَمْ يَجِدْكَ يَتِيمًا فَآوَىٰ", tr:"Elem yecidke yetîmen fe-âvâ", de:"O seni yetim bulup barındırmadı mı?"},
    {ar:"وَوَجَدَكَ ضَالًّا فَهَدَىٰ", tr:"Ve vecedeke dâllen fe-hedâ", de:"Seni yolunu bilmez bulup doğru yola iletmedi mi?"},
    {ar:"وَوَجَدَكَ عَائِلًا فَأَغْنَىٰ", tr:"Ve vecedeke âilen fe-ağnâ", de:"Seni muhtaç bulup zengin etmedi mi?"},
    {ar:"فَأَمَّا الْيَتِيمَ فَلَا تَقْهَرْ", tr:"Fe-emme'l-yetîme fe-lâ takhar", de:"Öyleyse sakın yetimi ezme!"},
    {ar:"وَأَمَّا السَّائِلَ فَلَا تَنْهَرْ", tr:"Ve emme's-sâile fe-lâ tenhar", de:"Bir şey isteyeni de sakın azarlama!"},
    {ar:"وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ", tr:"Ve emmâ bi-ni'meti rabbike fe-haddis", de:"Rabbinin nimetini anlat."}
  ]},
  { name:"İnşirâh Sûresi", note:"Ferahlık", num:94, ayat:[
    {ar:"أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ", tr:"Elem neşrah leke sadrek", de:"Biz senin göğsünü açıp genişletmedik mi?"},
    {ar:"وَوَضَعْنَا عَنكَ وِزْرَكَ", tr:"Ve veda'nâ anke vizrek", de:"Senin yükünü üzerinden kaldırmadık mı?"},
    {ar:"الَّذِي أَنقَضَ ظَهْرَكَ", tr:"Ellezî enkada zahrek", de:"O yük ki belini bükmüştü."},
    {ar:"وَرَفَعْنَا لَكَ ذِكْرَكَ", tr:"Ve rafa'nâ leke zikrek", de:"Senin şanını yüceltmedik mi?"},
    {ar:"فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", tr:"Fe-inne mea'l-usri yüsrâ", de:"Şüphesiz zorlukla beraber bir kolaylık vardır."},
    {ar:"إِنَّ مَعَ الْعُسْرِ يُسْرًا", tr:"İnne mea'l-usri yüsrâ", de:"Evet, zorlukla beraber bir kolaylık vardır."},
    {ar:"فَإِذَا فَرَغْتَ فَانصَبْ", tr:"Fe-izâ ferağte fensab", de:"Bir işi bitirince diğerine koyul."},
    {ar:"وَإِلَىٰ رَبِّكَ فَارْغَب", tr:"Ve ilâ rabbike ferğab", de:"Ve yalnız Rabbine yönel."}
  ]},
  { name:"Zilzâl Sûresi", note:"Sarsıntı", num:99, ayat:[
    {ar:"إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا", tr:"İzâ zülzileti'l-ardu zilzâlehâ", de:"Yer o şiddetli sarsıntısıyla sarsıldığında,"},
    {ar:"وَأَخْرَجَتِ الْأَرْضُ أَثْقَالَهَا", tr:"Ve ahraceti'l-ardu eskâlehâ", de:"Yer, içindeki ağırlıkları dışarı çıkardığında,"},
    {ar:"وَقَالَ الْإِنسَانُ مَا لَهَا", tr:"Ve kâle'l-insânu mâ lehâ", de:"İnsan \"Ona ne oluyor?\" dediğinde,"},
    {ar:"يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا", tr:"Yevmeizin tühaddisü ahbârehâ", de:"İşte o gün yer, haberlerini anlatır,"},
    {ar:"بِأَنَّ رَبَّكَ أَوْحَىٰ لَهَا", tr:"Bi-enne rabbeke evhâ lehâ", de:"Çünkü Rabbin ona böyle emretmiştir."},
    {ar:"يَوْمَئِذٍ يَصْدُرُ النَّاسُ أَشْتَاتًا لِّيُرَوْا أَعْمَالَهُمْ", tr:"Yevmeizin yasdürü'n-nâsu eştâten li-yürav a'mâlehüm", de:"O gün insanlar, yaptıkları kendilerine gösterilsin diye bölük bölük gelirler."},
    {ar:"فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ", tr:"Fe-men ya'mel miskâle zerratin hayran yerah", de:"Kim zerre kadar iyilik yaparsa onu görür."},
    {ar:"وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ", tr:"Ve men ya'mel miskâle zerratin şerran yerah", de:"Kim de zerre kadar kötülük yaparsa onu görür."}
  ]},
  { name:"Âdiyât Sûresi", note:"Koşan Atlar", num:100, ayat:[
    {ar:"وَالْعَادِيَاتِ ضَبْحًا", tr:"Ve'l-âdiyâti dabhâ", de:"Soluk soluğa koşan atlara andolsun,"},
    {ar:"فَالْمُورِيَاتِ قَدْحًا", tr:"Fe'l-mûriyâti kadhâ", de:"Ayaklarıyla kıvılcım çıkaranlara,"},
    {ar:"فَالْمُغِيرَاتِ صُبْحًا", tr:"Fe'l-muğîrâti subhâ", de:"Sabah vakti baskın yapanlara,"},
    {ar:"فَأَثَرْنَ بِهِ نَقْعًا", tr:"Fe-eserne bihî nak'â", de:"Orada tozu dumana katanlara,"},
    {ar:"فَوَسَطْنَ بِهِ جَمْعًا", tr:"Fe-vesatne bihî cem'â", de:"Ve bir topluluğun ortasına dalanlara andolsun ki,"},
    {ar:"إِنَّ الْإِنسَانَ لِرَبِّهِ لَكَنُودٌ", tr:"İnne'l-insâne li-rabbihî le-kenûd", de:"İnsan Rabbine karşı çok nankördür."},
    {ar:"وَإِنَّهُ عَلَىٰ ذَٰلِكَ لَشَهِيدٌ", tr:"Ve innehû alâ zâlike le-şehîd", de:"Kendisi de buna şahittir."},
    {ar:"وَإِنَّهُ لِحُبِّ الْخَيْرِ لَشَدِيدٌ", tr:"Ve innehû li-hubbi'l-hayri le-şedîd", de:"O, mal sevgisine çok düşkündür."},
    {ar:"أَفَلَا يَعْلَمُ إِذَا بُعْثِرَ مَا فِي الْقُبُورِ", tr:"Efelâ ya'lemü izâ bu'sira mâ fi'l-kubûr", de:"Bilmez mi ki kabirlerde olanlar dışarı çıkarıldığında,"},
    {ar:"وَحُصِّلَ مَا فِي الصُّدُورِ", tr:"Ve hussıle mâ fi's-sudûr", de:"Ve kalplerdekiler ortaya konduğunda,"},
    {ar:"إِنَّ رَبَّهُم بِهِمْ يَوْمَئِذٍ لَّخَبِيرٌ", tr:"İnne rabbehüm bihim yevmeizin le-habîr", de:"İşte o gün Rableri onların her hâlinden haberdardır."}
  ]},
  { name:"Kâria Sûresi", note:"Kapıyı Çalan", num:101, ayat:[
    {ar:"الْقَارِعَةُ", tr:"El-kâria", de:"Kapıyı çalan büyük olay!"},
    {ar:"مَا الْقَارِعَةُ", tr:"Me'l-kâria", de:"Nedir o kapıyı çalan?"},
    {ar:"وَمَا أَدْرَاكَ مَا الْقَارِعَةُ", tr:"Ve mâ edrâke me'l-kâria", de:"Onun ne olduğunu sen nereden bileceksin?"},
    {ar:"يَوْمَ يَكُونُ النَّاسُ كَالْفَرَاشِ الْمَبْثُوثِ", tr:"Yevme yekûnü'n-nâsu ke'l-ferâşi'l-mebsûs", de:"O gün insanlar etrafa yayılmış kelebekler gibi olur,"},
    {ar:"وَتَكُونُ الْجِبَالُ كَالْعِهْنِ الْمَنفُوشِ", tr:"Ve tekûnü'l-cibâlü ke'l-ihni'l-menfûş", de:"Dağlar da atılmış renkli yün gibi olur."},
    {ar:"فَأَمَّا مَن ثَقُلَتْ مَوَازِينُهُ", tr:"Fe-emmâ men sekulet mevâzînüh", de:"Kimin tartıları ağır gelirse,"},
    {ar:"فَهُوَ فِي عِيشَةٍ رَّاضِيَةٍ", tr:"Fe-hüve fî îşetin râdiye", de:"O, hoşnut olacağı bir hayat içinde olur."},
    {ar:"وَأَمَّا مَنْ خَفَّتْ مَوَازِينُهُ", tr:"Ve emmâ men haffet mevâzînüh", de:"Kimin de tartıları hafif gelirse,"},
    {ar:"فَأُمُّهُ هَاوِيَةٌ", tr:"Fe-ümmühû hâviye", de:"Onun yeri Hâviye'dir."},
    {ar:"وَمَا أَدْرَاكَ مَا هِيَهْ", tr:"Ve mâ edrâke mâ hiyeh", de:"Onun ne olduğunu sen nereden bileceksin?"},
    {ar:"نَارٌ حَامِيَةٌ", tr:"Nârun hâmiye", de:"O, kızgın bir ateştir."}
  ]},
  { name:"Tekâsür Sûresi", note:"Çokluk Yarışı", num:102, ayat:[
    {ar:"أَلْهَاكُمُ التَّكَاثُرُ", tr:"Elhâkümü't-tekâsür", de:"Çokluk yarışı sizi oyaladı,"},
    {ar:"حَتَّىٰ زُرْتُمُ الْمَقَابِرَ", tr:"Hattâ zürtümü'l-makâbir", de:"Kabirleri ziyaret edinceye kadar."},
    {ar:"كَلَّا سَوْفَ تَعْلَمُونَ", tr:"Kellâ sevfe ta'lemûn", de:"Hayır, yakında bileceksiniz!"},
    {ar:"ثُمَّ كَلَّا سَوْفَ تَعْلَمُونَ", tr:"Sümme kellâ sevfe ta'lemûn", de:"Yine hayır, yakında bileceksiniz!"},
    {ar:"كَلَّا لَوْ تَعْلَمُونَ عِلْمَ الْيَقِينِ", tr:"Kellâ lev ta'lemûne ilme'l-yakîn", de:"Hayır, kesin bir bilgiyle bilseydiniz,"},
    {ar:"لَتَرَوُنَّ الْجَحِيمَ", tr:"Le-teravünne'l-cahîm", de:"Cehennemi mutlaka görürdünüz."},
    {ar:"ثُمَّ لَتَرَوُنَّهَا عَيْنَ الْيَقِينِ", tr:"Sümme le-teravünnehâ ayne'l-yakîn", de:"Sonra onu gözünüzle kesin olarak göreceksiniz."},
    {ar:"ثُمَّ لَتُسْأَلُنَّ يَوْمَئِذٍ عَنِ النَّعِيمِ", tr:"Sümme le-tüs'elünne yevmeizin ani'n-naîm", de:"Sonra o gün nimetlerden sorguya çekileceksiniz."}
  ]},
  { name:"Hümeze Sûresi", note:"Çekiştiren", num:104, ayat:[
    {ar:"وَيْلٌ لِّكُلِّ هُمَزَةٍ لُّمَزَةٍ", tr:"Veylün li-külli hümezetin lümezeh", de:"Arkadan çekiştiren, alay eden herkesin vay hâline!"},
    {ar:"الَّذِي جَمَعَ مَالًا وَعَدَّدَهُ", tr:"Ellezî ceme'a mâlen ve addedeh", de:"O ki malı toplayıp tekrar tekrar sayar."},
    {ar:"يَحْسَبُ أَنَّ مَالَهُ أَخْلَدَهُ", tr:"Yahsebü enne mâlehû ahledeh", de:"Malının kendisini ölümsüz kılacağını sanır."},
    {ar:"كَلَّا لَيُنبَذَنَّ فِي الْحُطَمَةِ", tr:"Kellâ le-yünbezenne fi'l-hutame", de:"Hayır, o mutlaka Hutame'ye atılacaktır."},
    {ar:"وَمَا أَدْرَاكَ مَا الْحُطَمَةُ", tr:"Ve mâ edrâke me'l-hutame", de:"Hutame'nin ne olduğunu sen nereden bileceksin?"},
    {ar:"نَارُ اللَّهِ الْمُوقَدَةُ", tr:"Nârullâhi'l-mûkade", de:"O, Allah'ın tutuşturulmuş ateşidir,"},
    {ar:"الَّتِي تَطَّلِعُ عَلَى الْأَفْئِدَةِ", tr:"Elletî tettali'u ale'l-ef'ide", de:"Ki o, kalplerin ta içine işler."},
    {ar:"إِنَّهَا عَلَيْهِم مُّؤْصَدَةٌ", tr:"İnnehâ aleyhim mû'sade", de:"O ateş onların üzerine kapatılmıştır,"},
    {ar:"فِي عَمَدٍ مُّمَدَّدَةٍ", tr:"Fî amedin mümeddede", de:"Uzatılmış direkler içinde."}
  ]}
);
TOTAL_AYAT = SURAS.reduce((n,s)=> n + s.ayat.length, 0);

/* ============ More duas ============ */
DUA.push(
  {id:'ders',   t:'Ders Öncesi',     w:'Öğrenmeye başlarken', ar:'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي', ok:"Rabbi'şrah lî sadrî ve yessir lî emrî vahlul ukdeten min lisânî yefkahû kavlî", m:'Rabbim, gönlümü aç, işimi kolaylaştır, dilimdeki düğümü çöz ki sözümü anlasınlar.'},
  {id:'yagmur', t:'Yağmur Yağarken', w:'Yağmur başlayınca',   ar:'اللَّهُمَّ صَيِّبًا نَافِعًا', ok:"Allâhümme sayyiben nâfi'â", m:'Allah\'ım, faydalı bir yağmur yağdır.'},
  {id:'hasta',  t:'Hastaya Dua',     w:'Hasta birini görünce', ar:'لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ', ok:"Lâ be'se tahûrun inşâallâh", m:'Geçmiş olsun, inşallah bu hastalık seni temizler.'},
  {id:'yolculuk', t:'Yolculuk Duası', w:'Araca binince',      ar:'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ', ok:"Sübhânellezî sehhara lenâ hâzâ ve mâ künnâ lehû mukrinîn ve innâ ilâ rabbinâ le-munkalibûn", m:'Bunu hizmetimize veren Allah\'ı tesbih ederiz; biz buna güç yetiremezdik. Şüphesiz Rabbimize döneceğiz.'},
  {id:'camigir', t:'Camiye Girerken', w:'Camiye girince',     ar:'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ', ok:"Allâhümme'ftah lî ebvâbe rahmetik", m:'Allah\'ım, bana rahmet kapılarını aç.'},
  {id:'camicik', t:'Camiden Çıkarken', w:'Camiden çıkınca',   ar:'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ', ok:"Allâhümme innî es'elüke min fadlik", m:'Allah\'ım, senden lütfunu isterim.'},
  {id:'ayna',   t:'Aynaya Bakınca',  w:'Aynaya bakarken',     ar:'اللَّهُمَّ أَنْتَ حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي', ok:"Allâhümme ente hassente halkî fe-hassin hulukî", m:'Allah\'ım, yaratılışımı güzel yaptığın gibi ahlakımı da güzelleştir.'}
);

/* ============ Weak spots ============ */
// state.mistakes["letters:3"] = how often that item was answered wrong lately.
function recordMistake(kind, key){
  if(!kind || key === undefined) return;
  const k = kind+':'+key;
  state.mistakes[k] = Math.min(9, (state.mistakes[k] || 0) + 1);
  saveProgress();
}
function clearMistake(kind, key){
  const k = kind+':'+key;
  if(!state.mistakes[k]) return;
  state.mistakes[k]--;
  if(state.mistakes[k] <= 0) delete state.mistakes[k];
  saveProgress();
}
function weakItems(n){
  return Object.entries(state.mistakes).filter(([, c])=> c > 0).sort((a, b)=> b[1] - a[1]).slice(0, n).map(([k])=> k);
}
// Turns a weak key into a daily-lesson question (same shapes as buildDaily()).
function weakQuestion(k){
  const i = k.indexOf(':'), kind = k.slice(0, i), key = k.slice(i + 1);
  const names = idx=> [LETTERS[idx].name, ...shuffle(LETTERS.map((_, j)=> j).filter(j=> j !== idx)).slice(0, 3).map(j=> LETTERS[j].name)];
  if(kind === 'letters' && LETTERS[+key]) return {q:'🔁 Tekrar: Bu harfin adı nedir?', g:LETTERS[+key].g, correct:LETTERS[+key].name, options:names(+key), say:LETTERS[+key].ar, store:['letters', +key]};
  if(kind === 'forms' && LETTERS[+key]){
    const f = letterForms(LETTERS[+key].g);
    return {q:'🔁 Tekrar: Bu şekil hangi harf?', g:f[['ini','med','fin'][Math.floor(Math.random()*3)]], correct:LETTERS[+key].name, options:names(+key), say:LETTERS[+key].ar, store:['forms', +key]};
  }
  if(kind === 'syllables' && SYLLABLES[+key]){ const s = SYLLABLES[+key]; return {q:'🔁 Tekrar: Nasıl okunur?', g:s.g, correct:s.correct, options:s.options, store:['syllables', +key]}; }
  if(kind === 'lessons'){
    const dash = key.lastIndexOf('-'), L = LESSONS.find(x=> x.id === key.slice(0, dash)), it = L && L.items[+key.slice(dash + 1)];
    if(it) return {q:'🔁 Tekrar: '+L.title, g:it.g, correct:it.correct, options:it.options, store:['lessons', key]};
  }
  if(kind === 'listen' && LETTERS[+key]) return listenQuestion(+key, true);
  return null;
}
function weakLabel(k){
  const i = k.indexOf(':'), kind = k.slice(0, i), key = k.slice(i + 1);
  if((kind === 'letters' || kind === 'forms' || kind === 'listen') && LETTERS[+key]) return LETTERS[+key].g+' '+LETTERS[+key].name+(kind === 'forms' ? ' (şekil)' : kind === 'listen' ? ' (dinleme)' : '');
  if(kind === 'syllables' && SYLLABLES[+key]) return SYLLABLES[+key].g+' '+SYLLABLES[+key].correct;
  if(kind === 'lessons'){ const dash = key.lastIndexOf('-'), L = LESSONS.find(x=> x.id === key.slice(0, dash)), it = L && L.items[+key.slice(dash + 1)]; if(it) return it.g+' '+it.correct; }
  return k;
}

/* ============ Listening ============ */
EX_SETS.push(['e', ()=> LETTERS.map((_, i)=> String(i))]);
// Plays a parent's recording of the letter if there is one, otherwise the device voice.
function playLetterSound(i){
  const L = LETTERS[i];
  const url = typeof voiceUrls !== 'undefined' && voiceUrls['l:'+L.g];
  if(url){ stopAudio(); const a = new Audio(url); currentAudio = a; a.play().catch(()=> speakArabic(L.ar)); }
  else speakArabic(L.ar);
}
function listenQuestion(i, weak){
  const others = shuffle(LETTERS.map((_, j)=> j).filter(j=> j !== i)).slice(0, 3);
  return {q:(weak ? '🔁 Tekrar: ' : '')+'Dinle! Hangi harf?', listen:i, correct:LETTERS[i].g, options:[LETTERS[i].g, ...others.map(j=> LETTERS[j].g)], arOpts:true, store:['extra', 'e:'+i], mistake:['listen', i]};
}
let listenQ = null;
function nextListen(){
  const open = LETTERS.map((_, i)=> i).filter(i=> !state.extra['e:'+i]);
  const pool = open.length && Math.random() < .7 ? open : LETTERS.map((_, i)=> i);
  listenQ = Object.assign(listenQuestion(pool[Math.floor(Math.random()*pool.length)]), {locked:false});
  renderListen();
  setTimeout(()=> playLetterSound(listenQ.listen), 350);
}
function renderListen(){
  const el = document.getElementById('content-listen');
  if(!el) return;
  if(!listenQ){ nextListen(); return; }
  const done = LETTERS.filter((_, i)=> state.extra['e:'+i]).length;
  el.innerHTML = `<p class="tab-hint">Hoparlöre dokun, harfin adını dinle ve doğru harfi seç! (${done}/${LETTERS.length} ⭐)</p>
    ${typeof arabicVoice !== 'undefined' && !arabicVoice ? '<p class="ex-tip">💡 Bu cihazda Arapça ses yok. Ses iyi değilse ebeveyn, Şekiller bölümünde harfi kendi sesiyle kaydedebilir; burada o kayıt çalınır.</p>' : ''}
    <div class="quiz-box"><button type="button" class="listen-btn" onclick="playLetterSound(${listenQ.listen})" aria-label="Tekrar dinle">🔊</button>
      <div class="quiz-options sim-options listen-options">${shuffle(listenQ.options.slice()).map(o=> `<button type="button" class="quiz-opt arabic" onclick="answerListen(this,'${o}')">${o}</button>`).join('')}</div>
      <div class="quiz-feedback" id="listenFb"></div></div>`;
}
function answerListen(btn, o){
  if(listenQ.locked) return;
  const i = listenQ.listen;
  if(o === LETTERS[i].g){
    listenQ.locked = true;
    btn.classList.add('correct');
    celebrate(btn);
    document.getElementById('listenFb').textContent = randomPraise()+' Bu '+LETTERS[i].name+'.';
    clearMistake('listen', i);
    if(!state.extra['e:'+i]){ state.extra['e:'+i] = true; updateHeader(); }
    setTimeout(nextListen, 1300);
  }else{
    btn.classList.add('wrong');
    btn.disabled = true;
    if(typeof feedbackWrong === 'function') feedbackWrong(btn);
    recordMistake('listen', i);
    document.getElementById('listenFb').textContent = 'Tekrar dinle! 🔊';
    setTimeout(()=> playLetterSound(i), 400);
  }
}

/* ============ Ezber mode ============ */
let ezber = null;
function openEzber(si){
  ezber = {si, level:1, shown:{}};
  if(currentStage) document.getElementById('panel-'+currentStage).classList.remove('open');
  currentStage = null;
  renderEzber();
  openStage('ezber');
}
const EZBER_LEVELS = ['Hepsi görünüyor', 'Biraz gizli', 'Yarısı gizli', 'Çoğu gizli', 'Hepsi gizli'];
function ezberHidden(level, ai, wi){
  if(level <= 0) return false;
  if(level >= 4) return true;
  return ((wi * 7 + ai * 3) % 4) < level;
}
function renderEzber(){
  const el = document.getElementById('exbody-ezber');
  if(!el || !ezber) return;
  const s = SURAS[ezber.si];
  el.innerHTML = `<div class="ex-card ezber-head"><b>${s.name}</b>
      <div class="ezber-level">${EZBER_LEVELS.map((_, l)=> `<i class="${l <= ezber.level ? 'on' : ''}"></i>`).join('')}</div>
      <span class="ex-sub">Seviye ${ezber.level + 1}/5 · ${EZBER_LEVELS[ezber.level]}</span>
      <div class="ex-row ex-nav"><button class="voice-btn ghost" type="button" ${ezber.level === 0 ? 'disabled' : ''} onclick="ezber.level--;ezber.shown={};renderEzber()">‹ Daha kolay</button>
      <button class="voice-btn" type="button" ${ezber.level === 4 ? 'disabled' : ''} onclick="ezber.level++;ezber.shown={};renderEzber()">Daha zor ›</button></div></div>
    <p class="tab-hint">Âyetleri ezberden oku. Gizli kelimeyi göremezsen üstüne dokun. 🔊 ile kâriyi dinle.</p>
    ${s.ayat.map((a, ai)=> `<div class="ayah ezber-ayah"><div class="ayah-row"><button class="play-btn" type="button" onclick="playAyah(${ezber.si},${ai})" aria-label="Âyeti dinle">🔊</button>
      <div class="arabic ezber-text">${a.ar.split(' ').map((w, wi)=> ezberHidden(ezber.level, ai, wi) && !ezber.shown[ai+'-'+wi]
        ? `<button type="button" class="ezber-gap" onclick="ezber.shown['${ai}-${wi}']=1;renderEzber()" aria-label="Kelimeyi göster">${'ـ'.repeat(Math.max(3, Math.min(8, w.length / 2 | 0)))}</button>`
        : `<span class="ezber-word ${ezber.shown[ai+'-'+wi] ? 'peeked' : ''}">${w}</span>`).join(' ')}</div></div></div>`).join('')}
    ${ezber.level === 4 ? `<div class="ex-card ex-center"><b>Hepsini ezberden okuyabildin mi?</b><p class="ex-sub">Bir büyüğüne dinlet, sonra işaretle.</p>
      <button class="ex-learn" type="button" onclick="finishEzber(this)">✅ Bu sûreyi ezbere okudum</button></div>` : ''}
    <button class="voice-btn ghost" type="button" onclick="closeStage();openStage('suras')">‹ Sûrelere dön</button>`;
}
function finishEzber(btn){
  const si = ezber.si;
  SURAS[si].ayat.forEach((_, ai)=>{
    state.suraAyat[si+'-'+ai] = true;
    const c = document.getElementById('check-'+si+'-'+ai);
    if(c) c.checked = true;
  });
  updateSuraCount(si);
  celebrate(btn);
  if(typeof playSfx === 'function') playSfx('win');
  showToast(SURAS[si].name+' ezberlendi! Maşallah! 🏅');
  updateHeader();
}
function addEzberButtons(){
  SURAS.forEach((_, si)=>{
    const t = document.querySelector('#sura-'+si+' .sura-title');
    if(!t || t.querySelector('.ezber-btn')) return;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'play-all-btn ezber-btn';
    b.textContent = '🧠 Ezber';
    b.onclick = e=>{ e.stopPropagation(); openEzber(si); };
    t.querySelector('.play-all-btn').before(b);
  });
}

/* ============ Tecvid ============ */
const TECVID = [
  {id:'gunne', name:'Gunne', icon:'👃', text:'Şeddeli ن ve م okunurken ses bir miktar burundan (genizden) çıkarılır ve biraz bekletilir.', ex:[['إِنَّ','inne'],['ثُمَّ','sümme'],['مِنَ الْجِنَّةِ','mine\'l-cinneti']]},
  {id:'kalkale', name:'Kalkale', icon:'🔔', text:'Sakin (cezimli) ق ط ب ج د harfleri sallanarak, yankılanır gibi okunur. Kolay hatırlamak için: قُطْبُ جَدٍّ.', ex:[['لَمْ يَلِدْ','lem yelid'],['الْفَلَقْ','el-felak'],['أَحَدْ','ehad']]},
  {id:'tabii', name:'Medd-i Tabîî', icon:'➡️', text:'Uzatma harfi (ا و ي) kendinden önceki harekeyle gelirse ses bir elif miktarı uzatılır.', ex:[['قَالَ','kâle'],['قِيلَ','kîle'],['يَقُولُ','yekûlü']]},
  {id:'muttasil', name:'Medd-i Muttasıl', icon:'⏩', text:'Uzatma harfinden sonra aynı kelimede hemze (ء) gelirse ses daha uzun uzatılır.', ex:[['جَاءَ','câe'],['السَّمَاءِ','es-semâi'],['سُوءَ','sûe']]},
  {id:'izhar', name:'İzhâr', icon:'💡', text:'Sakin ن veya tenvinden sonra boğaz harflerinden biri (ء ه ع ح غ خ) gelirse ن açıkça okunur.', ex:[['مَنْ آمَنَ','men âmene'],['مِنْ خَوْفٍ','min havf'],['عَلِيمٌ حَكِيمٌ','alîmün hakîm']]},
  {id:'ihfa', name:'İhfâ', icon:'🫥', text:'Sakin ن veya tenvinden sonra ihfâ harflerinden biri gelirse ن genizden, gizli okunur.', ex:[['أَنْتُمْ','entüm'],['مِنْ شَرِّ','min şerri'],['يَنْصُرُ','yensuru']]},
  {id:'iklab', name:'İklâb', icon:'🔄', text:'Sakin ن veya tenvinden sonra ب gelirse ن, م sesine döner ve genizden okunur.', ex:[['مِنْ بَعْدِ','mim ba\'di'],['أَنْبِئْهُمْ','embi\'hüm'],['سَمِيعٌ بَصِيرٌ','semî\'um basîr']]},
  {id:'idgam', name:'İdğâm', icon:'🤝', text:'Sakin ن veya tenvinden sonra ي ن م و gelirse ن okunmaz, sonraki harfe katılır ve genizden okunur.', ex:[['مَنْ يَقُولُ','mey yekûlü'],['خَيْرًا يَرَهُ','hayray yerah'],['مِنْ وَالٍ','miv vâl']]}
];
EX_SETS.push(['t', ()=> TECVID.map(r=> r.id)]);
let tecvidQ = null;
function nextTecvid(){
  const r = TECVID[Math.floor(Math.random()*TECVID.length)];
  const ex = r.ex[Math.floor(Math.random()*r.ex.length)];
  const others = shuffle(TECVID.filter(x=> x.id !== r.id)).slice(0, 2);
  tecvidQ = {rule:r, ex, options:shuffle([r, ...others]), locked:false};
}
function renderTecvid(){
  const el = document.getElementById('exbody-tecvid');
  if(!el) return;
  if(!tecvidQ) nextTecvid();
  const done = TECVID.filter(r=> state.extra['t:'+r.id]).length;
  el.innerHTML = `<p class="tab-hint">Kur'an'ı güzel okumanın kuralları. Örneklere dokun ve dinle, sonra aşağıdaki soruyu çöz! (${done}/${TECVID.length} ⭐)</p>
    ${TECVID.map(r=> `<div class="ex-item tecvid-rule ${state.extra['t:'+r.id] ? 'learned' : ''}"><div class="ex-item-head"><span class="ex-num">${state.extra['t:'+r.id] ? '✓' : r.icon}</span><span class="ex-grow"><b>${r.name}</b><span class="ex-sub">${r.text}</span></span></div>
      <div class="chips tecvid-ex">${r.ex.map(([ar, tr])=> `<button type="button" class="example-chip" onclick="speakArabic('${ar}')"><span class="arabic">${ar}</span><span>${tr}</span></button>`).join('')}</div></div>`).join('')}
    <h3 class="sub-title">Bu kelimede hangi kural var?</h3>
    <div class="quiz-box"><div class="quiz-glyph arabic">${tecvidQ.ex[0]}</div>
      <div class="quiz-options">${tecvidQ.options.map(o=> `<button type="button" class="quiz-opt" onclick="answerTecvid(this,'${o.id}')">${o.icon} ${o.name}</button>`).join('')}</div>
      <div class="quiz-feedback" id="tecvidFb"></div></div>`;
}
function answerTecvid(btn, id){
  if(tecvidQ.locked) return;
  if(id === tecvidQ.rule.id){
    tecvidQ.locked = true;
    btn.classList.add('correct');
    celebrate(btn);
    speakArabic(tecvidQ.ex[0]);
    document.getElementById('tecvidFb').textContent = randomPraise();
    if(!state.extra['t:'+id]){ state.extra['t:'+id] = true; updateHeader(); }
    setTimeout(()=>{ nextTecvid(); renderTecvid(); }, 1400);
  }else{
    btn.classList.add('wrong');
    btn.disabled = true;
    if(typeof feedbackWrong === 'function') feedbackWrong(btn);
    document.getElementById('tecvidFb').textContent = 'İpucu: '+tecvidQ.rule.text;
  }
}

/* ============ Certificates ============ */
function certAchievements(){
  const list = [];
  list.push({id:'elifbe', title:'Elifbe\'yi tamamladı', sub:'28 Arapça harfi öğrendi', ok: countTrue(state.letters) >= LETTERS.length});
  list.push({id:'hece', title:'Hece Ustası oldu', sub:'Harekeli heceleri okumayı öğrendi', ok: countTrue(state.syllables) >= SYLLABLES.length});
  SURAS.forEach((s, si)=> list.push({id:'s'+si, title:'Ezberledi: '+s.name, sub:'Bütün âyetleri ezbere okudu', ok: s.ayat.every((_, ai)=> state.suraAyat[si+'-'+ai])}));
  list.push({id:'dua', title:'Dua Eri oldu', sub:'10 duayı ezberledi', ok: exCount('d') >= 10});
  list.push({id:'esma', title:'Esmâ\'ül Hüsnâ\'yı öğrendi', sub:'Allah\'ın 99 güzel ismini öğrendi', ok: exCount('n') >= 99});
  list.push({id:'all', title:'Bütün yolculuğu tamamladı', sub:'Hümanur\'un Kur\'an Yolculuğu\'nun sonuna ulaştı', ok: (()=>{ const t = totalStars(); return t.total >= t.max; })()});
  return list.filter(a=> a.ok).concat(list.filter(a=> !a.ok));
}
let certSel = null;
function certName(){ return (typeof settings !== 'undefined' && settings.childName) || 'Hümanur'; }
function renderCert(){
  const el = document.getElementById('exbody-belge');
  if(!el) return;
  const list = certAchievements(), got = list.filter(a=> a.ok);
  if(!certSel || !got.some(a=> a.id === certSel)) certSel = got.length ? got[0].id : null;
  el.innerHTML = `<p class="tab-hint">Bir başarı seç, belgeyi indir veya yazdır. Henüz kazanılmayanlarda 🔒 var.</p>
    <div class="chips cert-list">${list.map(a=> `<button type="button" class="chip ${a.ok ? (a.id === certSel ? 'on' : '') : 'locked-chip'}" ${a.ok ? `onclick="certSel='${a.id}';renderCert()"` : 'disabled'}>${a.ok ? '🏅' : '🔒'} ${a.title}</button>`).join('')}</div>
    <label class="cert-name"><b>İsim</b><input class="ex-input" maxlength="30" value="${escHtml(certName())}" onchange="settings.childName=this.value.trim()||'Hümanur';saveSettings();renderCert()"></label>
    ${certSel ? `<div class="cert-wrap" id="certImg"><canvas id="certCanvas" width="1200" height="850"></canvas></div>
      <div class="ex-row ex-nav"><button class="ex-learn" type="button" onclick="downloadCert()">📥 İndir</button><button class="voice-btn ghost" type="button" onclick="printCert()">🖨️ Yazdır</button></div>`
      : '<div class="ex-card ex-center"><div class="ex-level">🌱</div><p>Çalışmaya devam! İlk belgen Elifbe\'yi bitirince açılacak.</p></div>'}`;
  if(certSel) drawCert(list.find(a=> a.id === certSel));
}
async function drawCert(a){
  const c = document.getElementById('certCanvas');
  if(!c) return;
  try{ await Promise.all(['48px Lalezar', '700 30px "Baloo 2"', '40px "Scheherazade New"'].map(f=> document.fonts.load(f))); }catch(e){}
  const x = c.getContext('2d'), W = c.width, H = c.height;
  x.fillStyle = '#FBF3E7'; x.fillRect(0, 0, W, H);
  // Iznik tile border
  for(let i = 0; i < W; i += 60){ tileAt(x, i, 0); tileAt(x, i, H - 40); }
  for(let j = 40; j < H - 40; j += 60){ tileAt(x, 0, j, true); tileAt(x, W - 40, j, true); }
  x.strokeStyle = '#CC9A3C'; x.lineWidth = 6; x.strokeRect(60, 60, W - 120, H - 120);
  x.strokeStyle = '#1F4E9C'; x.lineWidth = 2; x.strokeRect(74, 74, W - 148, H - 148);
  ['🌷'].forEach(t=>{ x.font = '44px serif'; x.textAlign = 'center'; [[100, 120], [W - 100, 120], [100, H - 90], [W - 100, H - 90]].forEach(([px, py])=> x.fillText(t, px, py)); });
  x.textAlign = 'center';
  x.fillStyle = '#CC9A3C'; x.font = '64px serif'; x.fillText('☾', W/2, 150);
  x.fillStyle = '#0F5C56'; x.font = '40px "Scheherazade New"'; x.fillText('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', W/2, 210);
  x.fillStyle = '#1F4E9C'; x.font = '72px Lalezar'; x.fillText('Başarı Belgesi', W/2, 300);
  x.fillStyle = '#4B5B54'; x.font = '600 28px "Baloo 2"'; x.fillText('Sevgili', W/2, 360);
  x.fillStyle = '#0F3B37'; x.font = '84px Lalezar'; x.fillText(certName(), W/2, 450);
  x.strokeStyle = '#CC9A3C'; x.lineWidth = 2; x.beginPath(); x.moveTo(W/2 - 260, 475); x.lineTo(W/2 + 260, 475); x.stroke();
  x.fillStyle = '#0F5C56'; x.font = '700 40px "Baloo 2"'; wrapText(x, a.title + '!', W/2, 540, 900, 48);
  x.fillStyle = '#4B5B54'; x.font = '600 26px "Baloo 2"'; x.fillText(a.sub, W/2, 640);
  x.fillStyle = '#CC9A3C'; x.font = '700 30px "Baloo 2"'; x.fillText('Maşallah! Tebrikler! ⭐', W/2, 690);
  x.fillStyle = '#4B5B54'; x.font = '600 22px "Baloo 2"';
  x.fillText(new Date().toLocaleDateString('tr-TR', {day:'numeric', month:'long', year:'numeric'}), W/2, 735);
  x.textAlign = 'left'; x.fillText('Annesi / Babası', 150, 735); x.textAlign = 'right'; x.fillText('Hocası', W - 150, 735);
  x.strokeStyle = '#4B5B54'; x.lineWidth = 1;
  x.beginPath(); x.moveTo(150, 715); x.lineTo(380, 715); x.moveTo(W - 380, 715); x.lineTo(W - 150, 715); x.stroke();
}
function tileAt(x, px, py, vertical){
  x.save(); x.translate(px, py);
  x.fillStyle = '#F7F3EA'; x.fillRect(0, 0, vertical ? 40 : 60, vertical ? 60 : 40);
  x.fillStyle = '#1F4E9C';
  const cx = vertical ? 20 : 30, cy = vertical ? 30 : 20;
  x.beginPath(); x.moveTo(cx, cy - 12); x.quadraticCurveTo(cx - 10, cy - 8, cx - 8, cy + 4); x.quadraticCurveTo(cx, cy + 10, cx + 8, cy + 4); x.quadraticCurveTo(cx + 10, cy - 8, cx, cy - 12); x.fill();
  x.fillStyle = '#D1495B'; x.beginPath(); x.arc(cx, cy - 2, 3, 0, Math.PI * 2); x.fill();
  x.fillStyle = '#2A9D8F'; x.fillRect(cx - 1, cy + 6, 2, 8);
  x.restore();
}
function wrapText(x, text, cx, y, maxW, lh){
  const words = text.split(' '); let line = '';
  for(const w of words){
    const t = line ? line + ' ' + w : w;
    if(x.measureText(t).width > maxW && line){ x.fillText(line, cx, y); line = w; y += lh; }
    else line = t;
  }
  x.fillText(line, cx, y);
}
function downloadCert(){
  const c = document.getElementById('certCanvas');
  if(!c) return;
  c.toBlob(b=>{
    const a = document.createElement('a');
    a.href = URL.createObjectURL(b);
    a.download = 'basari-belgesi-' + certSel + '.png';
    document.body.appendChild(a); a.click();
    setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    showToast('Belge indirildi 📥');
  }, 'image/png');
}
function printCert(){
  const c = document.getElementById('certCanvas');
  if(!c) return;
  let img = document.getElementById('certPrint');
  if(!img){ img = document.createElement('img'); img.id = 'certPrint'; img.alt = 'Başarı belgesi'; document.body.appendChild(img); }
  img.src = c.toDataURL('image/png');
  document.body.classList.add('print-cert');
  const done = ()=>{ document.body.classList.remove('print-cert'); window.removeEventListener('afterprint', done); };
  window.addEventListener('afterprint', done);
  setTimeout(()=> window.print(), 100);
}

/* ============ Panels + start-up ============ */
function initMore(){
  const map = document.getElementById('mapView'), main = document.querySelector('main');
  [
    {id:'tecvid', icon:'🎼', title:'Tecvid',        desc:'Güzel okumanın kuralları', render:renderTecvid},
    {id:'belge',  icon:'📜', title:'Belgelerim',    desc:'Başarı belgeleri: indir veya yazdır', render:renderCert},
    {id:'ezber',  icon:'🧠', title:'Ezber Modu',    desc:'Kelimeler yavaş yavaş gizlenir', render:renderEzber}
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
  // Listening tab in Elifbe
  const lp = document.getElementById('panel-letters'), bar = lp && lp.querySelector('.tabbar');
  if(bar && !document.getElementById('tab-listen')){
    const quizTab = document.getElementById('tab-quiz');
    quizTab.insertAdjacentHTML('afterend', `<button class="tab-btn" id="tab-listen" onclick="switchTab('listen')">Dinle</button>`);
    lp.insertAdjacentHTML('beforeend', '<div class="tab-content" id="content-listen"></div>');
    LETTER_TABS.push('listen');
    const _switch = switchTab;
    switchTab = function(tab){ _switch(tab); if(tab === 'listen'){ listenQ = null; renderListen(); } };
  }
  addEzberButtons();
  const _open = openStage;
  openStage = function(stage){
    if(stage === 'tecvid'){ tecvidQ = null; renderTecvid(); }
    if(stage === 'belge') renderCert();
    if(stage === 'ezber') renderEzber();
    _open(stage);
  };
}
