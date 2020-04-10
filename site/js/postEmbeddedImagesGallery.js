Array.from(document.querySelectorAll(".c-post-image")).forEach(function(item) {
  lightGallery(item, {
    selector: "a",
    download: true,
    counter: false
  });
});
