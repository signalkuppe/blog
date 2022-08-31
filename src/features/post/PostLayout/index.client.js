const hero = document.getElementById('js-postLayout-hero');
const doesNotSupportSvh = !CSS.supports('height', '100svh');

function onResize() {
    hero.style.height = `calc(${window.innerHeight}px - ${getComputedStyle(
        document.documentElement,
    ).getPropertyValue('--header-height')})`;
    hero.style.opacity = 1;
}

if (doesNotSupportSvh) {
    onResize();
    window.addEventListener('resize', debounce(onResize, 250));
}
