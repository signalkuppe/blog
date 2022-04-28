const _ = require('lodash');
const contentfulClient = require('../../lib/contentfulClient');
const normalizePosts = require('../../lib/normalizePosts');
const writeMapJson = require('../../lib/writeMapJson');
const postQuery = {
    content_type: 'post',
    include: 1,
    order: '-fields.date',
    limit: 1,
};

module.exports = async () => {
    return new Promise((resolve, reject) => {
        contentfulClient
            .getEntries(postQuery)
            .then((posts) => {
                const normalizedPosts = normalizePosts(posts);
                writeMapJson(normalizedPosts);
                resolve(normalizedPosts);
            })
            .catch((err) => reject(err));
    });
};

module.exports.postPhotos = (posts) => {
    return _.flatten(_.map(posts, 'gallery'));
};
