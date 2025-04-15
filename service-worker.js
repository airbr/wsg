self.addEventListener('install', () => {
  // Skip over the "waiting" lifecycle state, to ensure that our
  // new service worker is activated immediately, even if there's
  // another tab open controlled by our older service worker code.
  console.log('Installing no-op Service Worker')
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  // Optional: Get a list of all the current open windows/tabs under
  // our service worker's control, and force them to reload.
  // This can "unbreak" any open windows/tabs as soon as the new
  // service worker activates, rather than users having to manually reload.
  self.clients.matchAll({
    type: 'window'
  }).then(windowClients => {
    windowClients.forEach((windowClient) => {
      windowClient.navigate(windowClient.url);
    });
  });
});

// // Choose a cache name
// const cacheName = 'cache-v0.95';
// // List the files to precache
// const precacheResources = 
//  ['/', 
//   '/index.html', 
//   '/css/style.css', 
//   '/js/app.js', 
//   '/js/guidelines.json',
//   '/site.webmanifest', 
//   '/favicon.ico',
//   '/img/android-chrome-192x192.png'
// ];

// // When the service worker is installing, open the cache and add the precache resources to it
// self.addEventListener('install', (event) => {
//   console.log('Service worker install event!');
//   event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
// });

// self.addEventListener('activate', (event) => {
//   console.log('Service worker activate event!');
// });

// // When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
// self.addEventListener('fetch', (event) => {
//   // console.log('Fetch intercepted for:', event.request.url);
//   event.respondWith(
//     caches.match(event.request).then((cachedResponse) => {
//       // TODO: Fix Cache Control Header
//       // if (cachedResponse) {
//       //   return cachedResponse;
//       // }
//       return fetch(event.request);
//     }),
//   );
// });