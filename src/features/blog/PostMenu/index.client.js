const menu = document.querySelector('.js-postMenu');
const sections = document.querySelectorAll('.js-postSection');
const linkTexts = document.querySelectorAll('.js-postMenuLinkText');
const options = {
    threshold: 0.5,
};

function callback(entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const activeLink = document.querySelector(
                `.js-postMenuLink[href="#${entry.target.id}"]`,
            );
            Array.from(linkTexts).forEach(function (text) {
                text.classList.remove('js-is-active');
            });

            activeLink
                .querySelector('.js-postMenuLinkText')
                .classList.add('js-is-active');

            activeLink.closest('li').scrollIntoView();
        }
    });
}

Array.from(sections).forEach(function (section) {
    let observer = new IntersectionObserver(callback, options);
    observer.observe(section);
});

menu.style.opacity = 0;

document.addEventListener('cover-loaded', function (e) {
    menu.style.opacity = 1;
});
