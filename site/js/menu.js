(function() {
  document.addEventListener('DOMContentLoaded', (event) => {
    const buttonOpen = document.querySelector('#menu-open')
    const buttonClose = document.querySelector('#menu-close')
    const menu = document.querySelector('#menu')
    const closedClass = 'is-closed'
    menu.classList.add(closedClass)
    menu.classList.remove('hidden')
    buttonOpen.addEventListener('click', (e) => {
      menu.classList.remove(closedClass)
      menu.setAttribute('tabindex', -1)
      buttonOpen.setAttribute('aria-expended', true)
      buttonClose.setAttribute('aria-expended', true)
      menu.focus()
      menu.addEventListener('blur', function (e) {
        if (!e.relatedTarget) {
          menu.classList.add(closedClass)
        }
      })
      e.preventDefault()
    })
    buttonClose.addEventListener('click', (e) => {
      menu.classList.add(closedClass)
      menu.removeAttribute('tabindex', -1)
      buttonOpen.setAttribute('aria-expended', false)
      buttonClose.setAttribute('aria-expended', false)
    })
  })
})()
