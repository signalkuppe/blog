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

document.addEventListener('post-section-reached', function (event) {
    // detect when we reach the post body
    if (
        event.detail.section === 'relazione' &&
        event.detail.direction === 'down'
    ) {
        showGoToTopLink();
    }
});

document.addEventListener('post-section-exit', function (event) {
    // detect when we exit the post body
    if (
        event.detail.section === 'relazione' &&
        event.detail.direction === 'up'
    ) {
        hideGoToTopLink();
    }
});

goToTopLink.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo(0, -15);
    hideGoToTopLink();
});
