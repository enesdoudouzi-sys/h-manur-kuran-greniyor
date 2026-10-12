// App shell is served network-first (so updates arrive immediately) with a
// cache fallback for offline use. Fonts are cached after first load.
const CACHE = 'humanur-v6';
const SHELL = ['./', 'index.html', 'style.css', 'script.js', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png', 'extra.js'];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=> c.addAll(SHELL)).then(()=> self.skipWaiting()));
});

self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=> Promise.all(keys.filter(k=> k !== CACHE).map(k=> caches.delete(k))))
      .then(()=> self.clients.claim())
  );
});

self.addEventListener('fetch', e=>{
  const req = e.request;
  if(req.method !== 'GET') return;
  const url = new URL(req.url);

  if(url.origin === self.location.origin){
    e.respondWith(
      fetch(req).then(res=>{
        if(res.ok){ const copy = res.clone(); caches.open(CACHE).then(c=> c.put(req, copy)); }
        return res;
      }).catch(()=> caches.match(req).then(r=> r || caches.match('index.html')))
    );
    return;
  }

  if(url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com'){
    e.respondWith(
      caches.match(req).then(cached=> cached || fetch(req).then(res=>{
        const copy = res.clone();
        caches.open(CACHE).then(c=> c.put(req, copy));
        return res;
      }))
    );
  }
});
