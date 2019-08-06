// https://greensock.com/docs/TweenMax

(function () {
  document.addEventListener('DOMContentLoaded', (event) => {
    var observerTargets = document.querySelectorAll('.js-observe')
    var caption = document.querySelector('.js-animate-caption')
    var sidebarTitle = document.querySelectorAll('.js-animate-sidebarTitle')
    var gpsButtons = document.querySelectorAll('.js-animate-gps')
    var socialButtons = document.querySelectorAll('.js-animate-social')
    var postFooter = document.querySelectorAll('.js-animate-footer')
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
        // content
        if (entry.target.classList.contains('js-observe-content') && entry.isIntersecting) {
          TweenMax.to(gpsButtons, 0.5, {
            opacity: 1,
            transform: 'scale(1)',
            delay: 0.5
          })
          TweenMax.to(socialButtons, 0.5, {
            opacity: 1,
            transform: 'scale(1)',
            delay: 0.5
          })
          TweenMax.to(sidebarTitle, 0.5, { right: 0, opacity: 1 })
        }
        // footer
        if (entry.target.classList.contains('js-observe-footer') && entry.isIntersecting) {
          TweenMax.to(postFooter, 0.5, {
            opacity: 1,
            transform: 'scale(1)'
          })
        }
      })
    }
  
    Array.from(observerTargets).forEach(function (target) {
      var observer = new IntersectionObserver(callback, options)
      observer.observe(target)
    })

  
    TweenMax.to(caption, 0, {
      right: '-100%',
    })
    TweenMax.to(gpsButtons, 0, {
      opacity: 0,
      transform: 'scale(0)'
    })
    TweenMax.to(socialButtons, 0, {
      opacity: 0,
      transform: 'scale(0)'
    })
    TweenMax.to(sidebarTitle, 0, {
      position: 'relative', 
      right: -50,
      opacity: 0
    })
    TweenMax.to(postFooter, 0, {
      opacity: 0,
      transform: 'scale(0)'
    })
  })
})()