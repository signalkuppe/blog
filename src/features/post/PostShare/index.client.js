const links = document.querySelectorAll('.js-postShare-link');
const print = document.querySelector('.js-postShare-print');
Array.from(links).forEach(function (link) {
    link.addEventListener('click', function (e) {
        window.open(e.target.href);
        return false;
    });
});

print.addEventListener('click', function () {
    window.print();
});
