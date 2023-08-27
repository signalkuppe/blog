const fs = require('fs-extra');
const path = require('path');
const CleanCSS = require('clean-css');
const UglifyJS = require('uglify-js');

function bundleName(data) {
    if (data.route.name === 'index') {
        return 'index';
    } else {
        return data.route.href // url to file name alpinismo-2023-07-10-monte-bianco-via-italiana-dal-rifugio-gonella
            ?.replace('.html', '')
            .replace()
            .split('/')
            .join('-')
            .replace('-', '')
            .replace('-index', '');
    }
}

module.exports = function ($, data, config) {
    let jsCode = '';
    let cssCode = '';
    const fileName = bundleName(data);
    const jsBoundleName = `/js/${fileName}.js`;
    const jsBoundleFile = path.join(config.outputDir, jsBoundleName);
    const cssBoundleName = `/css/${fileName}.css`;
    const cssBoundleFile = path.join(config.outputDir, cssBoundleName);

    $('script').each((i, el) => {
        const src = $(el).attr('src');
        if (src) {
            const file = path.join(config.outputDir, src);
            jsCode += `\n${fs.readFileSync(file)}`;
        } else {
            jsCode += `\n${$(el).html()}`;
        }
        $(el).remove();
    });
    $('style').each((i, el) => {
        cssCode += $(el).html();
        $(el).remove();
    });
    $('link[rel="stylesheet"]').each((i, el) => {
        const src = $(el).attr('href');
        const file = path.join(config.outputDir, src);
        cssCode += `\n${fs.readFileSync(file)}`;
        $(el).remove();
    });
    if (jsCode && jsCode.length) {
        const minified = UglifyJS.minify(jsCode).code;
        fs.outputFileSync(jsBoundleFile, minified);
        $('body').append(`<script src="${jsBoundleName}" />`);
        jsCode = '';
    }
    if (cssCode && cssCode.length) {
        cssCode = cssCode.replace(/fullscreen.png/g, '/libs/fullscreen.png'); // move relative css assets
        cssCode = cssCode.replace(
            /fullscreen@2x.png/g,
            '/libs/fullscreen@2x.png',
        );
        const minified = new CleanCSS().minify(cssCode)?.styles;
        fs.outputFileSync(cssBoundleFile, minified);
        $('head').append(`<link rel="stylesheet" href="${cssBoundleName}" />`);
        cssCode = '';
    }
    const minified = $.html();

    return minified;
};
