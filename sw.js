// /basedatoscel/sw.js
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// ✅ Fetch handler requerido por Chrome para "installability"
// ❌ No usamos caches.open ni caches.match => NO persistencia
self.addEventListener("fetch", (event) => {
  // passthrough: que todo vaya a la red
});
