importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')

if (workbox) {
  console.log(`Service worker loaded 🎉`)

  workbox.core.skipWaiting()
  workbox.core.clientsClaim()
  workbox.precaching.precacheAndRoute([]) // filled by service-worker-build.js

  // Cache the Google Fonts webfont files with a cache first strategy for 1 year.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
      cacheName: `signalkuppe`,
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
        })
      ]
    })
  )

  // Use a StaleWhileRevalidate strategy as default
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