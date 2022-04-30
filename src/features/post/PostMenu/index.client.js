const menu = document.querySelector('.js-postMenu');
const scrollableList = document.querySelector('.js-postMenu-list');
const links = document.querySelectorAll('.js-postMenuLink');
const activeLink = function (entry) {
    return document.querySelector(
        `.js-postMenuLink[href="#${entry.querySelector('h2').id}"]`,
    );
};
const activeLinkText = function (entry) {
    return activeLink(entry).querySelector('.js-postMenuLinkText');
};
const setActiveLinktext = function (el) {
    el.classList.add('js-is-active');
};
const unsetActiveLinktext = function (el) {
    el.classList.remove('js-is-active');
};
const scroller = scrollama();

scroller
    .setup({
        step: '.js-postSection',
    })
    .onStepEnter(({ element }) => {
        // { element, index, direction }

        const event = new CustomEvent('post-section-reached', {
            bubbles: true,
            detail: { section: element.getAttribute('data-step') },
        });

        document.querySelectorAll('.js-postMenuLink span').forEach((span) => {
            span.classList.remove('js-is-active');
        });
        setActiveLinktext(activeLinkText(element));
        setTimeout(function () {
            scrollableList.scrollLeft = activeLink(element).offsetLeft - 24;
            element.dispatchEvent(event);
        }, 100);
    })
    .onStepExit(({ element, direction }) => {
        // { element, index, direction }
        const step = element.getAttribute('data-step');
        if (step === 'relazione' && direction === 'up') {
            return;
        }
        unsetActiveLinktext(activeLinkText(element));
    });

window.addEventListener('resize', scroller.resize);

menu.style.opacity = 0;

document.addEventListener('cover-loaded', function () {
    menu.style.opacity = 1;
    document
        .getElementById('js-postMenuLinkText-relazione')
        .classList.add('js-is-active');
});

Array.from(links).forEach(function (link) {
    // enable smooth scroll on clickm avoid elsewhere
    link.addEventListener('click', function (e) {
        const href = e.target.getAttribute('href');
        const dest = document.querySelector(`#${href.replace('#', '')}`);

        history.pushState(null, null, href);

        window.scrollTo({
            top: dest.offsetTop - 100,
            behavior: 'smooth',
        });
        e.preventDefault();
    });
});
