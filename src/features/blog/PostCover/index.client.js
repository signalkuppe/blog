const container = document.getElementById('js-postCover');
const caption = document.getElementById('js-postCover-caption');
const image = document.getElementById('js-postCover-img');
const loader = document.getElementById('js-postCover-loader');

function imageLoaded() {
    container.classList.add('js-is-loaded');
    caption.classList.add('js-is-loaded');
    const event = new CustomEvent('cover-loaded', { bubbles: true });
    container.dispatchEvent(event);
}

if (!image.complete || !image.naturalWidth) {
    loader.style.display = 'block';
    image.style.visibility = 'hidden';
    image.style.opacity = 0;
    image.onload = function () {
        if (image.complete) {
            loader.style.display = 'none';
            image.style.visibility = 'visible';

            setTimeout(() => {
                image.style.opacity = 1;
                imageLoaded();
            }, 100);
        }
    };
} else {
    // we retrieved it from cache
    imageLoaded();
}
