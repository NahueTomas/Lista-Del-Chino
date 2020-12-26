const nombreCache = 'lista-v16'
const archivos = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/lista.js',
    '/css/styles.css',
    '/img/trash-icon.png',
    '/img/icons/icon-72.png',
    '/img/icons/icon-120.png',
    '/img/icons/icon-128.png',
    '/img/icons/icon-152.png',
    '/img/icons/icon-196.png',
    '/img/icons/icon-256.png',
    '/img/icons/icon-512.png',
    '/error.html',
    '/manifest.json'
]

self.addEventListener('install', e=>{
    e.waitUntil(
        caches.open(nombreCache)
            .then(cache => cache.addAll(archivos))
    )
})

self.addEventListener('activate', e=>{
    const cacheWhiteList =[nombreCache]
    e.waitUntil(
        caches.keys()
            .then(cachesNames => {
                cachesNames.map(cacheName=>{
                    if (cacheWhiteList.indexOf(cacheName) === -1){
                        return caches.delete(cacheName)
                    }
                })
    })
    )
})

self.addEventListener('fetch', e=>{
    console.log('petición')
    e.respondWith(
        caches.match(e.request)
            .then(respuestaCache => respuestaCache)
            .catch( () => caches.match('error.html'))
    )
})
