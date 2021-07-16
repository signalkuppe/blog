const cheerio = require('cheerio');
module.exports = {
    copy: {
        'node_modules/scrollama/build/scrollama.js': 'libs/scrollama.js',
        'node_modules/lightgallery/css/lightgallery-bundle.css':
            'libs/lightgallery.css',
        'node_modules/lightgallery/lightgallery.umd.js': 'libs/lightgallery.js',
        'node_modules/lightgallery/fonts/lg.svg': 'fonts/lg.svg',
        'node_modules/lightgallery/fonts/lg.ttf': 'fonts/lg.ttf',
        'node_modules/lightgallery/fonts/lg.woff': 'fonts/lg.woff',
        'node_modules/lightgallery/images/loading.gif': 'images/loading.gif',
    },
};
