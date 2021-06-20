const contentfulClient = require('../../lib/contentfulClient');
const normalizePosts = require('../../lib/normalizePosts');
const postQuery = {
    content_type: 'post',
    include: 1,
    order: '-fields.date',
    limit: 1,
};
module.exports = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let posts = await contentfulClient.getEntries(postQuery);
            resolve(normalizePosts(posts));
        } catch (err) {
            reject(err);
        }
    });
};
