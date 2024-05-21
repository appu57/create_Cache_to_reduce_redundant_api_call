const cacheName = 'cacheRequestResponse';
const urlsToCache = [
    '/',
    '/index.html',
    '/main.js'
]

self.addEventListener('install',event=>{
    event.waitUntil(
        caches.open(cacheName)
        .then(cache=>{
            console.log('Cache Opened');
            return cache.addAll(urlsToCache);
        })
    )
});

self.addEventListener('fetch',event=>{ //in angular/react use localStorage.getItem('cache')
    event.respondWith(
        caches.match(event.request)
        .then(response=>{
            if(response) //found in cache return the value
            {
                console.log("Response");
                return response;
            }
            //if not there in cache , fetch from api 
            return fetch(event.request);
        })
        .catch(error=>{
            console.log(error);
            return new Response('Something went wrong')
        })

    )
})