importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')

if (workbox) {
  console.log(`Service worker loaded 🎉`)

  workbox.core.skipWaiting()
  workbox.core.clientsClaim()

  workbox.precaching.precacheAndRoute([]) // filled by service-worker-build.js
  workbox.core.setCacheNameDetails({
    prefix: cachePrefix,
    precache: 'pre-cache'
  })

  // Use a cache first strategy as default
  workbox.routing.setDefaultHandler(
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'signalkuppe'
    })
  )

 // This "catch" handler is triggered when any of the other routes fail to generate a response
  workbox.routing.setCatchHandler(({ event }) => {
    switch (event.request.destination) {
      case 'document':
        return caches.match(workbox.precaching.getCacheKeyForURL('offline.html')) // serve the precached offline page
      default:
        return Response.error();
    }
  })

} else {
  console.log(`Service worker can’t be loaded 😬`)
}