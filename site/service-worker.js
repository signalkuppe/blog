importScripts('/node_modules/workbox-sw/build/workbox-sw.js')

if (workbox) {
  console.log(`Service worker caricato 🎉`)
  const cachePrefix = 'signalkuppe'
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
      cacheName: `${cachePrefix}-css-js-netlify`
    })
  )


} else {
  console.log(`Service worker non caricato 😬`)
}