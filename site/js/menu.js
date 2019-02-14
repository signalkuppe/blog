(function() {
  document.addEventListener('DOMContentLoaded', (event) => {
    const buttonOpen = document.querySelector('#menu-open')
    const buttonClose = document.querySelector('#menu-close')
    const menu = document.querySelector('#menu')
    menu.classList.add('close:menu')
    menu.classList.remove('hidden')
    buttonOpen.addEventListener('click', (e) => {
      menu.classList.remove('close:menu')
    })
    buttonClose.addEventListener('click', (e) => {
      menu.classList.add('close:menu')
    })
  })
})()
