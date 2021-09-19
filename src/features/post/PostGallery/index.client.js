/**
 * TEMP: we dynamically set enlargment size for responsive behaviour
 * Have to check when the plugin will support it
 * https://github.com/biati-digital/glightbox/pull/264
 */

const images = JSON.parse(
    document.getElementById('js-postGallery').getAttribute('data-images'),
);
const galleryLinks = document.querySelectorAll('.js-galleryItem');
const mqSmall = window.matchMedia('screen and (max-width: 1023px)');
const mqMedium = window.matchMedia(
    'screen and (min-width: 1024px) and (max-width: 1440px)',
);
const mqLarge = window.matchMedia('screen and (min-width: 1441px)');
let src;

Array.from(galleryLinks).forEach(function (link) {
    if (mqSmall.matches) {
        src = link.getAttribute('data-href-small');
    } else if (mqMedium.matches) {
        src = link.getAttribute('data-href-medium');
    } else if (mqLarge.matches) {
        src = link.getAttribute('data-href-large');
    }

    link.setAttribute('href', src);
});

const lightbox = GLightbox({
    selector: '.js-galleryItem',
    preload: false,
    svg: {
        // plugin bug. we need to encode svg (https://emn178.github.io/online-tools/html_encode.html)
        close: `&lt;svg aria-hidden=&quot;true&quot;  xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 352 512&quot;&gt;&lt;path fill=&quot;currentColor&quot; d=&quot;M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z&quot;/&gt;&lt;/svg&gt;`,
        next: `&lt;svg aria-hidden=&quot;true&quot; focusable=&quot;false&quot; data-prefix=&quot;fas&quot; data-icon=&quot;chevron-right&quot; role=&quot;img&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 320 512&quot; class=&quot;svg-inline--fa fa-chevron-right fa-w-10 fa-3x&quot;&gt;&lt;path fill=&quot;currentColor&quot; d=&quot;M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z&quot; class=&quot;&quot;&gt;&lt;/path&gt;&lt;/svg&gt;`,
        prev: `&lt;svg aria-hidden=&quot;true&quot; focusable=&quot;false&quot; data-prefix=&quot;fas&quot; data-icon=&quot;chevron-left&quot; role=&quot;img&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 320 512&quot; class=&quot;svg-inline--fa fa-chevron-left fa-w-10 fa-3x&quot;&gt;&lt;path fill=&quot;currentColor&quot; d=&quot;M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z&quot; class=&quot;&quot;&gt;&lt;/path&gt;&lt;/svg&gt;`,
    },
});

lightbox.on('slide_changed', (s) => {
    // Do something just one time
    const currentSlide = s.current;
    const downloadLink = images[currentSlide.index];
    const link = document.createElement('a');
    link.href = downloadLink;
    link.text = 'Scarica l’originale';
    link.target = '_blank';
    link.rel = 'noopener';
    link.classList.add('js-postGallery-downloadLink');

    currentSlide.slide.querySelector('h4').after(link);
});
