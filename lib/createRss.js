const path = require('path');
const fs = require('fs-extra');
const { toXML } = require('jstoxml');
const dayjs = require('dayjs');
const vars = require('../src/vars');

const xmlOptions = {
    header: true,
    indent: '  ',
};

module.exports = async function (renderedPages) {
    // create sitemap
    const pubdateFormat = 'ddd, D MMM YYYY HH:mm:ss ZZ';
    const rssItems = renderedPages
        .filter((p) => {
            return p.data.route.name === 'post-item';
        })
        .map((p) => {
            const post = p.data.pagination.items[0];
            return {
                item: {
                    guid: encodeURI(vars.websiteUrl + post.permalink),
                    title: post.title,
                    description: post.description,
                    link: encodeURI(vars.websiteUrl + post.permalink),
                    pubDate: dayjs(post.updated).format(pubdateFormat),
                },
            };
        });

    const rssObject = {
        _name: 'rss',
        _attrs: {
            version: '2.0',
            'xmlns:atom': 'http://www.w3.org/2005/Atom',
        },
        _content: {
            channel: [
                {
                    'atom:link': {
                        _attrs: {
                            href: `${vars.websiteUrl}/blog`,
                            rel: 'self',
                            type: 'application/rss+xml',
                        },
                    },
                },
                {
                    title: 'Signalkuppe.com',
                },
                {
                    description: 'Lista delle relazioni pubblicate',
                },
                {
                    link: vars.websiteUrl,
                },
                {
                    pubDate: () => dayjs(new Date()).format(pubdateFormat),
                },
                {
                    language: 'it-it',
                },
                ...rssItems,
            ],
        },
    };

    const rss = toXML(rssObject, xmlOptions);

    await fs.writeFile(
        path.join(pequeno.config.outputDir, 'rss.xml'),
        rss.toString(),
        'utf8',
    );
};
