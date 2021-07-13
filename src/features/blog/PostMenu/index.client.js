const menu = document.querySelector('.js-postMenu');
const sections = document.querySelectorAll('.js-postSection');
const linkTexts = document.querySelectorAll('.js-postMenuLinkText');
const scrollableList = document.querySelector('.js-postMenu-list');
const sectionsObserver = new IntersectionObserver(sectionCallback, {
    threshold: 0.75,
});

function sectionCallback(entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const activeLink = document.querySelector(
                `.js-postMenuLink[href="#${
                    entry.target.querySelector('a').name
                }"]`,
            );

            console.log(entry);

            Array.from(linkTexts).forEach(function (text) {
                text.classList.remove('js-is-active');
            });

            activeLink
                .querySelector('.js-postMenuLinkText')
                .classList.add('js-is-active');

            console.log(activeLink);

            scrollableList.scrollLeft = activeLink.closest('li').offsetLeft;
        }
    });
}

Array.from(sections).forEach(function (section) {
    sectionsObserver.observe(section);
});

menu.style.opacity = 0;

document.addEventListener('cover-loaded', function () {
    menu.style.opacity = 1;
});
