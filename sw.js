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

self.addEventListener("push", (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch {}

  const title = data.title || "🎂 Cumpleaños";
  const options = {
    body: data.body || "Hoy hay un cumpleaños",
    icon: "./icono-192.png",
    badge: "./icono-192.png",
    data: data.data || {},
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      // Si ya hay una pestaña abierta, la enfocamos
      for (const client of clients) {
        if ("focus" in client) return client.focus();
      }
      // Si no hay, abrimos la app
      if (self.clients.openWindow) return self.clients.openWindow("./");
    })
  );
});
