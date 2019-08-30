// https://greensock.com/docs/TweenMax

(function () {
  var observerTargets = document.querySelectorAll('.js-observe')
  var caption = document.querySelector('.js-animate-caption')
  var next = document.querySelector('.js-animate-next')
  var prev = document.querySelector('.js-animate-prev')
  var options = {
    threshold: 1.0
  }
  var callback = function (entries) {
    entries.forEach(entry => {
      // cover caption
      if (entry.target.classList.contains('js-observe-caption') && entry.isIntersecting && entry.intersectionRatio === 1) {
        TweenMax.to(caption, 1, {
          right: '0',
          ease: Back.easeOut.config(1)
        })
      }
      // post nav
      if (entry.target.classList.contains('js-observe-nav') && entry.isIntersecting && entry.intersectionRatio === 1) {
        if (next) {
          var tl = new TimelineLite()
          tl.to(next, 0.25, { position: 'relative', left: 25, delay: 0 })
          tl.to(next, 0.5, { left: 0 })
        }
        if (prev) {
          var tl = new TimelineLite()
          tl.to(prev, 0.25, { position: 'relative', left: -25, delay: 0.75 })
          tl.to(prev, 0.5, { left: 0 })
        }
      }
    })
  }

  Array.from(observerTargets).forEach(function (target) {
    var observer = new IntersectionObserver(callback, options)
    observer.observe(target)
  })

  TweenMax.to(caption, 0, {
    right: '-100%',
    overflowX: 'hidden'
  })
})()