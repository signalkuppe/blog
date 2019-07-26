(function () {
  document.addEventListener('DOMContentLoaded', (event) => {
    new Colcade( '.c-masonryGallery', {
      columns: '.c-masonryGallery-col',
      items: '.c-masonryGallery-item'
    })
    baguetteBox.run('.c-masonryGallery', {
      filter: /.*[cloudinary].*/i,
      overlayBackgroundColor: 'rgba(0,0,0,1)',
      noScrollbars: true,
      bodyClass: 'js-is-galleryOpen'
    })
  })
})()