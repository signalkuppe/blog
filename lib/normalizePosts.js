const htmlRenderer = require('@contentful/rich-text-html-renderer');
const { BLOCKS, INLINES } = require('@contentful/rich-text-types');
const slug = require('slug');
const _ = require('lodash');
const dayjs = require('dayjs');
const it = require('dayjs/locale/it');

module.exports = (posts) => {
    // ad some custom prop
    return posts.map((post) => {
        let output = {};
        const renderInlineAsset = (node) => {
            if (node.nodeType === 'embedded-asset-block') {
                const imgUrl = node.data.target.fields.file.url;
                const img = `${imgUrl}?fit=thumb&w=1170&fm=webp&q=50`;
                const imgTitle = node.data.target.fields.title;
                const imgAlt = node.data.target.fields.description;
                const imgWidth =
                    node.data.target.fields.file.details.image.width;
                const imgHeight =
                    node.data.target.fields.file.details.image.height;
                return `<figure class="postImage">
                          <img 
                            src="${img}" 
                            alt="${imgAlt || imgTitle}" 
                            width="${imgWidth}"
                            height="${imgHeight}"
                            loading="lazy" />
                            <figcaption>${imgTitle}</figcaption>
                        </figure>`;
            }
            if (node.nodeType === 'asset-hyperlink') {
                return `<a href="${node.data.target.fields.file.url}" download="${node.data.target.fields.file.filename}">${node.content[0].value}</a>`;
            }
        };
        const options = {
            renderNode: {
                [BLOCKS.EMBEDDED_ASSET]: (node) => {
                    return renderInlineAsset(node);
                },
                [INLINES.HYPERLINK]: (node) => {
                    // how to render links in text
                    return `<a href="${node.data.uri}">${node.content[0].value}</a>`;
                },
                [INLINES.ASSET_HYPERLINK]: (node) => {
                    return renderInlineAsset(node);
                },
                [BLOCKS.HEADING_2]: (node) => {
                    return `<h3>${node.content[0].value}</h3>`;
                },
            },
        };
        const kmlTrack = (post) => {
            try {
                return post.fields.gpsTracks.find(
                    (t) => t.fields.file.fileName.indexOf('.kml') !== -1,
                );
            } catch (err) {
                return false;
            }
        };
        const gpxTrack = (post) => {
            try {
                return post.fields.gpsTracks.find(
                    (t) => t.fields.file.fileName.indexOf('.gpx') !== -1,
                );
            } catch (err) {
                return false;
            }
        };

        const normalizeGallery = () =>
            post.fields.gallery.map((item) => {
                return {
                    post: postData,
                    slug: slug(`${item.fields.title}-${item.sys.id}`),
                    title: item.fields.title,
                    src: item.fields.file.url,
                    alt: item.fields.file.description || item.fields.title,
                    width: item.fields.file.details.image.width,
                    height: item.fields.file.details.image.height,
                };
            });

        const postData = {
            id: post.sys.id,
            updated: post.sys.updatedAt,
            title: post.fields.title,
            description: post.fields.description,
            slug: post.fields.slug,
            permalink: `/${post.fields.slug}`,
            date: _.capitalize(
                dayjs(post.fields.date).locale(it).format('DD MMMM YYYY'),
            ),
            dateTime: dayjs(post.fields.date)
                .locale(it)
                .format('YYYY-MM-DD HH:mm'),
            dateShort: dayjs(post.fields.date).locale(it).format('DD/MM/YYYY'),
            category: post.fields.category[0],

            cover: {
                alt: post.fields.cover.fields.description || post.fields.title,
                title: post.fields.cover.fields.title,
                src: post.fields.cover.fields.file.url,
                focus: post.fields.coverCropFocus[0],
                width: post.fields.cover.fields.file.details.image.width,
                height: post.fields.cover.fields.file.details.image.height,
            },
            body: htmlRenderer.documentToHtmlString(post.fields.body, options),
            gps: {
                hasTracks: Array.isArray(_.get(post, 'fields.gpsTracks')),
                hasKml: !!kmlTrack(post),
                hasGpx: !!gpxTrack(post),
                kml: _.get(kmlTrack(post), 'fields.file.url'),
                gpx: _.get(gpxTrack(post), 'fields.file.url'),
            },

            coordinates: post.fields.location,
            tags: post.fields.tags,
        };

        output = {
            ...postData,
            gallery: normalizeGallery(),
        };
        // free some space
        delete post.fields.body;
        return output;
    });
};
