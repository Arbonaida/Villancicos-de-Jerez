const CACHE_NAME = 'villancicos-jerez-v1';
const urlsToCache = [
  // Archivos esenciales
  '/',
  '/index.html',
  '/manifest.json',
  '/service-worker.js',
  // Archivos de letras (para acceso offline)
  '/letras/tu-carita-divina.html',
  '/letras/la-hojita-verde.html',
  '/letras/pestinos-alfajores.html',
  // Archivos de iconos
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Evento: Instalación (Caching inicial)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache Abierta:', CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento: Fetch (Servir desde Cache primero)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Evento: Activación (Limpieza de caches antiguas)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});