importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')

if (workbox) {
  console.log(`Service worker loaded 🎉`)

  const cachePrefix = 'signalkuppe'
  workbox.core.skipWaiting()
  workbox.core.clientsClaim()
  workbox.precaching.precacheAndRoute([]) // filled by service-worker-build.js
  workbox.core.setCacheNameDetails({
    prefix: cachePrefix,
    precache: 'pre-cache'
  })

  
  // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: `${cachePrefix}-google-fonts-stylesheets`
    })
  )

  // Cache the Google Fonts webfont files with a cache first strategy for 1 year.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
      cacheName: `${cachePrefix}-google-fonts-webfonts`,
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
  
  // cache css and js assets minified by netlify
  workbox.routing.registerRoute(
    /.*(?:cloudfront)\.net/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: `${cachePrefix}-netlify-assets`
    })
  )


  // Use a network only strategy as default
  workbox.routing.setDefaultHandler(
    new workbox.strategies.NetworkFirst()
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