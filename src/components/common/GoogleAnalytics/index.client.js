// add analytics
window.addEventListener('DOMContentLoaded', () => {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=UA-820873-1';
    document.getElementsByTagName('head')[0].appendChild(s);
    s.onload = function () {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());
        gtag('config', 'UA-820873-1', { anonymize_ip: true });
    };
});
