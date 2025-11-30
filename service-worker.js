// Actualizado a v2 para forzar actualización
const CACHE_NAME = 'villancicos-jerez-v2';

const urlsToCache = [
  // Archivos esenciales
  './',
  './index.html',
  './manifest.json',
  './service-worker.js',

  // Iconos
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './icons/favicon.ico',

  // LISTADO COMPLETO DE LETRAS
  './letras/al-pasar-por-casablanca.html',
  './letras/calle-de-San-Francisco.html',
  './letras/Camina-la-virgen-pura.html',
  './letras/de-las-doce-palabras-retorneadas.html',
  './letras/pestinos-alfajores.html',
  './letras/tu-carita-divina.html',
  './letras/Dime-niño.html',
  './letras/el-ayayay.html',
  './letras/el-cura-no-va-a-la-iglesia.html',
  './letras/el-melo-melo.html',
  './letras/el-rio-de-Caruja.html',
  './letras/estando-un-curita.html',
  './letras/hacia-Roma-caminan-los-peregrinos.html',
  './letras/jardín-de-Venus.html',
  './letras/la-hojita-verde.html',
  './letras/la-Micaela.html',
  './letras/leru-leru.html',
  './letras/levanta-la-hoja.html',
  './letras/los-caminos-se-hicieron.html',
  './letras/los-campanilleros.html',
  './letras/los-segadores.html',
  './letras/madroños-al-niño.html',
  './letras/marinerito-ramiré.html',
  './letras/mi-carbonero.html',
  './letras/señor-Don-Gato.html',
  './letras/un-pastor-lleva-una burra.html'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cacheando archivos...');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.error('Error cacheando:', err))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Borrando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request);
      })
  );
});