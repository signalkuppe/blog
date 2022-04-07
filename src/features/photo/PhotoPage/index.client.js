const container = document.getElementById('js-foto');
const nextPhoto = container.getAttribute('data-next');
const prevPhoto = container.getAttribute('data-prev');
let windowWidth = window.innerWidth;
let touchstartX = 0;
let touchendX = 0;

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

if (IS_IOS) {
    setHeroSize();
    window.addEventListener('resize', debounce(onResize, 250));
} else {
    container.classList.add('js-is-ready');
}

function handleGesture() {
    if (touchendX < touchstartX) {
        if (nextPhoto) {
            window.location.href = nextPhoto;
        }
    }
    if (touchendX > touchstartX) {
        if (prevPhoto) {
            window.location.href = prevPhoto;
        }
    }
}

container.addEventListener('touchstart', (e) => {
    touchstartX = e.changedTouches[0].screenX;
});

container.addEventListener('touchend', (e) => {
    touchendX = e.changedTouches[0].screenX;
    handleGesture();
});
