// Service Worker — network-first for HTML, cache-first for static assets.
//
// Strategy:
//   - HTML pages: network-first with cache fallback (3s timeout). Returning
//     visitors ALWAYS see the latest content as long as they have a working
//     connection; if the network is dead they fall back to the cached copy,
//     or the /offline/ page if nothing's cached. This replaces the old
//     stale-while-revalidate strategy which was the root cause of visitors
//     seeing old content for one full visit after every site update.
//   - Static assets (fonts, images, CSS/JS): cache-first. These are
//     hash-named by Astro so a content change produces a new URL anyway,
//     making the cached entry safe to serve indefinitely.
//
// CACHE_VERSION is rewritten on every build by the postbuild script so old
// caches are evicted automatically when something ships.
const CACHE_VERSION = 'chiltern-__BUILD_ID__';
const HTML_NETWORK_TIMEOUT_MS = 3000;
const APP_SHELL = [
  '/',
  '/contact/',
  '/services/repairs/',
  '/offline/',
  '/favicon.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

function networkFirst(request) {
  return new Promise((resolve) => {
    let settled = false;
    const fetchPromise = fetch(request)
      .then((response) => {
        if (settled) return response;
        settled = true;
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone));
        }
        resolve(response);
        return response;
      })
      .catch(() => null);

    // If the network is slow, fall back to cache after the timeout.
    setTimeout(() => {
      if (settled) return;
      caches.match(request).then((cached) => {
        if (settled) return;
        if (cached) {
          settled = true;
          resolve(cached);
        }
        // else wait for network — it'll eventually resolve or fail
      });
    }, HTML_NETWORK_TIMEOUT_MS);

    fetchPromise.then((response) => {
      if (settled) return;
      if (response) return; // already resolved by the .then above
      // Network failed — last resort: cache or offline page
      caches.match(request).then((cached) => {
        if (settled) return;
        settled = true;
        if (cached) resolve(cached);
        else if (request.mode === 'navigate') {
          caches.match('/offline/').then((off) => resolve(off || new Response('Offline', { status: 503 })));
        } else {
          resolve(new Response('', { status: 504 }));
        }
      });
    });
  });
}

function cacheFirst(request) {
  return caches.match(request).then((cached) => {
    if (cached) return cached;
    return fetch(request).then((response) => {
      if (response && response.status === 200) {
        const clone = response.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone));
      }
      return response;
    });
  });
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.pathname.includes('/api/')) return;
  if (url.origin !== self.location.origin) return; // don't intercept cross-origin

  // Static assets — hash-named so safe to cache indefinitely
  if (url.pathname.match(/\.(woff2?|ttf|otf|webp|png|jpe?g|gif|svg|avif|css|js|ico)$/i)) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // Everything else (HTML pages, sitemap, etc.) — network-first
  event.respondWith(networkFirst(event.request));
});

// Allow the page to force-skip-waiting if a new SW is detected.
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
