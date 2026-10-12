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
  ]},
  { name:"Fîl Sûresi", note:"Fil", num:105, ayat:[
    {ar:"أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ", tr:"Elem tera keyfe fe'ale rabbüke bi-ashâbi'l-fîl", de:"Rabbinin fil sahiplerine ne yaptığını görmedin mi?"},
    {ar:"أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ", tr:"Elem yec'al keydehüm fî tadlîl", de:"Onların tuzaklarını boşa çıkarmadı mı?"},
    {ar:"وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ", tr:"Ve ersele aleyhim tayran ebâbîl", de:"Üzerlerine sürü sürü kuşlar gönderdi."},
    {ar:"تَرْمِيهِمْ بِحِجَارَةٍ مِنْ سِجِّيلٍ", tr:"Termîhim bi-hicâratin min siccîl", de:"O kuşlar onlara pişmiş çamurdan taşlar atıyordu."},
    {ar:"فَجَعَلَهُمْ كَعَصْفٍ مَأْكُولٍ", tr:"Fe ce'alehüm ke'asfin me'kûl", de:"Sonunda onları yenmiş ekin yaprağı gibi yaptı."}
  ]},
  { name:"Kureyş Sûresi", note:"Kureyş", num:106, ayat:[
    {ar:"لِإِيلَافِ قُرَيْشٍ", tr:"Li-îlâfi Kureyş", de:"Kureyş'i alıştırdığı için,"},
    {ar:"إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ", tr:"Îlâfihim rıhlete'ş-şitâi ve's-sayf", de:"Onları kış ve yaz yolculuğuna alıştırdığı için,"},
    {ar:"فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ", tr:"Felya'büdû rabbe hâze'l-beyt", de:"Bu evin (Kâbe'nin) Rabbine kulluk etsinler."},
    {ar:"الَّذِي أَطْعَمَهُمْ مِنْ جُوعٍ وَآمَنَهُمْ مِنْ خَوْفٍ", tr:"Ellezî et'amehüm min cû'in ve âmenehüm min havf", de:"O, onları açlıktan doyurdu ve korkudan emin kıldı."}
  ]},
  { name:"Mâûn Sûresi", note:"Yardım", num:107, ayat:[
    {ar:"أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ", tr:"Era'eytellezî yükezzibü bi'd-dîn", de:"Hesap gününü yalanlayanı gördün mü?"},
    {ar:"فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ", tr:"Fezâlike'llezî yedu'ü'l-yetîm", de:"İşte o, yetimi itip kakar,"},
    {ar:"وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ", tr:"Ve lâ yehuddu alâ ta'âmi'l-miskîn", de:"Yoksulu doyurmaya teşvik etmez."},
    {ar:"فَوَيْلٌ لِلْمُصَلِّينَ", tr:"Fe veylün li'l-musallîn", de:"Vay hâline o namaz kılanların ki,"},
    {ar:"الَّذِينَ هُمْ عَنْ صَلَاتِهِمْ سَاهُونَ", tr:"Ellezîne hüm an salâtihim sâhûn", de:"Onlar namazlarını önemsemezler,"},
    {ar:"الَّذِينَ هُمْ يُرَاءُونَ", tr:"Ellezîne hüm yürâûn", de:"Onlar gösteriş yaparlar,"},
    {ar:"وَيَمْنَعُونَ الْمَاعُونَ", tr:"Ve yemne'ûne'l-mâ'ûn", de:"Ve en küçük yardımı bile esirgerler."}
  ]},
  { name:"Kâfirûn Sûresi", note:"İnkâr Edenler", num:109, ayat:[
    {ar:"قُلْ يَا أَيُّهَا الْكَافِرُونَ", tr:"Kul yâ eyyühe'l-kâfirûn", de:"De ki: Ey inkâr edenler!"},
    {ar:"لَا أَعْبُدُ مَا تَعْبُدُونَ", tr:"Lâ a'büdü mâ ta'büdûn", de:"Ben sizin taptıklarınıza tapmam."},
    {ar:"وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ", tr:"Ve lâ entüm âbidûne mâ a'büd", de:"Siz de benim taptığıma tapacak değilsiniz."},
    {ar:"وَلَا أَنَا عَابِدٌ مَا عَبَدْتُمْ", tr:"Ve lâ ene âbidün mâ abedtüm", de:"Ben de sizin taptıklarınıza tapacak değilim."},
    {ar:"وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ", tr:"Ve lâ entüm âbidûne mâ a'büd", de:"Siz de benim taptığıma tapacak değilsiniz."},
    {ar:"لَكُمْ دِينُكُمْ وَلِيَ دِينِ", tr:"Leküm dînüküm ve liye dîn", de:"Sizin dininiz size, benim dinim bana."}
  ]},
  { name:"Nasr Sûresi", note:"Yardım ve Zafer", num:110, ayat:[
    {ar:"إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ", tr:"İzâ câe nasrullâhi ve'l-feth", de:"Allah'ın yardımı ve fetih geldiğinde,"},
    {ar:"وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا", tr:"Ve raeyte'n-nâse yedhulûne fî dînillâhi efvâcâ", de:"Ve insanların bölük bölük Allah'ın dinine girdiğini gördüğünde,"},
    {ar:"فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ إِنَّهُ كَانَ تَوَّابًا", tr:"Fe sebbih bi-hamdi rabbike vestağfirh, innehû kâne tevvâbâ", de:"Rabbini överek tesbih et ve O'ndan bağışlanma dile. Çünkü O, tövbeleri çok kabul edendir."}
  ]},
  { name:"Tebbet Sûresi", note:"Mesed", num:111, ayat:[
    {ar:"تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ", tr:"Tebbet yedâ ebî lehebin ve tebb", de:"Ebû Leheb'in elleri kurusun! Kurudu da."},
    {ar:"مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ", tr:"Mâ ağnâ anhü mâlühû ve mâ keseb", de:"Malı ve kazandıkları ona fayda vermedi."},
    {ar:"سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ", tr:"Seyaslâ nâran zâte leheb", de:"O, alevli bir ateşe girecektir."},
    {ar:"وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ", tr:"Vemraetühû hammâlete'l-hatab", de:"Odun taşıyıcı olarak karısı da."},
    {ar:"فِي جِيدِهَا حَبْلٌ مِنْ مَسَدٍ", tr:"Fî cîdihâ hablün min mesed", de:"Boynunda hurma lifinden bir ip olduğu hâlde."}
  ]}
];
const TOTAL_AYAT = SURAS.reduce((n,s)=> n + s.ayat.length, 0);

