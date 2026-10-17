// Ebeveyn kilidi: Ebeveyn and Ayarlar open only with a parent PIN.
// This is a child lock on this device, not account security: the PIN is kept
// as a salted SHA-256 hash in localStorage. Loaded after reader.js; started
// last from init() so its openStage wrapper runs first.

const PIN_KEY = 'humanur-pin';
const UNLOCK_KEY = 'humanur-unlocked-until';
const LOCKED_STAGES = ['veli', 'ayarlar'];
const UNLOCK_MINUTES = 10;
let pinState = null;   // {mode:'enter'|'create'|'confirm'|'forgot', next, digits, first, tries, until, q}
let pinBlockedUntil = 0;

function pinRecord(){ try{ const r = JSON.parse(localStorage.getItem(PIN_KEY)); return r && r.salt && r.hash ? r : null; }catch(e){ return null; } }
async function pinHash(pin, salt){
  const data = new TextEncoder().encode(salt + ':' + pin);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)].map(b=> b.toString(16).padStart(2, '0')).join('');
}
function isUnlocked(){
  try{ return Number(sessionStorage.getItem(UNLOCK_KEY)) > Date.now(); }catch(e){ return false; }
}
function setUnlocked(){
  try{ sessionStorage.setItem(UNLOCK_KEY, String(Date.now() + UNLOCK_MINUTES * 60000)); }catch(e){}
  if(typeof exUI !== 'undefined') exUI.pOk = true;
}
function lockNow(){
  try{ sessionStorage.removeItem(UNLOCK_KEY); }catch(e){}
  if(typeof exUI !== 'undefined') exUI.pOk = false;
  if(typeof closeStage === 'function') closeStage();
  showToast('Ebeveyn bölümleri kilitlendi 🔒');
}
const mathQ = (hard)=> hard
  ? [12 + Math.floor(Math.random()*8), 6 + Math.floor(Math.random()*4), '×']
  : [7 + Math.floor(Math.random()*9), 6 + Math.floor(Math.random()*9), '+'];
const mathAnswer = q=> q[2] === '×' ? q[0] * q[1] : q[0] + q[1];

function openPin(mode, next){
  pinState = {mode, next, digits:'', first:'', q: mode === 'create' ? mathQ(false) : mode === 'forgot' ? mathQ(true) : null, step: mode === 'create' || mode === 'forgot' ? 'math' : 'pin'};
  renderPin();
}
function closePin(){ pinState = null; const el = document.getElementById('pinModal'); if(el) el.remove(); }

