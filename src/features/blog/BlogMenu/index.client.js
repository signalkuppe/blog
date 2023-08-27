const menu = document.querySelectorAll('.js-blogMenu-item');
Array.from(menu).forEach((item) => (item.style.display = 'none'));
document.fonts.ready.then(function () {
    // prevent menu layout shifts
    Array.from(menu).forEach((item) => item.removeAttribute('style'));
});
