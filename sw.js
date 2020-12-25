const nombreCache = 'lista-v1'
const archivos = [
    '/',
    '/index.html',
    'sw.js',
    'manifest.json',
    '/js/app.js',
    '/js/lista.js',
    '/css/styles.css',
    '/img/trash-icon.png',
    '/img/icons/icon-512.png'
]

self.addEventListener('install', e=>{
    e.waitUntil(
        caches.open(nombreCache)
            .then(cache => cache.addAll(archivos))
    )
})

self.addEventListener('activate', e=>{    
})

self.addEventListener('fetch', e=>{
    console.log('petición')
    e.respondWith(
        caches.match(e.request)
            .then(respuestaCache => respuestaCache)
    )
})