(function() {
  new Colcade(".c-imageGallery", {
    columns: ".c-imageGallery-col",
    items: ".c-imageGallery-item"
  });
  var imagesLoaded = 0;
  var images = Array.from(document.querySelectorAll(".js-gallery-img"));
  var galleryContainer = document.querySelector(".c-post-imageGallery");
  var galleryLoading = document.querySelector(".c-imageGallery-loading");
  galleryContainer.style.opacity = 0;
  images.forEach(function(img) {
    img.onload = function() {
      console.log("loaded", imagesLoaded);
      imagesLoaded++;
      if (imagesLoaded === images.length) {
        galleryContainer.style.opacity = 1;
        galleryLoading.style.display = "none";
      }
    };
  });

  baguetteBox.run(".js-gallery", {
    filter: /.*[contentful].*/i,
    overlayBackgroundColor: "rgba(0,0,0,0.9)",
    noScrollbars: true,
    onChange: function(currentIndex, count) {
      // customize botton icons and add a download button
      var downloadButton = document.getElementById("download-button");
      if (!downloadButton) {
        downloadButton = document.createElement("a");
      }
      var parentDiv = document.getElementById("baguetteBox-overlay");
      var figureDiv = document.getElementById(
        "baguetteBox-figure-" + currentIndex
      );
      downloadButton.setAttribute("id", "download-button");
      downloadButton.setAttribute("class", "baguetteBox-button");
      downloadButton.setAttribute(
        "title",
        "Scarica la foto ad alta risoluzione"
      );
      downloadButton.setAttribute(
        "href",
        figureDiv
          .querySelector("img")
          .getAttribute("src")
          .split("?")[0]
      );
      downloadButton.setAttribute("target", "_blank");
      downloadButton.setAttribute("rel", "noopener");
      downloadButton.innerHTML =
        '<svg viewBox="0 0 482.239 482.239" xmlns="http://www.w3.org/2000/svg"><path d="M0 447.793h482.239v34.446H0zM396.091 223.863l-24.287-24.354-113.462 113.462V0h-34.446v312.971L110.401 199.475l-24.22 24.354 154.938 155.073z"/></svg>';
      var CloseButton = document.getElementById("close-button");
      CloseButton.innerHTML =
        '<svg viewBox="0 0 413.348 413.348" xmlns="http://www.w3.org/2000/svg"><path d="M413.348 24.354L388.994 0l-182.32 182.32L24.354 0 0 24.354l182.32 182.32L0 388.994l24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z"/></svg>';
      var nextButton = document.getElementById("next-button");
      var prevButton = document.getElementById("previous-button");
      nextButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.995 511.995"><path d="M381.039 248.62L146.373 3.287C142.29-.942 135.54-1.13 131.29 2.954c-4.25 4.073-4.396 10.823-.333 15.083L358.56 255.995 130.956 493.954c-4.063 4.26-3.917 11.01.333 15.083a10.63 10.63 0 007.375 2.958 10.65 10.65 0 007.708-3.292L381.039 263.37c3.938-4.125 3.938-10.625 0-14.75z"/></svg>';
      prevButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.991 511.991"><path d="M153.433 255.991L381.037 18.033c4.063-4.26 3.917-11.01-.333-15.083-4.229-4.073-10.979-3.896-15.083.333L130.954 248.616c-3.937 4.125-3.937 10.625 0 14.75L365.621 508.7a10.65 10.65 0 007.708 3.292c2.646 0 5.313-.979 7.375-2.958 4.25-4.073 4.396-10.823.333-15.083l-227.604-237.96z"/></svg>';
      parentDiv.insertBefore(downloadButton, CloseButton);
    }
  });
})();
