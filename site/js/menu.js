(function() {
  document.addEventListener('DOMContentLoaded', (event) => {
    const buttonOpen = document.getElementById('menu-button')
    const menu = document.getElementById('menu')
    const closeIcon = document.getElementById('menu-closeIcon')
    const openIcon = document.getElementById('menu-openIcon')
    const closedClass = 'is-closed'
    menu.classList.add(closedClass)
    menu.classList.remove('is-hidden')
    const openMenu = () => {
      menu.setAttribute('tabindex', -1)
      buttonOpen.setAttribute('aria-expanded', true)
      buttonOpen.setAttribute('aria-label', 'Chiudi il menu di navigazione')
      menu.focus()
      openIcon.setAttribute('hidden', true)
      closeIcon.removeAttribute('hidden')
    }
    const closeMenu = () => {
      menu.classList.add(closedClass)
      menu.removeAttribute('tabindex')
      buttonOpen.setAttribute('aria-expanded', false)
      buttonOpen.setAttribute('aria-label', 'Apri il menu di navigazione')
      closeIcon.setAttribute('hidden', true)
      openIcon.removeAttribute('hidden')
    }
    const onClick = (e) => {
      menu.classList.toggle(closedClass)
      const isClosed = menu.classList.contains(closedClass) ? false : true
      if (isClosed) {
        openMenu()
      } else {
        closeMenu()
      }
      e.preventDefault()
    }
    const onBlur = (e) => {
      closeMenu()
    }
    buttonOpen.addEventListener('mousedown', onClick)
    buttonOpen.addEventListener('touchstart', onClick)
    menu.addEventListener('blur', onBlur)
    document.addEventListener('keyup', (event) => {
      if (event.keyCode === 27) {
        closeMenu()
      }
    })
  })
})()
