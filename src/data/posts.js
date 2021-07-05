const contentfulClient = require('../../lib/contentfulClient');
const normalizePosts = require('../../lib/normalizePosts');
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
            .then((posts) => resolve(normalizePosts(posts)))
            .catch((err) => reject(err));
    });
};
