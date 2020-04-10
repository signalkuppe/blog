(function() {
  new Colcade(".c-imageGallery", {
    columns: ".c-imageGallery-col",
    items: ".c-imageGallery-item"
  });

  lightGallery(document.getElementById("gallery"), {
    selector: ".c-imageGallery-item a"
  });
})();
