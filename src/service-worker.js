const cacheName = "v2";
const filesToCache = [
  './',
  'index.html',
  'main.js',
  'main.css'
];

const handleInstall = (event) => {
  console.log('Service Worker: Installed :D');

  const preCaches = async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(filesToCache);
    self.skipWaiting();

    console.log('Service Worker: Caching files :D');
  };

  event.waitUntil(preCaches());
};

const handleActivate = (event) => {
  console.log('Service Worker: Activated :D');
  
  const deleteOldCaches = async () => {
    const keyList = await caches.keys();

    return Promise.all(keyList.map((key) => {
      if (key !== cacheName) {
        console.log('[ServiceWorker] Removing old cache', key);
        return caches.delete(key);
      }
    }));
  };
  
  event.waitUntil(deleteOldCaches());
  return self.clients.claim();
};

const handleFetch = (event) => {
  console.log('Service Worker: Fetching', event.request.url);

  const handleResponse = async (event) => {
    const cachedResponse = await caches.match(event.request);

    if (cachedResponse) return cachedResponse;

    return fetch(event.request);
  };

  event.respondWith(handleResponse(event));
};

self.addEventListener('install', handleInstall);
self.addEventListener('activate', handleActivate);
self.addEventListener('fetch', handleFetch);
