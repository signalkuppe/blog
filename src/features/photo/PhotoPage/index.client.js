window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('js-foto');
    const caption = document.getElementById('js-foto-caption');
    const image = container.querySelector('img');
    const hammertime = new Hammer(container, { touchAction: 'auto' });
    const nextPhoto = container.getAttribute('data-next');
    const prevPhoto = container.getAttribute('data-prev');

    // create a div over the real size of the image to trigger an hover effect and show the caption
    const imageWidth = parseInt(image.getAttribute('width'));
    const imageHeight = parseInt(image.getAttribute('height'));
    const imageRatio = imageHeight / imageWidth;
    const imageOverlayDiv = document.createElement('div');
    imageOverlayDiv.setAttribute('aria-hidden', true);
    imageOverlayDiv.setAttribute('id', 'js-photo-overlay');
    imageOverlayDiv.style.position = 'absolute';
    imageOverlayDiv.style.top = '0px';
    imageOverlayDiv.style.zIndex = 2;
    imageOverlayDiv.style.cursor = 'help';
    imageOverlayDiv.style.outline = 'none';

    imageOverlayDiv.addEventListener('mouseenter', function () {
        caption.classList.add('js-is-hovering');
        imageOverlayDiv.focus();
    });
    imageOverlayDiv.addEventListener('mouseleave', function () {
        caption.classList.remove('js-is-hovering');
    });

    container.addEventListener('click', function (e) {
        if (e.target !== imageOverlayDiv) {
            caption.classList.remove('js-is-hovering');
        }
    });

    container.append(imageOverlayDiv);

    function setImageOverlayStyles() {
        const shortest = Math.min(window.innerHeight, window.innerWidth);
        if (shortest === window.innerHeight) {
            // landscape
            const imageRealWidth = shortest / imageRatio;
            imageOverlayDiv.style.left = `${
                (window.innerWidth - imageRealWidth) / 2
            }px`;
            imageOverlayDiv.style.top = '0px';
            imageOverlayDiv.style.width = `${imageRealWidth}px`;
            imageOverlayDiv.style.height = `${window.innerHeight}px`;
        } else {
            // portrait
            const imageRealHeight = window.innerWidth * imageRatio;

            imageOverlayDiv.style.left = '0px';
            imageOverlayDiv.style.top = `${
                (window.innerHeight - imageRealHeight) / 2
            }px`;
            imageOverlayDiv.style.width = `${window.innerWidth}px`;
            imageOverlayDiv.style.height = `${imageRealHeight}px`;
        }
    }

    setImageOverlayStyles();

    function onResize() {
        setImageOverlayStyles();
    }

    hammertime.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });

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

    window.addEventListener('resize', debounce(onResize, 250));

    document.onkeydown = function (e) {
        e = e || window.event;
        if (e.key === 'Escape') {
            history.back();
        }
        return false;
    };
});
