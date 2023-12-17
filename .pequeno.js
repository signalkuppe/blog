const createSitemap = require('./lib/createSitemap');
const createRss = require('./lib/createRss');
const processHtml = require('./lib/processHtml');

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
        'node_modules/chart.js/dist/chart.umd.js': 'libs/chart.js',
        'node_modules/hammerjs/hammer.js': 'libs/hammer.js',
        'node_modules/jszip/dist/jszip.js': 'libs/jszip.js',
    },
    afterBuild: async function (renderedPages) {
        await createSitemap(renderedPages);
        await createRss(renderedPages);
    },
    processHtml:
        process.env.SIGNALKUPPE_WEBSITE_ENV === 'production'
            ? processHtml
            : false,
};
