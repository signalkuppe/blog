const contentfulClient = require('../../lib/contentfulClient');
const normalizePosts = require('../../lib/normalizePosts');
const writeMapJson = require('../../lib/writeMapJson');
const writeSearchJson = require('../../lib/writeSearchJson');
const postQuery = {
    content_type: 'post',
    include: 1,
    order: '-fields.date',
    limit: 1,
};
module.exports = async (pequeno) => {
    return new Promise((resolve, reject) => {
        contentfulClient
            .getEntries(postQuery)
            .then((posts) => {
                const normalizedPosts = normalizePosts(posts);
                writeMapJson(normalizedPosts, pequeno);
                writeSearchJson(normalizedPosts, pequeno);
                resolve(normalizedPosts);
            })
            .catch((err) => reject(err));
    });
};
