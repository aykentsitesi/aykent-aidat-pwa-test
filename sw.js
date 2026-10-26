const CACHE_NAME = "aykent-pwa-shell-v1";

// Do not cache HTML, API responses, or resident-specific data.
// This ensures each launch can fetch the latest server data.
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name.startsWith("aykent-") && name !== CACHE_NAME)
      .map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

// Intentionally no fetch handler: personal and API data are not cached.
