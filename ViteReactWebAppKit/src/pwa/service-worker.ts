declare const self: ServiceWorkerGlobalScope;
self.addEventListener('install', (event: ExtendableEvent) => {
    console.log('Service worker installing...', "event");

    event.waitUntil(
        caches
            .open("v1")
            .then((cache) => {
                const urlsToCache = [
                    "/",
                    "/icon-192x192.png",
                    "/icon-512x512.png",
                    "/manifest.json",
                ];
                return cache.addAll(urlsToCache);
            })
            .catch((error) => {
                console.error("Failed to cache:", error);
            }),
    );
});


self.addEventListener('push', function (event: PushEvent) {
    const data = event.data!.json();
    const options = {
        body: data.notification.body,
        icon: data.notification.icon
    };
    event.waitUntil(
        self.registration.showNotification(data.notification.title, options)
    );
});

self.addEventListener('activate', (event: ExtendableEvent) => {
    console.log('Service worker activating...', event);
});

self.addEventListener('fetch', (event: FetchEvent) => {
    console.log('Fetching:', event.request.url);
});

