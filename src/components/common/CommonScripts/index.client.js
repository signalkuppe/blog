window.addEventListener('DOMContentLoaded', () => {
    quicklink.listen();
    const asyncStyleSheets = document.querySelectorAll('link[rel="preload"]');

    if (asyncStyleSheets.length) {
        asyncStyleSheets.forEach(function (sheet) {
            sheet.rel = 'stylesheet';
        });
    }
});
