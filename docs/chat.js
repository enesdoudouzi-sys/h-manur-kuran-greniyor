// "Lale'ye sor": a kid-safe chat with Lale.
// Inside the claude.ai artifact it asks Claude through the `sample` capability;
// on GitHub Pages it calls the Lale chat Worker (worker/) configured in config.js
// or under Ayarlar. Loaded after elifbe-plus.js; started via initChat().

const CHAT_SYSTEM = `Sen "Lale"sin: Hümanur'un Kur'an Yolculuğu uygulamasındaki neşeli, sevecen bir lale çiçeği. Küçük bir çocukla (yaklaşık 5-10 yaş) konuşuyorsun.
Görevin: Arapça harfler (Elifbe), harekeler, cezm, şedde, tenvin, med, mahreç, kısa sûreler, dualar, abdest, namaz ve temel İslami bilgiler hakkında çocuğun sorularını cevaplamak. Uygulamadaki bölümleri önerebilirsin.
Çocuk hangi dilde yazarsa o dilde cevap ver. En fazla 3-4 kısa cümle, basit kelimeler, bir emoji olabilir. Arapça örnekleri harekeli yaz ve okunuşunu ekle, örneğin: بَ (ba). Sıcak ve cesaret verici ol.
İslami bilgileri Diyanet'in yaygın, ana akım görüşlerine uygun ve sade anlat; emin olmadığın şeyi uydurma, "Bunu hocana sorarsan çok güzel olur" de. Tartışmalı veya korkutucu konularda kısa ve yumuşak cevap ver, "annene, babana veya hocana sor" de. Kişisel bilgi isteme. Uygunsuz isteklerde kibarca reddet ve öğrenmeye geri dön. Sorulursa bir yapay zekâ olduğunu söyle.`;

const CHAT_KEY = 'humanur-chat';
const CHAT_SUGGEST = ['Elif nasıl okunur?', 'Üstün ne demek?', 'Fâtiha ne anlatıyor?', 'Abdest nasıl alınır?', 'Bana bir harf sor!'];
let chatLog = [];
try{ chatLog = JSON.parse(sessionStorage.getItem(CHAT_KEY)) || []; }catch(e){}
let chatBusy = false, chatSample = undefined;

function chatUrl(){
  let u = '';
  try{ u = localStorage.getItem('humanur-chat-url') || ''; }catch(e){}
  return u || (window.HUMANUR_CONFIG && window.HUMANUR_CONFIG.chatUrl) || '';
}
async function chatBackend(){
  if(chatSample === undefined){
    chatSample = null;
    try{
      if(window.claude && window.claude.use) chatSample = await window.claude.use('sample');
    }catch(e){ chatSample = null; }
  }
  if(chatSample) return 'sample';
  return chatUrl() ? 'worker' : null;
}

async function askLale(messages){
  const kind = await chatBackend();
  if(kind === 'sample'){
    const input = [{role:'user', content:'[Talimatlar]\n' + CHAT_SYSTEM + '\n[Sohbet aşağıda]'},
                   {role:'assistant', content:'Tamam! 🌷'}, ...messages];
    const res = await chatSample(input, {modelTier:'quick', cache:false});
    return (res && res.text || '').trim();
  }
  if(kind === 'worker'){
    const r = await fetch(chatUrl(), {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({messages})});
    const data = await r.json().catch(()=> ({}));
    if(!r.ok) throw new Error(data.error || ('http_' + r.status));
    return data.reply || '';
  }
  throw new Error('not_configured');
}

function chatSave(){ try{ sessionStorage.setItem(CHAT_KEY, JSON.stringify(chatLog.slice(-30))); }catch(e){} }
const escHtml = s=> String(s).replace(/[&<>"]/g, c=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

function speakTurkish(text){
  if(!('speechSynthesis' in window)) return;
  stopAudio();
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/[؀-ۿ]+/g, ' '));
  u.lang = 'tr-TR'; u.rate = 0.95;
  window.speechSynthesis.speak(u);
}

