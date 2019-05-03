(function () {
  document.addEventListener('DOMContentLoaded', (event) => {
    baguetteBox.run('.c-imageGallery', {
      filter: /.*[cloudinary].*/i,
      overlayBackgroundColor: 'rgba(0,0,0,1)',
      afterShow: function () {
        document.body.style.overflowX = 'hidden'
      },
      afterHide: function () {
        document.body.style.overflowX = 'auto'
      }
    })
  })
})()