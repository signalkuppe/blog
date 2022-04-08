const print = document.querySelector('.js-postShare-print');
const links = document.querySelectorAll('.js-postShare-link');
print.addEventListener('click', function () {
    window.print();
});

Array.from(links).forEach((link) => {
    const social = link.getAttribute('data-social');
    const url = link.getAttribute('data-url');
    link.addEventListener('click', (e) => {
        if (social !== 'whatsapp') {
            e.preventDefault();
            window.open(url, 'condividi', `status=0,toolbar=0,menubar=0`);
        }
    });
});