async function renderChat(){
  const el = document.getElementById('exbody-sohbet');
  if(!el) return;
  const kind = await chatBackend();
  if(!kind){
    el.innerHTML = `<div class="ex-card ex-center"><div class="ex-level">🌷💬</div><h3>Lale sohbeti henüz kurulmadı</h3>
      <p>Bu özellik için bir ebeveynin sohbet sunucusunu bir kez kurması gerekiyor. Kurulum açıklaması depodaki <b>worker/README.md</b> dosyasında.</p>
      <p class="ex-sub">Kurulduktan sonra adres Ayarlar → "Lale sohbet adresi" bölümüne girilir.</p></div>`;
    return;
  }
  el.innerHTML = `<div class="chat-box" id="chatBox">
      <div class="chat-msg lale"><span class="chat-av">🌷</span><div class="chat-bubble">Merhaba! Ben Lale. Harfler, sûreler, dualar… Bana ne istersen sor! 😊</div></div>
      ${chatLog.map((m, i)=> m.role === 'user'
        ? `<div class="chat-msg me"><div class="chat-bubble">${escHtml(m.content)}</div></div>`
        : `<div class="chat-msg lale"><span class="chat-av">🌷</span><div class="chat-bubble">${escHtml(m.content)}<button type="button" class="chat-say" onclick="speakTurkish(chatLog[${i}].content)" aria-label="Sesli oku">🔊</button></div></div>`).join('')}
      ${chatBusy ? '<div class="chat-msg lale"><span class="chat-av">🌷</span><div class="chat-bubble typing"><i></i><i></i><i></i></div></div>' : ''}
    </div>
    <div class="chips chat-suggest">${CHAT_SUGGEST.map(s=> `<button type="button" class="chip" onclick="sendChat(this.textContent)">${s}</button>`).join('')}</div>
    <form class="chat-form" onsubmit="event.preventDefault(); sendChat(this.q.value); this.q.value='';">
      <input name="q" class="ex-input chat-input" maxlength="300" placeholder="Lale'ye bir soru yaz…" autocomplete="off" ${chatBusy ? 'disabled' : ''}>
      <button class="ex-learn" type="submit" ${chatBusy ? 'disabled' : ''}>Gönder</button>
    </form>
    <div class="ex-row chat-foot"><span class="ex-sub">Lale bir yapay zekâdır, bazen yanılabilir. Önemli soruları bir büyüğüne de sor.</span>
      ${chatLog.length ? '<button type="button" class="voice-btn ghost" onclick="chatLog=[];chatSave();renderChat()">Temizle</button>' : ''}</div>`;
  const box = document.getElementById('chatBox');
  box.scrollTop = box.scrollHeight;
}

async function sendChat(text){
  text = String(text || '').trim().slice(0, 300);
  if(!text || chatBusy) return;
  chatLog.push({role:'user', content:text});
  chatBusy = true;
  chatSave();
  renderChat();
  try{
    const reply = await askLale(chatLog.slice(-20));
    chatLog.push({role:'assistant', content: reply || 'Hmm, bunu bilemedim. Başka bir soru sorar mısın? 🌷'});
  }catch(e){
    const msg = e && e.message === 'busy' ? 'Şu an çok soru geliyor, birazdan tekrar dener misin? 🌷'
      : e && e.message === 'not_configured' ? 'Sohbet henüz kurulmadı. Bir büyüğüne haber ver. 🌷'
      : 'İnternete ulaşamadım. Bağlantını kontrol edip tekrar dene. 🌷';
    chatLog.push({role:'assistant', content: msg});
  }
  chatBusy = false;
  chatSave();
  renderChat();
}

function initChat(){
  const map = document.getElementById('mapView'), main = document.querySelector('main');
  const n = document.createElement('div');
  n.className = 'stage-node ex-node';
  n.dataset.stage = 'sohbet';
  n.innerHTML = `<div class="stage-badge">💬</div><div class="stage-body"><h3>Lale'ye sor</h3><p>Sorularını Lale cevaplasın</p><div class="stage-stars" id="stars-sohbet"></div></div>`;
  map.appendChild(n);
  const sec = document.createElement('section');
  sec.className = 'panel';
  sec.id = 'panel-sohbet';
  sec.innerHTML = `<button class="back-btn" onclick="closeStage()">← Yolculuğa dön</button>
    <div class="panel-header"><h2>Lale'ye sor</h2><p>Harfler, sûreler ve dualar hakkında sorularını yaz.</p></div><div class="ex-body" id="exbody-sohbet"></div>`;
  main.appendChild(sec);
  const _open = openStage;
  openStage = function(stage){
    _open(stage);
    if(stage === 'sohbet') renderChat();
  };
}