// Letters that never connect to the following letter.
const NON_CONNECTORS = new Set(["ا","د","ذ","ر","ز","و"]);
const TATWEEL = "\u0640";
function letterForms(g){
  if(NON_CONNECTORS.has(g)) return {iso:g, ini:g, med:TATWEEL+g, fin:TATWEEL+g};
  return {iso:g, ini:g+TATWEEL, med:TATWEEL+g+TATWEEL, fin:TATWEEL+g};
}
const FORM_LABELS = [["iso","Tek başına"],["ini","Başta"],["med","Ortada"],["fin","Sonda"]];

const LESSONS = [
  { id:"tenvin", title:"Tenvin", sign:"بً  بٍ  بٌ",
    text:"İki üstün, iki esre veya iki ötre harfin sonuna bir \"n\" sesi ekler.",
    examples:[["بً","ban"],["بٍ","bin"],["بٌ","bun"]],
    items:[
      {g:"بً", correct:"ban", options:["ban","bin","bun","ba"]},
      {g:"بٍ", correct:"bin", options:["bin","ban","bi","bun"]},
      {g:"بٌ", correct:"bun", options:["bun","bu","ban","bin"]},
      {g:"تً", correct:"tan", options:["tan","ta","tin","tun"]},
      {g:"مٍ", correct:"min", options:["min","mi","man","mun"]},
      {g:"نٌ", correct:"nun", options:["nun","nu","nan","nin"]}
    ]},
  { id:"cezm", title:"Cezm", sign:"بْ",
    text:"Cezimli harf harekesiz, kısa okunur ve kendinden önceki harfle birleşir.",
    examples:[["أَبْ","ab"],["إِبْ","ib"],["أُبْ","ub"]],
    items:[
      {g:"أَبْ", correct:"ab", options:["ab","ba","ib","ub"]},
      {g:"إِبْ", correct:"ib", options:["ib","bi","ab","ub"]},
      {g:"أُبْ", correct:"ub", options:["ub","bu","ab","ib"]},
      {g:"مِنْ", correct:"min", options:["min","mi","nim","man"]},
      {g:"لَمْ", correct:"lam", options:["lam","la","mal","lim"]},
      {g:"قُلْ", correct:"kul", options:["kul","ku","kal","luk"]}
    ]},
  { id:"sedde", title:"Şedde", sign:"بّ",
    text:"Şeddeli harf iki kere okunur: önce cezimli, sonra harekeli (ab-ba).",
    examples:[["أَبَّ","abba"],["إِبِّ","ibbi"],["أُبُّ","ubbu"]],
    items:[
      {g:"أَبَّ", correct:"abba", options:["abba","aba","ab","ibbi"]},
      {g:"إِبِّ", correct:"ibbi", options:["ibbi","ibi","ib","abba"]},
      {g:"أُبُّ", correct:"ubbu", options:["ubbu","ubu","ub","ibbi"]},
      {g:"رَبِّ", correct:"rabbi", options:["rabbi","rabi","rab","rubbu"]},
      {g:"إِنَّ", correct:"inna", options:["inna","ina","in","unna"]},
      {g:"ثُمَّ", correct:"summa", options:["summa","suma","sum","samma"]}
    ]},
  { id:"med", title:"Med (Uzatma)", sign:"بَا  بِي  بُو",
    text:"Üstünden sonra elif (ا), esreden sonra ye (ي), ötreden sonra vav (و) gelirse ses uzatılır.",
    examples:[["بَا","bâ"],["بِي","bî"],["بُو","bû"]],
    items:[
      {g:"بَا", correct:"bâ", options:["bâ","ba","bî","bû"]},
      {g:"بِي", correct:"bî", options:["bî","bi","bâ","bû"]},
      {g:"بُو", correct:"bû", options:["bû","bu","bâ","bî"]},
      {g:"نَا", correct:"nâ", options:["nâ","na","nî","nû"]},
      {g:"مِي", correct:"mî", options:["mî","mi","mâ","mû"]},
      {g:"نُو", correct:"nû", options:["nû","nu","nâ","nî"]}
    ]}
];
const LESSON_ITEM_COUNT = LESSONS.reduce((n,l)=> n + l.items.length, 0);
const PAGE_COUNT = 10;

