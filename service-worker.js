// Choose a cache name
const cacheName = 'cache-v2.0';
// List the files to precache
const precacheResources = 
 ['/', 
  '/index.html', 
  '/css/style.css', 
  '/js/app.js', 
  '/js/guidelines.json',
  '/site.webmanifest', 
  '/favicon.ico',
  '/img/android-chrome-192x192.png'
];

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
  console.log('Service worker install event!');
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activate event!');
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
  // console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    }),
  );
});