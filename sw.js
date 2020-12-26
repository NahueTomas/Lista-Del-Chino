const nombreCache = 'lista-v21'
const archivos = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/lista.js',
    '/css/styles.css',
    '/img/trash-icon.png',
    '/img/icons/icon-512.png',
    '/error.html'
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
