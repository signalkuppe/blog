const hero = document.getElementById('js-postHero');
const headerHeight = getCssVar('--header-height');

let windowWidth = window.innerWidth;

function onResize() {
    // ios fix
    if (windowWidth !== window.innerWidth) {
        setHeroSize();
        windowWidth = window.innerWidth;
    }
}

function setHeroSize() {
    hero.style.height = `calc(${window.outerHeight}px - ${headerHeight})`;
}

if (IS_SAFARI) {
    console.log(window);
    setHeroSize();
    window.addEventListener('resize', debounce(onResize, 250));
}
