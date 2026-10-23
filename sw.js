// Bookorig service worker: works offline, receives PDFs shared from other apps.
// Bump VERSION whenever the files change so phones pick up the update.
const VERSION = '6';
const SHELL = 'bookorig-shell-' + VERSION;
const STATIC = 'bookorig-static';
const SHARE = 'bookorig-share';
const PRECACHE = [
  './', './index.html', './manifest.webmanifest', './fonts/fonts.css',
  './vendor/pdf.min.js', './vendor/pdf.worker.min.js', './vendor/page-flip.browser.js',
  './icons/icon-192.png', './icons/icon-512.png', './icons/favicon-64.png',
  './fonts/atkinson-hyperlegible-latin-400-normal.woff2',
  './fonts/atkinson-hyperlegible-latin-700-normal.woff2',
  './fonts/caveat-latin-500-normal.woff2',
  './fonts/caveat-latin-700-normal.woff2',
  './fonts/kalam-latin-400-normal.woff2',
  './fonts/kalam-latin-700-normal.woff2',
  './fonts/literata-latin-400-italic.woff2',
  './fonts/literata-latin-400-normal.woff2',
  './fonts/literata-latin-700-normal.woff2',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('bookorig-shell-') && k !== SHELL).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method === 'POST' && url.pathname.endsWith('/share-target')) { e.respondWith(receiveShare(req)); return; }
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;

  // Libraries and fonts never change for a given file name: serve from cache first.
  if (/\/(vendor|fonts|icons)\//.test(url.pathname)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(STATIC).then(c => c.put(req, copy)); }
      return res;
    })));
    return;
  }

  // The app itself: try the network so updates arrive, fall back to the saved copy offline.
  e.respondWith(
    fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(SHELL).then(c => c.put(req.mode === 'navigate' ? './index.html' : req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true })
      .then(hit => hit || (req.mode === 'navigate' ? caches.match('./index.html') : Response.error())))
  );
});

async function receiveShare(req) {
  try {
    const form = await req.formData();
    const cache = await caches.open(SHARE);
    let n = 0;
    for (const f of form.getAll('books')) {
      if (!f || typeof f === 'string' || !f.size) continue;
      await cache.put(new Request('./shared/' + Date.now() + '-' + (n++)), new Response(f, {
        headers: { 'content-type': f.type || 'application/pdf', 'x-name': encodeURIComponent(f.name || 'Shared book.pdf') }
      }));
    }
  } catch (err) { /* the page will say nothing arrived */ }
  return Response.redirect(new URL('./?shared=1', self.registration.scope).href, 303);
}
