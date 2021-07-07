const sections = document.querySelectorAll('.js-postSection');
const linkTexts = document.querySelectorAll('.js-menuText');
const options = {
    threshold: 0.5,
};

function callback(entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const activeLink = document.querySelector(
                `.js-menuLink[href="#${entry.target.id}"]`,
            );
            Array.from(linkTexts).forEach(function (text) {
                text.classList.remove('js-is-active');
            });

            activeLink
                .querySelector('.js-menuText')
                .classList.add('js-is-active');

            // activeLink.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

Array.from(sections).forEach(function (section) {
    let observer = new IntersectionObserver(callback, options);
    observer.observe(section);
});
