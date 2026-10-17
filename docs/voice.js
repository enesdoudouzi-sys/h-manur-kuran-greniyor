// Parent/teacher voice recordings (stored on this device in IndexedDB) and
// moving progress between devices with a backup file. Loaded after extra.js.

/* ============ Voice recordings ============ */
const VOICE_DB = 'humanur-voices';
const VOICE_MAX_MS = 60000;
const voiceUrls = {};          // key -> object URL of the saved recording
let voiceRec = null;           // {key, recorder, stream, timer, started}
let voiceConfirm = null;       // key waiting for delete confirmation

function voiceDb(){
  return new Promise((resolve, reject)=>{
    if(!('indexedDB' in window)){ reject(new Error('no-idb')); return; }
    const req = indexedDB.open(VOICE_DB, 1);
    req.onupgradeneeded = ()=> req.result.createObjectStore('voices', {keyPath:'key'});
    req.onsuccess = ()=> resolve(req.result);
    req.onerror = ()=> reject(req.error);
  });
}
async function voiceTx(mode, fn){
  const db = await voiceDb();
  return new Promise((resolve, reject)=>{
    const tx = db.transaction('voices', mode);
    const out = fn(tx.objectStore('voices'));
    tx.oncomplete = ()=> resolve(out && out.result);
    tx.onerror = ()=> reject(tx.error);
  });
}
async function loadVoices(){
  try{
    const all = await voiceTx('readonly', s=> s.getAll());
    (all || []).forEach(v=>{ voiceUrls[v.key] = URL.createObjectURL(v.blob); });
  }catch(e){}
  refreshVoiceBoxes();
}
async function saveVoice(key, blob){
  try{
    await voiceTx('readwrite', s=> s.put({key, blob, type:blob.type, at:Date.now()}));
    if(voiceUrls[key]) URL.revokeObjectURL(voiceUrls[key]);
    voiceUrls[key] = URL.createObjectURL(blob);
    showToast('Ses kaydı eklendi 🎙️');
  }catch(e){ showToast('Kayıt saklanamadı. Tarayıcı depolamaya izin vermiyor olabilir.'); }
  refreshVoiceBoxes();
}
async function deleteVoice(key){
  voiceConfirm = null;
  try{ await voiceTx('readwrite', s=> s.delete(key)); }catch(e){}
  if(voiceUrls[key]){ URL.revokeObjectURL(voiceUrls[key]); delete voiceUrls[key]; }
  showToast('Kayıt silindi');
  refreshVoiceBoxes();
}

