// https://greensock.com/docs/TweenMax

(function() {
  var coverImage = document.getElementById("post-cover");
  var coverLoaded = false;
  var observerTargets = document.querySelectorAll(".js-observe");
  var caption = document.querySelector(".js-animate-caption");
  var gpxButton = document.querySelector(".js-animate-gpxButton");
  var next = document.querySelector(".js-animate-next");
  var prev = document.querySelector(".js-animate-prev");
  var offlineMsg = document.querySelector(".js-observe-offlineMsg");
  var options = {
    threshold: 1.0
  };
  coverImage.onload = function() {
    // cover caption
    coverLoaded = true;
    gsap.to(caption, 0.75, {
      right: "0",
      ease: Back.easeOut.config(1)
    });
    if (gpxButton) {
      gsap.to(gpxButton, 0.25, {
        delay: 1,
        transform: "translateX(0%)",
        ease: Back.easeOut.config(1)
      });
    }
  };
  var callback = function(entries) {
    entries.forEach(entry => {
      // post nav
      if (
        entry.target.classList.contains("js-observe-nav") &&
        entry.isIntersecting &&
        entry.intersectionRatio === 1
      ) {
        if (next) {
          var tl = new gsap.timeline();
          tl.to(next, 0.25, { position: "relative", left: 25, delay: 0 });
          tl.to(next, 0.5, { left: 0 });
        }
        if (prev) {
          var tl = new gsap.timeline();
          tl.to(prev, 0.25, { position: "relative", left: -25, delay: 0.75 });
          tl.to(prev, 0.5, { left: 0 });
        }
      }

      // offline message: show the offline msg only if we have the current url in cache
      if (
        entry.target.classList.contains("js-observe-offlineMsg") &&
        entry.isIntersecting &&
        entry.intersectionRatio === 1
      ) {
        if ("caches" in window) {
          const cacheName = "signalkuppe";
          const url = window.location.pathname;
          caches.open(cacheName).then(cache => {
            cache.match(url).then(item => {
              if (item) {
                gsap.to(offlineMsg, 0.8, {
                  delay: 0.5,
                  opacity: 1
                });
              } else {
                offlineMsg.style.display = "none";
              }
            });
          });
        }
      }
    });
  };

  Array.from(observerTargets).forEach(function(target) {
    var observer = new IntersectionObserver(callback, options);
    observer.observe(target);
  });

  gsap.to(caption, 0, {
    right: "-100%",
    overflowX: "hidden"
  });

  if (gpxButton) {
    gsap.to(gpxButton, 0, {
      transform: "translateX(-150%)",
      overflowX: "hidden"
    });
  }

  if (offlineMsg) {
    gsap.to(offlineMsg, 0, {
      opacity: 0
    });
  }
})();
