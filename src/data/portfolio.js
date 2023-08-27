const contentfulClient = require('../../lib/contentfulClient');
const normalizePortofolio = require('../../lib/normalizePortofolio');
const portfolioQuery = {
    content_type: 'portfolio',
    include: 1,
    order: '-fields.date',
    limit: 1,
};

function processPortfolio(photos, resolve) {
    const normalizedPortfolio = normalizePortofolio(photos);
    resolve(normalizedPortfolio);
}
module.exports = async (photoId) => {
    return new Promise((resolve, reject) => {
        if (!photoId) {
            contentfulClient
                .getEntries(portfolioQuery)
                .then((photos) => {
                    processPortfolio(photos, resolve);
                })
                .catch((err) => reject(err));
        } else {
            contentfulClient
                .getEntry(photoId)
                .then((photos) => {
                    processPortfolio(photos, resolve);
                })
                .catch((err) => reject(err));
        }
    });
};
