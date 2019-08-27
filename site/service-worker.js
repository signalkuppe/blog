importScripts('/node_modules/workbox-sw/build/workbox-sw.js')

if (workbox) {
  console.log(`Service worker caricato 🎉`)
  const cachePrefix = 'signalkuppe-'

  // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: `${cachePrefix}google-fonts-stylesheets`
    })
  )

  // Cache the Google Fonts webfont files with a cache first strategy for 1 year.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
      cacheName: 'google-fonts-webfonts',
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
      cacheName: `${cachePrefix}css-js`
    })
  )
  
  // cache images
  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|webp|svg|ico)$/,
    new workbox.strategies.CacheFirst({
      cacheName: `${cachePrefix}images`,
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        })
      ]
    })
  )

  // cache contentful images
  workbox.routing.registerRoute(
    /^https:\/\/images\.ctfassets\.net/,
    new workbox.strategies.CacheFirst({
      cacheName: `${cachePrefix}images`,
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        })
      ]
    })
  )
  
  // cache html
  workbox.routing.registerRoute(
    /.*?/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: `${cachePrefix}html`,
      plugins: [
        new workbox.cacheableResponse.Plugin({
          headers: {
            'Content-Type': 'text/html'
          }
        })
      ]
    })
  );
} else {
  console.log(`Service worker non caricato 😬`)
}