const voiceKeyAttr = key=> key.replace(/'/g, "\\'");
function voiceBox(key){
  return `<div class="voice-box" data-voice-key="${key}">${voiceBoxInner(key)}</div>`;
}
function voiceBoxInner(key){
  const url = voiceUrls[key], k = voiceKeyAttr(key);
  const recording = voiceRec && voiceRec.key === key;
  const canRecord = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  return `<div class="ex-label">🎙️ Hoca veya ebeveyn sesi</div>
    ${url ? `<audio controls preload="none" src="${url}"></audio>` : '<div class="ex-sub">Henüz kayıt yok. Doğru okuyuşu kendi sesinizle kaydedebilirsiniz.</div>'}
    <div class="ex-row">
      ${recording
        ? `<button class="voice-btn rec" type="button" onclick="stopVoice()">■ Kaydı bitir <span class="voice-time">0:00</span></button>`
        : canRecord ? `<button class="voice-btn" type="button" onclick="startVoice('${k}')">🎙️ ${url ? 'Yeniden kaydet' : 'Kaydet'}</button>` : ''}
      <label class="voice-btn ghost">📁 Dosya seç<input type="file" accept="audio/*" hidden onchange="voiceFile('${k}', this)"></label>
      ${url ? (voiceConfirm === key
        ? `<button class="voice-btn danger" type="button" onclick="deleteVoice('${k}')">Silmeyi onayla</button>`
        : `<button class="voice-btn ghost" type="button" onclick="voiceConfirm='${k}';refreshVoiceBoxes()">Sil</button>`) : ''}
    </div>`;
}
function refreshVoiceBoxes(){
  document.querySelectorAll('.voice-box').forEach(el=>{ el.innerHTML = voiceBoxInner(el.dataset.voiceKey); });
}

async function startVoice(key){
  if(voiceRec) stopVoice();
  stopAudio();
  try{
    const stream = await navigator.mediaDevices.getUserMedia({audio:true});
    const recorder = new MediaRecorder(stream);
    const chunks = [];
    recorder.ondataavailable = e=>{ if(e.data && e.data.size) chunks.push(e.data); };
    recorder.onstop = ()=>{
      stream.getTracks().forEach(t=> t.stop());
      const type = (recorder.mimeType || 'audio/webm').split(';')[0];
      if(chunks.length) saveVoice(key, new Blob(chunks, {type}));
    };
    const started = Date.now();
    const timer = setInterval(()=>{
      const s = Math.floor((Date.now() - started) / 1000);
      document.querySelectorAll('.voice-time').forEach(el=> el.textContent = Math.floor(s/60)+':'+String(s%60).padStart(2,'0'));
      if(Date.now() - started >= VOICE_MAX_MS) stopVoice();
    }, 250);
    voiceRec = {key, recorder, stream, timer};
    recorder.start();
    refreshVoiceBoxes();
  }catch(e){
    showToast('Mikrofon izni verilmedi veya bu tarayıcı kaydı desteklemiyor.');
  }
}
function stopVoice(){
  if(!voiceRec) return;
  clearInterval(voiceRec.timer);
  try{ if(voiceRec.recorder.state !== 'inactive') voiceRec.recorder.stop(); }catch(e){}
  voiceRec = null;
  refreshVoiceBoxes();
}
function voiceFile(key, input){
  const f = input.files && input.files[0];
  if(!f) return;
  if(!/^audio\//.test(f.type) && !/\.(m4a|mp3|wav|ogg|webm|aac)$/i.test(f.name)){ showToast('Lütfen bir ses dosyası seç.'); return; }
  if(f.size > 20*1024*1024){ showToast('Dosya 20 MB\'dan küçük olmalı.'); return; }
  saveVoice(key, f);
}

/* Sura recordings: one box per sura, under its title */
function addSuraVoiceBoxes(){
  SURAS.forEach((_, si)=>{
    const block = document.getElementById('sura-'+si);
    if(!block || block.querySelector('.voice-box')) return;
    const box = document.createElement('div');
    box.className = 'voice-box';
    box.dataset.voiceKey = 's:'+si;
    box.innerHTML = voiceBoxInner('s:'+si);
    block.querySelector('.sura-title').after(box);
  });
}

/* ============ Progress backup file ============ */
function exportProgress(){
  const data = {app:'humanur-kuran-yolculugu', version:1, savedAt:new Date().toISOString(), state};
  const blob = new Blob([JSON.stringify(data, null, 1)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'humanur-ilerleme-'+new Date().toISOString().slice(0,10)+'.json';
  document.body.appendChild(a);
  a.click();
  setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  showToast('İlerleme dosyası indirildi 📥');
}
function importProgress(input){
  const f = input.files && input.files[0];
  input.value = '';
  if(!f) return;
  const reader = new FileReader();
  reader.onload = ()=>{
    let data;
    try{ data = JSON.parse(reader.result); }catch(e){ showToast('Bu dosya okunamadı.'); return; }
    if(!data || data.app !== 'humanur-kuran-yolculugu' || !data.state || typeof data.state !== 'object'){
      showToast('Bu bir Hümanur ilerleme dosyası değil.'); return;
    }
    if(!confirm('Dosyadaki ilerleme bu cihazdakiyle birleştirilsin mi? Hiçbir yıldız kaybolmaz.')) return;
    mergeProgress(data.state);
    const json = JSON.stringify(state);
    try{
      if(hostedStorage) window.storage.set(STORAGE_KEY, json, false);
      else if(localStore) localStore.setItem(STORAGE_KEY, json);
    }catch(e){}
    showToast('İlerleme yüklendi! Sayfa yenileniyor…');
    setTimeout(()=> location.reload(), 900);
  };
  reader.readAsText(f);
}
// Union of both progress states: earned stars are never lost.
function mergeProgress(saved){
  saved = cleanProgress(saved);
  Object.keys(state).forEach(k=>{
    const src = saved[k];
    if(!src || typeof src !== 'object') return;
    if(k === 'days'){
      Object.keys(src).forEach(d=>{
        const a = state.days[d], b = src[d];
        if(!b || typeof b !== 'object') return;
        if(!a){ state.days[d] = b; return; }
        a.s = (a.s || [0,0,0,0,0]).map((v, i)=> (v || (b.s||[])[i]) ? 1 : 0);
        a.n = Math.max(a.n || 0, b.n || 0);
        a.bonus = a.bonus || b.bonus;
      });
      return;
    }
    Object.keys(src).forEach(id=>{ if(src[id]) state[k][id] = src[id]; });
  });
}

/* ============ Start-up (called from init() once the suras are built) ============ */
function initVoices(){
  addSuraVoiceBoxes();
  loadVoices();
}
