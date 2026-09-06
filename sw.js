const CACHE_NAME = "earnpath-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./freelancing.html",
  "./affiliate-marketing.html",
  "./digital-products.html",
  "./facebook-business.html",
  "./fashion.html",
  "./real-estate.html",
  "./skills.html",
  "./ai-tools.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