const state = { letters:{}, forms:{}, trace:{}, syllables:{}, lessons:{}, suraAyat:{}, pages:{} };
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
  Object.keys(state).forEach(k=>{
    if(saved[k] && typeof saved[k] === 'object') Object.assign(state[k], saved[k]);
  });
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

const STAGE1_MAX = LETTERS.length * 3; // cards + forms + tracing

function totalStars(){
  const l = countTrue(state.letters);
  const f = countTrue(state.forms);
  const t = countTrue(state.trace);
  const s = countTrue(state.syllables);
  const d = countTrue(state.lessons);
  const q = countTrue(state.suraAyat);
  const p = countTrue(state.pages);
  return {l,f,t,s,d,q,p, stage1:l+f+t, total:l+f+t+s+d+q+p,
    max: STAGE1_MAX + SYLLABLES.length + LESSON_ITEM_COUNT + TOTAL_AYAT + PAGE_COUNT};
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
  const {l,s,d,q,p,stage1} = totalStars();
  document.getElementById('stars-letters').textContent = stage1+' / '+STAGE1_MAX+' ★';
  document.getElementById('stars-syllables').textContent = s+' / '+SYLLABLES.length+' ★';
  document.getElementById('stars-lessons').textContent = d+' / '+LESSON_ITEM_COUNT+' ★';
  document.getElementById('stars-suras').textContent = q+' / '+TOTAL_AYAT+' ★';
  document.getElementById('stars-pages').textContent = p+' / '+PAGE_COUNT+' ★';
  setLock('syllables', l/LETTERS.length < 0.3);
  setLock('lessons', s/SYLLABLES.length < 0.3);
  setLock('suras', s/SYLLABLES.length < 0.3);
  setLock('pages', q < 7);

  // Highlight the stage the child should work on next.
  const progress = {letters:stage1/STAGE1_MAX, syllables:s/SYLLABLES.length, lessons:d/LESSON_ITEM_COUNT, suras:q/TOTAL_AYAT, pages:p/PAGE_COUNT};
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

const LETTER_TABS = ['cards','forms','trace','quiz'];
function switchTab(tab){
  LETTER_TABS.forEach(t=>{
    document.getElementById('tab-'+t).classList.toggle('active', t===tab);
    document.getElementById('content-'+t).classList.toggle('active', t===tab);
  });
  if(tab==='quiz') renderLetterQuiz();
  if(tab==='trace') tracer.show();
}

// ---------- Generic multiple-choice quiz ----------
// ids: {progress, glyph, options, feedback}; getItems() returns
// [{key, g, correct, options, say?}]; onCorrect(item) records the star.
function makeQuiz(ids, getItems, onCorrect, label){
  const q = {items:[], order:[], index:0, locked:false};
  const $ = id=> document.getElementById(id);
  q.load = ()=>{
    q.items = getItems();
    q.order = shuffle([...q.items.keys()]);
    q.index = 0;
    q.render();
  };
  q.render = ()=>{
    q.locked = false;
    if(q.index >= q.order.length){ q.order = shuffle([...q.items.keys()]); q.index = 0; }
    const item = q.items[q.order[q.index]];
    $(ids.glyph).textContent = item.g;
    $(ids.progress).textContent = (label||'Soru')+' '+(q.index+1)+' / '+q.order.length;
    $(ids.feedback).textContent = '';
    const wrap = $(ids.options);
    wrap.innerHTML = '';
    shuffle([...item.options]).forEach(o=>{
      const btn = document.createElement('button');
      btn.className = 'quiz-opt';
      btn.textContent = o;
      btn.onclick = ()=> q.answer(o, item, btn);
      wrap.appendChild(btn);
    });
  };
  q.answer = (choice, item, btn)=>{
    if(q.locked) return;
    if(choice === item.correct){
      q.locked = true;
      btn.classList.add('correct');
      $(ids.feedback).textContent = randomPraise();
      speakArabic(item.say || item.g);
      onCorrect(item);
      setTimeout(()=>{ q.index++; q.render(); }, 1100);
    } else {
      btn.classList.add('wrong');
      btn.disabled = true;
      $(ids.feedback).textContent = 'Tekrar dene!';
    }
  };
  return q;
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

// ---------- Stage 1b: Letter forms ----------
let formsIndex = 0;
function renderFormsView(){
  const L = LETTERS[formsIndex];
  const forms = letterForms(L.g);
  document.getElementById('formsName').textContent = L.name;
  document.getElementById('formsBoxes').innerHTML = FORM_LABELS.map(([k,label])=>
    `<div class="form-box"><div class="arabic form-glyph">${forms[k]}</div><div class="form-label">${label}</div></div>`
  ).join('');
  document.getElementById('formsNote').textContent = NON_CONNECTORS.has(L.g)
    ? 'Bu harf kendisinden sonraki harfe bağlanmaz.'
    : 'Bu harf iki tarafa da bağlanabilir.';
}
function stepForms(d){
  formsIndex = (formsIndex + d + LETTERS.length) % LETTERS.length;
  renderFormsView();
}
const formsQuiz = makeQuiz(
  {progress:'formsQuizProgress', glyph:'formsQuizGlyph', options:'formsQuizOptions', feedback:'formsQuizFeedback'},
  ()=> LETTERS.map((L, i)=>{
    const forms = letterForms(L.g);
    const pos = ['ini','med','fin'][Math.floor(Math.random()*3)];
    const others = shuffle(LETTERS.map((_, j)=> j).filter(j=> j !== i)).slice(0,3);
    return {key:i, g:forms[pos], correct:L.name, say:L.ar, options:[L.name, ...others.map(j=> LETTERS[j].name)]};
  }),
  item=>{ if(!state.forms[item.key]){ state.forms[item.key] = true; updateHeader(); } }
);

// ---------- Stage 1c: Tracing ----------
// The letter is drawn faintly; the child traces it with a finger. Coverage of
// the letter shape and how much ink stays near it decide whether it counts.
const tracer = (()=>{
  let index = 0, drawing = false, ready = false, last = null;
  let guide, ink, size = 300, dpr = 1;
  const FONT = '"Scheherazade New", serif';

  function els(){
    guide = document.getElementById('traceGuide');
    ink = document.getElementById('traceInk');
  }
  function fontPx(){ return Math.round(size * 0.62); }
  function drawLetter(ctx, color, strokeWidth){
    const g = LETTERS[index].g;
    ctx.save();
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.font = fontPx()+'px '+FONT;
    ctx.textAlign = 'center';
    ctx.direction = 'rtl';
    ctx.textBaseline = 'alphabetic';
    const m = ctx.measureText(g);
    const asc = m.actualBoundingBoxAscent || fontPx()*0.5;
    const desc = m.actualBoundingBoxDescent || 0;
    const y = size/2 + (asc - desc)/2;
    ctx.fillStyle = color;
    ctx.fillText(g, size/2, y);
    if(strokeWidth){
      ctx.lineWidth = strokeWidth;
      ctx.lineJoin = 'round';
      ctx.strokeStyle = color;
      ctx.strokeText(g, size/2, y);
    }
    ctx.restore();
  }
  function resize(){
    const wrap = document.getElementById('traceWrap');
    size = Math.min(wrap.clientWidth || 300, 340);
    dpr = window.devicePixelRatio || 1;
    [guide, ink].forEach(c=>{
      c.width = size*dpr; c.height = size*dpr;
      c.style.width = size+'px'; c.style.height = size+'px';
    });
    wrap.style.height = size+'px';
  }
  function render(){
    if(!guide) els();
    resize();
    const gctx = guide.getContext('2d');
    gctx.clearRect(0,0,guide.width,guide.height);
    drawLetter(gctx, 'rgba(15,92,86,.22)', 0);
    clearInk();
    const L = LETTERS[index];
    document.getElementById('traceName').textContent = L.name + (state.trace[index] ? ' ★' : '');
    document.getElementById('traceFeedback').textContent = '';
  }
  function clearInk(){
    const ctx = ink.getContext('2d');
    ctx.clearRect(0,0,ink.width,ink.height);
  }
  function point(e){
    const r = ink.getBoundingClientRect();
    return {x:e.clientX - r.left, y:e.clientY - r.top};
  }
  function strokeTo(pt){
    const ctx = ink.getContext('2d');
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.strokeStyle = '#CC9A3C';
    ctx.lineWidth = size*0.06;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(pt.x, pt.y);
    ctx.stroke();
    last = pt;
  }
  function bind(){
    ink.addEventListener('pointerdown', e=>{
      e.preventDefault();
      drawing = true;
      ink.setPointerCapture(e.pointerId);
      last = point(e);
      strokeTo({x:last.x+0.1, y:last.y+0.1});
    });
    ink.addEventListener('pointermove', e=>{ if(drawing) strokeTo(point(e)); });
    const end = ()=>{ drawing = false; };
    ink.addEventListener('pointerup', end);
    ink.addEventListener('pointercancel', end);
  }
  function score(){
    const w = ink.width, h = ink.height;
    const mask = document.createElement('canvas'); mask.width = w; mask.height = h;
    const near = document.createElement('canvas'); near.width = w; near.height = h;
    drawLetter(mask.getContext('2d'), '#000', 0);
    drawLetter(near.getContext('2d'), '#000', size*0.12);
    const m = mask.getContext('2d').getImageData(0,0,w,h).data;
    const n = near.getContext('2d').getImageData(0,0,w,h).data;
    const u = ink.getContext('2d').getImageData(0,0,w,h).data;
    let letterPx = 0, covered = 0, inkPx = 0, inkNear = 0;
    const step = Math.max(1, Math.round(2*dpr));
    for(let y = 0; y < h; y += step){
      for(let x = 0; x < w; x += step){
        const a = (y*w + x)*4 + 3;
        const inLetter = m[a] > 128, hasInk = u[a] > 0;
        if(inLetter){ letterPx++; if(hasInk) covered++; }
        if(hasInk){ inkPx++; if(n[a] > 0) inkNear++; }
      }
    }
    return {coverage: letterPx ? covered/letterPx : 0, precision: inkPx ? inkNear/inkPx : 0};
  }
  function check(){
    const fb = document.getElementById('traceFeedback');
    const {coverage, precision} = score();
    if(coverage >= 0.55 && precision >= 0.7){
      fb.textContent = randomPraise();
      speakArabic(LETTERS[index].ar);
      if(!state.trace[index]){ state.trace[index] = true; updateHeader(); }
      document.getElementById('traceName').textContent = LETTERS[index].name + ' ★';
    } else if(precision < 0.7){
      fb.textContent = 'Çizgilerin harfin dışına taştı. Silip tekrar dene!';
    } else {
      fb.textContent = 'Harfin tamamını çiz. Biraz daha!';
    }
  }
  return {
    async show(){
      if(!ready){
        els(); bind(); ready = true;
        try{ await document.fonts.load(fontPx()+'px "Scheherazade New"', LETTERS[0].g); }catch(e){}
      }
      render();
    },
    step(d){ index = (index + d + LETTERS.length) % LETTERS.length; render(); },
    clear(){ clearInk(); document.getElementById('traceFeedback').textContent = ''; },
    check
  };
})();

// ---------- Stage 2: Syllables ----------
const syllableQuiz = makeQuiz(
  {progress:'quizProgress', glyph:'quizGlyph', options:'quizOptions', feedback:'quizFeedback'},
  ()=> SYLLABLES.map((x, i)=> ({...x, key:i})),
  item=>{ if(!state.syllables[item.key]){ state.syllables[item.key] = true; updateHeader(); } },
  'Tur'
);

// ---------- Stage 3: Reading lessons ----------
let currentLesson = 0;
const lessonQuiz = makeQuiz(
  {progress:'lessonQuizProgress', glyph:'lessonQuizGlyph', options:'lessonQuizOptions', feedback:'lessonQuizFeedback'},
  ()=> LESSONS[currentLesson].items.map((x, i)=> ({...x, key:LESSONS[currentLesson].id+'-'+i})),
  item=>{
    if(!state.lessons[item.key]){ state.lessons[item.key] = true; updateLessonTabs(); updateHeader(); }
  }
);
function lessonDone(li){
  const L = LESSONS[li];
  return L.items.filter((_, i)=> state.lessons[L.id+'-'+i]).length;
}
function buildLessons(){
  const bar = document.getElementById('lessonTabs');
  bar.innerHTML = '';
  LESSONS.forEach((L, li)=>{
    const b = document.createElement('button');
    b.className = 'tab-btn';
    b.id = 'lessontab-'+li;
    b.onclick = ()=> selectLesson(li);
    bar.appendChild(b);
  });
  updateLessonTabs();
  selectLesson(0);
}
function updateLessonTabs(){
  LESSONS.forEach((L, li)=>{
    const b = document.getElementById('lessontab-'+li);
    if(!b) return;
    const done = lessonDone(li);
    b.textContent = L.title + (done === L.items.length ? ' 🏅' : '');
  });
}
function selectLesson(li){
  currentLesson = li;
  LESSONS.forEach((_, i)=> document.getElementById('lessontab-'+i).classList.toggle('active', i===li));
  const L = LESSONS[li];
  document.getElementById('lessonSign').textContent = L.sign;
  document.getElementById('lessonText').textContent = L.text;
  const ex = document.getElementById('lessonExamples');
  ex.innerHTML = '';
  L.examples.forEach(([g, t])=>{
    const b = document.createElement('button');
    b.className = 'example-chip';
    b.innerHTML = `<span class="arabic">${g}</span><span>${t}</span>`;
    b.onclick = ()=> speakArabic(g);
    ex.appendChild(b);
  });
  lessonQuiz.load();
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
    block.className = 'sura-block collapsed';
    block.id = 'sura-'+si;
    block.innerHTML = `<div class="sura-title" onclick="toggleSuraBlock(${si})" role="button" tabindex="0"
        onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleSuraBlock(${si});}">
      <span class="chevron">▸</span>${sura.name} <span class="badge">${sura.note}</span>
      <span class="sura-count" id="suracount-${si}"></span>
      <button class="play-all-btn" id="playall-${si}" onclick="event.stopPropagation(); toggleWholeSura(${si})">▶ Dinle</button></div>`;
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
  // Open the first sura that isn't fully memorised yet.
  const firstOpen = SURAS.findIndex((s, si)=> !s.ayat.every((_, ai)=> state.suraAyat[si+'-'+ai]));
  toggleSuraBlock(firstOpen === -1 ? 0 : firstOpen, true);
}

function toggleSuraBlock(si, open){
  const b = document.getElementById('sura-'+si);
  if(!b) return;
  const willOpen = open === undefined ? b.classList.contains('collapsed') : open;
  b.classList.toggle('collapsed', !willOpen);
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
  if(b) b.textContent = playing ? '■ Durdur' : '▶ Dinle';
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
  toggleSuraBlock(si, true);
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
  renderFormsView();
  formsQuiz.load();
  syllableQuiz.load();
  buildLessons();
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
