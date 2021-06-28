// set year
document.getElementById('js-year').innerText = new Date().getFullYear();

// slide menu logics
const openButton = document.getElementById('js-mainMenu-openButton');
const closeButton = document.getElementById('js-mainMenu-closeButton');
const menuPanel = document.getElementById('js-mainMenu-panel');
const lastFocusableElement = document.getElementById('js-lastFocusableElement');

function onOutsideClick(e) {
    if (!e.target.closest('#js-mainMenu-panel')) {
        closeMenu();
    }
}

function onLastElementFocus(e) {
    if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        closeButton.focus(); // go to the top
    }
}

function onKeyDown(e) {
    if (e.key === 'Esc' || e.key === 'Escape') {
        closeMenu();
    }
}

function openMenu() {
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
    openButton.setAttribute('aria-expanded', true);
    menuPanel.classList.add('js-is-open');
    setTimeout(function () {
        document.addEventListener('click', onOutsideClick, false);
        closeButton.focus();
    }, 1);
    lastFocusableElement.addEventListener('keydown', onLastElementFocus);
    window.addEventListener('keydown', onKeyDown);
}

function closeMenu() {
    document.body.style.height = 'auto';
    document.body.style.overflow = 'visible';
    document.removeEventListener('click', onOutsideClick);
    lastFocusableElement.removeEventListener('keydown', onLastElementFocus);
    window.removeEventListener('keydown', onKeyDown);
    openButton.setAttribute('aria-expanded', false);
    menuPanel.classList.remove('js-is-open');
    setTimeout(function () {
        openButton.focus();
    }, 1);
}

openButton.addEventListener('click', function (e) {
    openMenu();
});

closeButton.addEventListener('click', function (e) {
    closeMenu();
});
