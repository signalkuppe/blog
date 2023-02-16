const hero = document.getElementById('js-postLayout-hero');
const goToTopLink = document.getElementById('js-postlayout-goToTop');
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

function hideGoToTopLink() {
    goToTopLink.classList.remove('js-is-visible');
}

function showGoToTopLink() {
    goToTopLink.classList.add('js-is-visible');
}

document.addEventListener('post-cover-intersecting', function (event) {
    if (!event.detail.isIntersecting) {
        showGoToTopLink();
    } else {
        hideGoToTopLink();
    }
});

goToTopLink.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo(0, -15);
    hideGoToTopLink();
});
