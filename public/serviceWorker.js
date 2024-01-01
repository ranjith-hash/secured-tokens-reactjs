// public/service-worker.js
const CACHE_NAME = "token-cache";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(["/"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SAVE_TOKEN") {
    caches.open(CACHE_NAME).then((cache) => {
      cache.put("/token", new Response(event.data.token));
    });
  }

  if (event.data && event.data.type === "GET_TOKEN") {
    event.ports[0].postMessage("Getting token...");

    caches.match("/token").then((response) => {
      if (response) {
        response.text().then((token) => {
          event.ports[0].postMessage(token);
        });
      } else {
        event.ports[0].postMessage(null);
      }
    });
  }
});
