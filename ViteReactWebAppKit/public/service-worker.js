self.addEventListener('install', function (event) {
  console.log('Service worker installing...', event);

  event.waitUntil(
    caches
      .open("v1")
      .then(function (cache) {
        var urlsToCache = [
          "/",
          "/icon-192x192.png",
          "/icon-512x512.png",
          "/manifest.json",
        ];
        return cache.addAll(urlsToCache);
      })
      .catch(function (error) {
        console.error("Failed to cache:", error);
      })
  );
});

self.addEventListener('push', function (event) {
  var data = event.data.json();
  var options = {
    body: data.body,
    icon: './favicon.ico',
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('activate', function (event) {
  console.log('Service worker activating...', event);
});

self.addEventListener('fetch', function (event) {
  console.log('Fetching:', event.request.url);
});
