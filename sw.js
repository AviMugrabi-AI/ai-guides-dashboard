const CACHE_NAME = 'ai-guides-v2';
const ASSETS = [
    './',
    './index.html',
    './styles.css',
    './script.js',
    './glossary-extra.js',
    './features.js',
    './mega-features.js',
    './manifest.json'
];

// Install - cache all assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate - clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

// Fetch - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cached) => {
            return cached || fetch(event.request).then((response) => {
                const clone = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                return response;
            });
        }).catch(() => {
            return new Response('<h1 style="text-align:center;font-family:sans-serif;color:#6c5ce7;padding:2rem;">📱 אין חיבור - תוכן שמור זמין</h1>', 
                { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
        })
    );
});
