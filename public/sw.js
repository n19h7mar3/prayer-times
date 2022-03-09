const assets = [
  "/",
  "/global.css",
  "/build/bundle.js",
  "/build/bundle.css",
  "/images/favicon.ico",
  "/images/favicon-16x16.png",
  "/images/favicon-32x32.png",
  "/images/apple-touch-icon.png",
  "/images/safari-pinned-tab.svg",
  "/images/android-chrome-192x192.png",
  "/images/android-chrome-256x256.png"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open("prayer-times").then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});