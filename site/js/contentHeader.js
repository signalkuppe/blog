(function () {
  /*
  * we need to detect when to show the page title in portrait mode
  * since is hidden unitl the cover goes off the viewport
  */
  document.addEventListener('DOMContentLoaded', (event) => {
    var header = document.querySelector('#contentHeader')
    var root = null
    var target = document.querySelector('.c-cover')
    var stickyClass = 'js-is-sticky'
    var callback = function (entries, observer) { 
      entries.forEach( function (entry) {
        if (!entry.isIntersecting) {
          header.classList.add(stickyClass)
        } else {
          header.classList.remove(stickyClass)
        }
      })
    }

    var options = {
      root: root,
      rootMargin: '0px',
      threshold: 0
    }
    
    var observer = new IntersectionObserver(callback, options);
    observer.observe(target);
  })
})()