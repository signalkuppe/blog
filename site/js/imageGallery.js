(function () {
  new Colcade( '.c-imageGallery', {
    columns: '.c-imageGallery-col',
    items: '.c-imageGallery-item'
  })
  baguetteBox.run('.c-imageGallery', {
    filter: /.*[contentful].*/i,
    overlayBackgroundColor: 'rgba(0,0,0,1)',
    afterShow: function () {
      document.body.style.overflow = 'hidden'
    },
    afterHide: function () {
      document.body.style.overflow = 'visible'
    }
  })
})()