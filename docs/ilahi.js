// İlahiler: a few traditional ilahis (old, author-free texts) with words
// explained, plus the family's own ilahis (title, lyrics and a recording or
// audio file kept on this device). Loaded after iman.js; started via initIlahi().

const ILAHI = [
  {id:'talaal', t:'Talaal Bedru Aleynâ', who:'Medine\'nin çocukları',
   story:'Peygamberimiz Mekke\'den Medine\'ye hicret ettiğinde Medineli çocuklar ve büyükler onu tepelerin üzerinde bu ilahiyle karşıladılar. 1400 yıldır sevinçle okunur.',
   ar:[['طَلَعَ الْبَدْرُ عَلَيْنَا', 'Tala\'al-bedru aleynâ', 'Dolunay üzerimize doğdu,'],
       ['مِنْ ثَنِيَّاتِ الْوَدَاعْ', 'min seniyyâtil-vedâ\'', 'Vedâ tepelerinden.'],
       ['وَجَبَ الشُّكْرُ عَلَيْنَا', 'Vecebeş-şükrü aleynâ', 'Şükretmek bize borç oldu,'],
       ['مَا دَعَا لِلّٰهِ دَاعْ', 'mâ deâ lillâhi dâ\'', 'Allah\'a dua eden dua ettikçe.'],
       ['أَيُّهَا الْمَبْعُوثُ فِينَا', 'Eyyühel-meb\'ûsü fînâ', 'Ey bize gönderilen Peygamber,'],
       ['جِئْتَ بِالْأَمْرِ الْمُطَاعْ', 'ci\'te bil-emril-mutâ\'', 'Uyulacak güzel emirlerle geldin.'],
       ['جِئْتَ شَرَّفْتَ الْمَدِينَةْ', 'Ci\'te şerreftel-Medîne', 'Geldin, Medine\'yi şereflendirdin,'],
       ['مَرْحَبًا يَا خَيْرَ دَاعْ', 'merhaben yâ hayra dâ\'', 'Hoş geldin, ey hayra çağıran!']]},
  {id:'daglar', t:'Dağlar ile Taşlar ile', who:'Yunus Emre',
   story:'Yunus Emre yaklaşık 700 yıl önce yaşamış büyük bir Türk şairidir. Bu ilahisinde dağlarla, kuşlarla, peygamberlerle birlikte Allah\'ı andığını söyler.',
   verses:[['Dağlar ile taşlar ile', 'Çağırayım Mevlâm seni', 'Seherlerde kuşlar ile', 'Çağırayım Mevlâm seni'],
           ['Su dibinde mâhîlerle', 'Sahrâlarda âhûlarla', 'Abdal olup Yâ Hû ile', 'Çağırayım Mevlâm seni'],
           ['Gökyüzünde Îsâ ile', 'Tûr Dağı\'nda Mûsâ ile', 'Elindeki asâ ile', 'Çağırayım Mevlâm seni'],
           ['Derdi öküş Eyyûb ile', 'Gözü yaşlı Yakûb ile', 'Ol Muhammed mahbûb ile', 'Çağırayım Mevlâm seni']],
   words:[['Mevlâ','Allah'],['seher','sabaha karşı'],['mâhî','balık'],['sahrâ','çöl, kır'],['âhû','ceylan'],['abdal','dünyaya gönül bağlamayan derviş'],['öküş','çok'],['mahbûb','sevgili']]},
  {id:'merhaba', t:'Merhaba (Mevlid\'den)', who:'Süleyman Çelebi',
   story:'Süleyman Çelebi yaklaşık 600 yıl önce Bursa\'da Peygamberimizin doğumunu anlatan Mevlid\'i yazdı. Bu bölümde bütün varlıklar yeni doğan Peygamberimize "Merhaba!" der.',
   verses:[['Merhaba ey âlî sultan merhaba', 'Merhaba ey kân-ı irfân merhaba', 'Merhaba ey sırr-ı Furkân merhaba', 'Merhaba ey derde dermân merhaba']],
   words:[['âlî','yüce'],['kân-ı irfân','bilgi ve hikmet kaynağı'],['sırr-ı Furkân','Kur\'an\'ın sırrı'],['derde dermân','derde ilaç']]}
];
EX_SETS.push(['u', ()=> ILAHI.map(x=> x.id)]);

const IL_KEY = 'humanur-ilahi';
let myIlahi = [];
try{ myIlahi = JSON.parse(localStorage.getItem(IL_KEY)) || []; }catch(e){}
function ilSave(){ try{ localStorage.setItem(IL_KEY, JSON.stringify(myIlahi)); }catch(e){} }
const il = {open:null, adding:false, confirm:null};

