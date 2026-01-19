// /BaseDatos/sw.js

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// requerido por Chrome para "installability"
self.addEventListener("fetch", (event) => {
  // passthrough
});

// ✅ AQUÍ lo importante: recibir push y mostrar notificación
self.addEventListener("push", (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch {}

  const title = data.title || "🎂 Cumpleaños";
  const body  = data.body  || "Hoy hay cumpleaños.";
  const url   = data.url   || "/BaseDatos/";

  const options = {
    body,
    icon: "/BaseDatos/icons/icon-192.png",
    badge: "/BaseDatos/icons/icon-192.png",
    data: { url },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// ✅ click en notificación => abrir la app
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/BaseDatos/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes("/BaseDatos/") && "focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
