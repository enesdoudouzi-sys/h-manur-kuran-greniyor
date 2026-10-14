// Read-aloud for stories: Kıssalar, Sahâbe, Bilgi cards, the Osmanlı story
// cards and ilahi stories get a "🔊 Dinle" button. Sentences are spoken with a
// Turkish voice one by one and highlighted. Loaded after ilahi.js; started via
// initReader() from init().

let trVoice = null;
function pickTrVoice(){
  if(!('speechSynthesis' in window)) return;
  const vs = window.speechSynthesis.getVoices();
  trVoice = vs.find(v=> /^tr(-|_|$)/i.test(v.lang)) || null;
}
if('speechSynthesis' in window){
  pickTrVoice();
  window.speechSynthesis.addEventListener && window.speechSynthesis.addEventListener('voiceschanged', pickTrVoice);
}
let reading = null; // {root, k, units, slow}
let readSlow = false;
try{ readSlow = localStorage.getItem('humanur-read-slow') === '1'; }catch(e){}

// The parts of a story that are read, in order.
function readUnits(root){
  if(root.classList.contains('ex-story')) return [...root.querySelectorAll(':scope > h3, :scope > p, :scope > .ex-ders')];
  if(root.classList.contains('story-card')) return [...root.querySelectorAll('.story-title, .story-text')];
  return [root];
}
// Wraps every sentence in a span once, so it can be highlighted.
function splitSentences(el){
  if(el.dataset.rdSplit) return;
  el.dataset.rdSplit = '1';
  if(el.children.length && !el.classList.contains('ex-ders')) return;
  const walk = node=>{
    [...node.childNodes].forEach(c=>{
      if(c.nodeType === 3){
        const parts = c.textContent.split(/(?<=[.!?…])\s+/).filter(x=> x.trim());
        if(!parts.length) return;
        const frag = document.createDocumentFragment();
        parts.forEach((t, i)=>{ const sp = document.createElement('span'); sp.className = 'rd-s'; sp.textContent = t + (i < parts.length - 1 ? ' ' : ''); frag.appendChild(sp); });
        node.replaceChild(frag, c);
      }else if(c.nodeType === 1 && !c.classList.contains('arabic') && c.tagName !== 'BUTTON') walk(c);
    });
  };
  walk(el);
}
function readSentences(root){
  const out = [];
  readUnits(root).forEach(u=>{
    splitSentences(u);
    const ss = u.querySelectorAll('.rd-s');
    if(ss.length) ss.forEach(s=> out.push(s)); else if(u.textContent.trim()) out.push(u);
  });
  return out;
}
function stopReading(){
  const r = reading;
  reading = null;
  if('speechSynthesis' in window) window.speechSynthesis.cancel();
  document.querySelectorAll('.rd-on').forEach(e=> e.classList.remove('rd-on'));
  if(r && r.btn) r.btn.innerHTML = '🔊 Dinle';
}
function readAloud(btn){
  const root = btn.closest('.ex-story, .story-card, .il-story-wrap');
  if(!root) return;
  if(reading && reading.root === root){ stopReading(); return; }
  stopReading();
  if(typeof stopAudio === 'function') stopAudio();
  if(typeof stopLines === 'function') stopLines();
  if(!('speechSynthesis' in window)){ showToast('Bu cihazda sesli okuma desteklenmiyor.'); return; }
  if(!trVoice) pickTrVoice();
  if(!trVoice && !readAloud._hinted){ readAloud._hinted = true; showToast('İpucu: Daha güzel ses için cihaza Türkçe ses paketi yükleyebilirsin.'); }
  const target = root.classList.contains('il-story-wrap') ? root.querySelector('.il-story') : root;
  const token = {root, btn, k:0, list:readSentences(target)};
  reading = token;
  btn.innerHTML = '■ Durdur';
  const step = ()=>{
    if(reading !== token) return;
    document.querySelectorAll('.rd-on').forEach(e=> e.classList.remove('rd-on'));
    if(token.k >= token.list.length){ stopReading(); return; }
    const el = token.list[token.k];
    el.classList.add('rd-on');
    el.scrollIntoView({block:'center', behavior:'smooth'});
    const u = new SpeechSynthesisUtterance(el.textContent.replace(/[؀-ۿ]+/g, ' '));
    u.lang = trVoice ? trVoice.lang : 'tr-TR';
    if(trVoice) u.voice = trVoice;
    u.rate = readSlow ? 0.75 : 0.95;
    u.onend = ()=>{ if(reading === token){ token.k++; step(); } };
    u.onerror = e=>{ if(reading !== token) return; if(e.error === 'interrupted' || e.error === 'canceled') stopReading(); else { token.k++; step(); } };
    window.speechSynthesis.speak(u);
  };
  step();
}
function toggleSlow(btn){
  readSlow = !readSlow;
  try{ localStorage.setItem('humanur-read-slow', readSlow ? '1' : '0'); }catch(e){}
  document.querySelectorAll('.rd-slow').forEach(b=> b.classList.toggle('on', readSlow));
}
const readBar = ()=> `<div class="rd-bar"><button type="button" class="rd-btn" onclick="event.stopPropagation();readAloud(this)">🔊 Dinle</button><button type="button" class="rd-slow ${readSlow ? 'on' : ''}" onclick="event.stopPropagation();toggleSlow(this)" aria-label="Yavaş oku" title="Yavaş oku">🐢</button></div>`;

// Adds the read button to every story on screen that does not have one yet.
function addReadButtons(){
  document.querySelectorAll('.ex-story, .story-card, .il-story').forEach(el=>{
    if(el.classList.contains('il-story') ? el.parentElement.classList.contains('il-story-wrap') : el.querySelector('.rd-bar')) return;
    if(el.classList.contains('story-card') && !el.querySelector('.story-text')) return;
    if(el.classList.contains('il-story')){
      const wrap = document.createElement('div');
      wrap.className = 'il-story-wrap';
      el.replaceWith(wrap);
      wrap.appendChild(el);
      wrap.insertAdjacentHTML('afterbegin', readBar());
      return;
    }
    const h = el.querySelector(':scope > h3, .story-title');
    if(h) h.insertAdjacentHTML('afterend', readBar()); else el.insertAdjacentHTML('afterbegin', readBar());
  });
  // A re-rendered story loses its content: stop reading it.
  if(reading && !reading.root.isConnected) stopReading();
}

function initReader(){
  let queued = false;
  const obs = new MutationObserver(()=>{
    if(queued) return;
    queued = true;
    requestAnimationFrame(()=>{ queued = false; addReadButtons(); });
  });
  obs.observe(document.querySelector('main') || document.body, {childList:true, subtree:true});
  addReadButtons();
  const _close = closeStage;
  closeStage = function(){ stopReading(); _close(); };
}
