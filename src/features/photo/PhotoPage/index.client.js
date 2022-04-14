window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('js-foto');
    const hammertime = new Hammer(container, { touchAction: 'auto' });
    const nextPhoto = container.getAttribute('data-next');
    const prevPhoto = container.getAttribute('data-prev');
    let windowWidth = window.innerWidth;

    function onResize() {
        // ios fix
        if (windowWidth !== window.innerWidth) {
            setHeroSize();
            windowWidth = window.innerWidth;
        }
    }

    function setHeroSize() {
        container.style.height = `${window.innerHeight}px`;
        container.classList.add('js-is-ready');
    }

    hammertime.on('swipeleft', function () {
        if (nextPhoto) {
            window.location.href = nextPhoto;
        }
    });

    hammertime.on('swiperight', function () {
        if (prevPhoto) {
            window.location.href = prevPhoto;
        }
    });

    if (IS_IOS) {
        setHeroSize();
        window.addEventListener('resize', debounce(onResize, 250));
    } else {
        container.classList.add('js-is-ready');
    }
});
