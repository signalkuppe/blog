window.addEventListener('DOMContentLoaded', () => {
    const hero = document.getElementById('js-postLayout-hero');
    const header = document.getElementById('js-header');
    let windowWidth = window.innerWidth;
    const headerHeight = header.getBoundingClientRect().height;

    function animate() {
        hero.classList.add('js-is-ready');
    }

    function onResize() {
        // ios fix
        if (windowWidth !== window.innerWidth) {
            setHeroSize();
            windowWidth = window.innerWidth;
        }
    }

    function setHeroSize() {
        hero.style.height = `${window.innerHeight - headerHeight}px`;
        animate();
    }

    if (IS_IOS) {
        setHeroSize();
        window.addEventListener('resize', debounce(onResize, 250));
    } else {
        animate();
    }
});
