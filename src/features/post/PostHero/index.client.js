const hero = document.getElementById('js-postHero');
const header = document.getElementById('js-header');

const windowWidth = window.innerWidth;
const headerHeight = header.getBoundingClientRect().height;

function onResize() {
    // ios fix
    if (windowWidth !== window.innerWidth) {
        setHeroSize();
        windowWidth = window.innerWidth;
    }
}

function setHeroSize() {
    hero.style.height = `${window.outerHeight - headerHeight}px`;
}

setHeroSize();
window.addEventListener('resize', debounce(onResize, 250));