function renderPin(){
  let el = document.getElementById('pinModal');
  if(!el){
    el = document.createElement('div');
    el.id = 'pinModal';
    el.className = 'pin-modal';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    document.body.appendChild(el);
  }
  const p = pinState;
  const blocked = pinBlockedUntil > Date.now();
  let title, text, body;
  if(p.step === 'math'){
    title = p.mode === 'forgot' ? 'Şifreyi sıfırla' : 'Ebeveyn şifresi oluştur';
    text = p.mode === 'forgot' ? 'Yetişkin doğrulaması: işlemi çöz, sonra yeni şifreyi belirle. İlerleme silinmez.' : 'Ebeveyn ve Ayarlar bölümleri bundan sonra 4 haneli bir şifreyle açılır. Önce bu işlemi çöz.';
    body = `<label class="pin-q"><b>${p.q[0]} ${p.q[2]} ${p.q[1]} = ?</b><input id="pinMath" class="ex-input" type="number" inputmode="numeric" autocomplete="off"></label>
      <p class="pin-err" id="pinErr"></p>
      <div class="ex-row pin-actions"><button type="button" class="voice-btn ghost" onclick="closePin()">Vazgeç</button><button type="button" class="ex-learn" onclick="pinMathCheck()">Devam</button></div>`;
  }else{
    title = p.mode === 'enter' ? 'Ebeveyn şifresi' : p.first ? 'Şifreyi tekrar gir' : 'Yeni şifre (4 rakam)';
    text = p.mode === 'enter' ? 'Bu bölüm ebeveynler içindir.' : 'Çocuğunun bilmediği 4 rakam seç.';
    body = `<div class="pin-dots" aria-label="${p.digits.length} rakam girildi">${[0, 1, 2, 3].map(i=> `<i class="${i < p.digits.length ? 'on' : ''}"></i>`).join('')}</div>
      <p class="pin-err" id="pinErr">${blocked ? 'Çok fazla deneme. Biraz bekle.' : ''}</p>
      <div class="pin-pad">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n=> `<button type="button" onclick="pinKey('${n}')" ${blocked ? 'disabled' : ''}>${n}</button>`).join('')}
        <button type="button" onclick="closePin()" aria-label="Vazgeç">✕</button><button type="button" onclick="pinKey('0')" ${blocked ? 'disabled' : ''}>0</button><button type="button" onclick="pinKey('del')" aria-label="Sil">⌫</button></div>
      ${p.mode === 'enter' ? '<button type="button" class="pin-forgot" onclick="openPin(\'forgot\', pinState.next)">Şifremi unuttum</button>' : ''}`;
  }
  el.innerHTML = `<div class="pin-card"><div class="pin-lock">🔒</div><h3>${title}</h3><p class="ex-sub">${text}</p>${body}</div>`;
  const input = document.getElementById('pinMath');
  if(input){ input.focus(); input.onkeydown = e=>{ if(e.key === 'Enter') pinMathCheck(); }; }
}
function pinMathCheck(){
  const v = Number((document.getElementById('pinMath') || {}).value);
  if(v !== mathAnswer(pinState.q)){ document.getElementById('pinErr').textContent = 'Cevap yanlış, tekrar dene.'; pinState.q = mathQ(pinState.mode === 'forgot'); setTimeout(renderPin, 700); return; }
  pinState.step = 'pin';
  renderPin();
}
async function pinKey(k){
  const p = pinState;
  if(!p || pinBlockedUntil > Date.now()) return;
  if(k === 'del'){ p.digits = p.digits.slice(0, -1); renderPin(); return; }
  if(p.digits.length >= 4) return;
  p.digits += k;
  if(typeof buzz === 'function') buzz(10);
  renderPin();
  if(p.digits.length < 4) return;
  if(p.mode === 'enter'){
    const rec = pinRecord();
    if(rec && await pinHash(p.digits, rec.salt) === rec.hash){
      setUnlocked();
      const next = p.next;
      closePin();
      if(next) next();
      return;
    }
    p.tries = (p.tries || 0) + 1;
    p.digits = '';
    if(p.tries >= 5){ pinBlockedUntil = Date.now() + 60000; p.tries = 0; setTimeout(()=>{ if(pinState) renderPin(); }, 60500); }
    renderPin();
    document.getElementById('pinErr').textContent = pinBlockedUntil > Date.now() ? 'Çok fazla deneme. 1 dakika bekle.' : 'Şifre yanlış.';
    return;
  }
  // create / forgot: enter twice
  if(!p.first){ p.first = p.digits; p.digits = ''; renderPin(); return; }
  if(p.first !== p.digits){ p.first = ''; p.digits = ''; renderPin(); document.getElementById('pinErr').textContent = 'Şifreler aynı değil, baştan gir.'; return; }
  const salt = [...crypto.getRandomValues(new Uint8Array(16))].map(b=> b.toString(16).padStart(2, '0')).join('');
  try{ localStorage.setItem(PIN_KEY, JSON.stringify({salt, hash: await pinHash(p.digits, salt)})); }catch(e){}
  setUnlocked();
  const next = p.next;
  closePin();
  showToast('Ebeveyn şifresi kaydedildi 🔒');
  if(next) next();
}

// Extra block at the end of Ayarlar: change PIN / lock now.
function addPinSettings(){
  const el = document.getElementById('exbody-ayarlar');
  if(!el || el.querySelector('.pin-settings')) return;
  el.insertAdjacentHTML('beforeend', `<div class="ex-card pin-settings"><b>🔒 Ebeveyn şifresi</b>
    <p class="ex-sub">Ebeveyn ve Ayarlar bölümleri şifreyle açılır. Açıldıktan sonra ${UNLOCK_MINUTES} dakika açık kalır.</p>
    <div class="ex-row"><button type="button" class="voice-btn" onclick="openPin('forgot')">Şifreyi değiştir</button><button type="button" class="voice-btn ghost" onclick="lockNow()">Şimdi kilitle</button></div></div>`);
}

function initKilit(){
  if(typeof renderSettings === 'function'){
    const _rs = renderSettings;
    renderSettings = function(){ _rs(); addPinSettings(); };
  }
  const _open = openStage;
  openStage = function(stage){
    if(LOCKED_STAGES.includes(stage) && !isUnlocked()){
      const go = ()=> openStage(stage);
      openPin(pinRecord() ? 'enter' : 'create', go);
      return;
    }
    if(LOCKED_STAGES.includes(stage) && typeof exUI !== 'undefined') exUI.pOk = true;
    _open(stage);
    if(stage === 'veli' && typeof renderExtra === 'function') renderExtra('veli');
    if(stage === 'ayarlar') addPinSettings();
  };
  document.addEventListener('keydown', e=>{ if(e.key === 'Escape' && pinState) closePin(); });
}
