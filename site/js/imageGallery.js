(function() {
  new Colcade(".c-imageGallery", {
    columns: ".c-imageGallery-col",
    items: ".c-imageGallery-item"
  });

  var imageIndex = 0;

  baguetteBox.run(".js-gallery", {
    filter: /.*[contentful].*/i,
    overlayBackgroundColor: "rgba(0,0,0,1)",
    noScrollbars: true
  });
})();
