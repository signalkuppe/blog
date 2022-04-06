const path = require('path');
const fs = require('fs-extra');
const { Readable } = require('stream');
const { SitemapStream, streamToPromise } = require('sitemap');

module.exports = {
    copy: {
        'node_modules/scrollama/build/scrollama.js': 'libs/scrollama.js',
        'node_modules/leaflet/dist/leaflet.js': 'libs/leaflet.js',
        'node_modules/leaflet/dist/leaflet.css': 'libs/leaflet.css',
        'node_modules/leaflet-fullscreen/dist/Leaflet.fullscreen.js':
            'libs/leaflet-fullscreen.js',
        'node_modules/leaflet-fullscreen/dist/leaflet.fullscreen.css':
            'libs/leaflet-fullscreen.css',
        'node_modules/leaflet-fullscreen/dist/fullscreen.png':
            'libs/fullscreen.png',
        'node_modules/leaflet-fullscreen/dist/fullscreen@2x.png':
            'libs/fullscreen@2x.png',
        'node_modules/leaflet-gpx/gpx.js': 'libs/leaflet-gpx.js',
        'node_modules/leaflet-gesture-handling/dist/leaflet-gesture-handling.js':
            'libs/leaflet-gesture-handling.js',
        'node_modules/leaflet-gesture-handling/dist/leaflet-gesture-handling.css':
            'libs/leaflet-gesture-handling.css',
        'node_modules/chart.js/dist/chart.js': 'libs/chart.js',
        'node_modules/@tarekraafat/autocomplete.js/dist/autoComplete.js':
            'libs/autoComplete.js',
        'node_modules/@tarekraafat/autocomplete.js/dist/css/autoComplete.css':
            'libs/autoComplete.css',
        'node_modules/tippy.js/dist/tippy-bundle.umd.js': 'libs/tippy.js',
        'node_modules/tippy.js/dist/tippy.css': 'libs/tippy.css',
        'node_modules/@popperjs/core/dist/umd/popper.js': 'libs/popper.js',
        'node_modules/quicklink/dist/quicklink.umd.js': 'libs/quicklink.js',
    },
    processHtml: function ($, data) {
        $('head').append(`
        <script>
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/service-worker.js');
                });
            }
        </script>`);
        return $.html();
    },
    afterBuild: async function (renderedPages) {
        // create a sitemap
        const sitemapLinks = renderedPages.map((page) => ({
            url: page.data.route.href,
            changefreq: 'daily',
            priority: 0.3,
        }));
        const stream = new SitemapStream({
            hostname: 'https://www.signalkuppe.com',
        });
        const data = await streamToPromise(
            Readable.from(sitemapLinks).pipe(stream),
        );
        await fs.writeFile(
            path.join(pequeno.config.outputDir, 'sitemap.xml'),
            data.toString(),
            'utf8',
        );
    },
};