function ilBody(x){
  let text = '';
  if(x.ar) text = linesHtml('il-'+x.id, x.t, x.ar);
  else if(x.verses) text = `<div class="il-lyrics">${x.verses.map(v=> `<p>${v.map(escHtml).join('<br>')}</p>`).join('')}</div>`;
  else text = `<div class="il-lyrics">${escHtml(x.text || '').split(/\n\s*\n/).map(p=> `<p>${p.replace(/\n/g, '<br>')}</p>`).join('')}</div>`;
  const yt = 'https://www.youtube.com/results?search_query='+encodeURIComponent(x.t+' ilahi');
  return `<div class="ex-item-body">
    ${x.story ? `<p class="il-story">${x.story}</p>` : ''}
    ${text}
    ${x.words ? `<div class="ex-label">Kelimeler</div><div class="chips">${x.words.map(w=> `<span class="chip">${w[0]} = ${w[1]}</span>`).join('')}</div>` : ''}
    ${typeof voiceBox === 'function' ? voiceBox('il:'+x.id) : ''}
    <div class="ex-row il-actions">
      ${x.mine ? '' : ivBtn('u:'+x.id, 'ilahi', 'Ezberledim')}
      <a class="voice-btn ghost" href="${yt}" target="_blank" rel="noopener">▶ YouTube'da ara</a>
      ${x.mine ? (il.confirm === x.id
        ? `<button type="button" class="voice-btn danger" onclick="ilDelete('${x.id}')">Silmeyi onayla</button>`
        : `<button type="button" class="voice-btn ghost" onclick="il.confirm='${x.id}';renderIman('ilahi')">🗑️ Sil</button>`) : ''}
    </div>
    <p class="ex-sub">YouTube'u bir büyüğünle birlikte aç. Beğendiğiniz okuyuşu yukarıdan kaydedebilir veya ses dosyası olarak ekleyebilirsiniz.</p></div>`;
}
function ilItem(x){
  const open = il.open === x.id;
  return `<div class="ex-item ${open ? 'open' : ''} ${state.extra['u:'+x.id] ? 'learned' : ''}" id="il-${x.id}">
    <button class="ex-item-head" type="button" onclick="stopLines();il.open=il.open==='${x.id}'?null:'${x.id}';il.confirm=null;renderIman('ilahi')">
      <span class="ex-num">${state.extra['u:'+x.id] ? '✓' : x.mine ? '💛' : '🎵'}</span><span class="ex-grow"><b>${escHtml(x.t)}</b><span class="ex-sub">${escHtml(x.who || 'Bizim ilahimiz')}${typeof voiceUrls !== 'undefined' && voiceUrls['il:'+x.id] ? ' · 🔊 ses var' : ''}</span></span><span class="chevron">▸</span></button>
    ${open ? ilBody(x) : ''}</div>`;
}
function vIlahi(){
  const mine = myIlahi.map(x=> Object.assign({mine:true}, x));
  return `<p class="tab-hint">Allah'ı ve Peygamberimizi anlatan güzel şiirler. Sözleri oku, dinle, birlikte söyle! 🎶</p>
    <h3 class="sub-title">🎵 Eski ilahilerimiz</h3>${ILAHI.map(ilItem).join('')}
    <h3 class="sub-title">💛 Bizim ilahilerimiz</h3>
    ${mine.length ? mine.map(ilItem).join('') : '<p class="ex-sub">Hümanur\'un sevdiği çocuk ilahilerini buraya ekleyebilirsiniz: adını ve sözlerini yazın, sonra kendi sesinizle kaydedin veya bir ses dosyası seçin.</p>'}
    ${il.adding ? `<form class="ex-card il-form" onsubmit="event.preventDefault();ilAdd(this)">
        <label><b>İlahinin adı</b><input name="t" class="ex-input" maxlength="60" required placeholder="ör. Ramazan ilahisi"></label>
        <label><b>Sözleri</b><textarea name="x" class="ex-input" rows="8" maxlength="3000" placeholder="Her satırı alt alta yazın. Kıtalar arasında boş satır bırakın."></textarea></label>
        <div class="ex-row"><button class="ex-learn" type="submit">Kaydet</button><button class="voice-btn ghost" type="button" onclick="il.adding=false;renderIman('ilahi')">Vazgeç</button></div></form>`
      : `<button type="button" class="ex-learn il-add" onclick="il.adding=true;renderIman('ilahi')">➕ İlahi ekle</button>`}
    <p class="ex-sub">Eklediğiniz ilahiler ve ses kayıtları sadece bu cihazda saklanır.</p>`;
}
function ilAdd(f){
  const t = f.t.value.trim().slice(0, 60), text = f.x.value.trim().slice(0, 3000);
  if(!t) return;
  const id = 'my'+Date.now().toString(36);
  myIlahi.push({id, t, text});
  ilSave();
  il.adding = false; il.open = id;
  renderIman('ilahi');
  showToast('İlahi eklendi 🎶 Şimdi sesini kaydedebilirsin.');
}
function ilDelete(id){
  myIlahi = myIlahi.filter(x=> x.id !== id);
  ilSave();
  if(typeof deleteVoice === 'function' && voiceUrls['il:'+id]) deleteVoice('il:'+id);
  il.open = null; il.confirm = null;
  renderIman('ilahi');
}

function initIlahi(){
  IMAN_PANELS.ilahi = vIlahi;
  const map = document.getElementById('mapView'), main = document.querySelector('main');
  const n = document.createElement('div');
  n.className = 'stage-node ex-node';
  n.dataset.stage = 'ilahi';
  n.innerHTML = `<div class="stage-badge">🎶</div><div class="stage-body"><h3>İlahiler</h3><p>Söyle, dinle, ezberle</p><div class="stage-stars" id="stars-ilahi"></div></div>`;
  map.appendChild(n);
  const sec = document.createElement('section');
  sec.className = 'panel';
  sec.id = 'panel-ilahi';
  sec.innerHTML = `<button class="back-btn" onclick="closeStage()">← Yolculuğa dön</button>
    <div class="panel-header"><h2>İlahiler</h2><p>Söyle, dinle, ezberle</p></div><div class="ex-body" id="exbody-ilahi"></div>`;
  main.appendChild(sec);
}
