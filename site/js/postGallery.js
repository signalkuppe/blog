(function () {
  document.addEventListener('DOMContentLoaded', (event) => {
    baguetteBox.run('.c-imageGallery', {
      filter: /.*[cloudinary].*/i,
      overlayBackgroundColor: 'rgba(0,0,0,0.9)'
    })
  })
})()