self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed');
});

self.addEventListener('fetch', (e) => {
  // basic cache-less fetch
  e.respondWith(fetch(e.request));
});
