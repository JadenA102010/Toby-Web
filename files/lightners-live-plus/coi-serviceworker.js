// Minimal COOP/COEP service worker. Rewrites same-origin responses with the
// headers needed for SharedArrayBuffer / Godot's threaded web build.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.cache === "only-if-cached" && req.mode !== "same-origin") return;
  e.respondWith(
    fetch(req).then(res => {
      if (res.status === 0) return res;
    }).catch(() => fetch(req))
  );
});
