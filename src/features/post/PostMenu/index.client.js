const menu = document.querySelector('.js-postMenu');
const scrollableList = document.querySelector('.js-postMenu-list');
const activeLink = function (entry) {
    return document.querySelector(
        `.js-postMenuLink[href="#${entry.querySelector('a').id}"]`,
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
