const _ = require('lodash');
const contentfulClient = require('../../lib/contentfulClient');
const normalizePosts = require('../../lib/normalizePosts');
const writePostsJson = require('../../lib/writePostsJson');
const postsQuery = {
    content_type: 'post',
    include: 1,
    order: '-fields.date',
    limit: 1,
};

function processPosts(posts, resolve) {
    const normalizedPosts = normalizePosts(posts);
    writePostsJson(normalizedPosts);
    resolve(normalizedPosts);
}

module.exports = async (postId) => {
    return new Promise((resolve, reject) => {
        if (!postId) {
            contentfulClient
                .getEntries(postsQuery)
                .then((posts) => {
                    processPosts(posts, resolve);
                })
                .catch((err) => reject(err));
        } else {
            contentfulClient
                .getEntry(postId)
                .then((posts) => {
                    processPosts(posts, resolve);
                })
                .catch((err) => reject(err));
        }
    });
};

module.exports.postPhotos = (posts) => {
    return _.flatten(_.map(posts, 'gallery'));
};
