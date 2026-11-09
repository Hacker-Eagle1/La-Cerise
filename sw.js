// La Cerise Service Worker
const CACHE_NAME = 'la-cerise-v1';
const ASSETS = [
  './menu.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
  // Add any other local files (like a logo .png) here
];

// Install: Cache the core files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching La Cerise assets...');
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch: Serve from cache if available, otherwise network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match('./menu.html')) // Fallback to menu page
  );
});