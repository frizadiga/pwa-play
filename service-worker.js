const cacheName = "v1";
const filesToCache = [
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

// self.addEventListener('fetch', event => {
//   // Prevent the default, and handle the request ourselves.
//   event.respondWith(async function() {
//     // Try to get the response from a cache.
//     const cachedResponse = await caches.match(event.request);
//     // Return it if we found one.
//     if (cachedResponse) return cachedResponse;
//     // If we didn't find a match in the cache, use the network.
//     return fetch(event.request);
//   }());
// });
