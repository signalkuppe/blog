(function () {
  document.addEventListener('DOMContentLoaded', (event) => {
    document.body.style.overflowX = 'hidden' // masonry fix
    document.body.style.width = '100vw'
    new Colcade( '.c-imageGallery', {
      columns: '.c-imageGallery-col',
      items: '.c-imageGallery-item'
    })
    baguetteBox.run('.c-imageGallery', {
      filter: /.*[cloudinary].*/i,
      overlayBackgroundColor: 'rgba(0,0,0,1)',
      noScrollbars: true,
      bodyClass: 'js-is-galleryOpen'
    })
  })
})()