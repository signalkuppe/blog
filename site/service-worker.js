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

  workbox.routing.registerRoute(
    /.*(?:cloudfront)\.net/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: `${cachePrefix}css-js`
    }),
  );
} else {
  console.log(`Service worker non caricato 😬`)
}