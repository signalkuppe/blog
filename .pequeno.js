const path = require('path');
const fs = require('fs-extra');
const { Readable } = require('stream');
const { SitemapStream, streamToPromise } = require('sitemap');
const dayjs = require('dayjs');

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
        'node_modules/quicklink/dist/quicklink.umd.js': 'libs/quicklink.js',
        'node_modules/hammerjs/hammer.js': 'libs/hammer.js',
    },
    afterBuild: async function (renderedPages) {
        // add posts

        const sitemapLinks = renderedPages
            .filter((p) => {
                return (
                    p.data.route.name === 'post-item' ||
                    p.data.route.name === 'index' ||
                    p.data.route.name === 'contatti' ||
                    (p.data.route.name === 'blog' &&
                        p.data.pagination.page === 1) ||
                    (p.data.route.name === 'blog-by-category' &&
                        p.data.pagination.page === 1) ||
                    (p.data.route.name === 'portfolio' &&
                        p.data.pagination.page === 1)
                );
            })
            .map((p) => {
                let priority;
                let format = 'YYYY-MM-DD';
                let lastmod = dayjs().format(format);
                if (p.data.route.name === 'index') {
                    priority = 1;
                } else if (
                    p.data.route.name === 'blog' ||
                    p.data.route.name === 'blog-by-category' ||
                    p.data.route.name === 'portfolio'
                ) {
                    priority = 0.7;
                } else if (p.data.route.name === 'post-item') {
                    priority = 0.3;
                    lastmod = dayjs(p.data.pagination.items[0].updated).format(
                        format,
                    );
                }
                return {
                    url: p.data.route.href,
                    lastmod,
                    priority,
                };
            });
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
