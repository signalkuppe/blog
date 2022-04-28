const { Readable } = require('stream');
const path = require('path');
const fs = require('fs-extra');
const { SitemapStream, streamToPromise } = require('sitemap');
const dayjs = require('dayjs');

module.exports = async function (renderedPages) {
    // create sitemap
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
};
