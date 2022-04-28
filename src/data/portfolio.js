const contentfulClient = require('../../lib/contentfulClient');
const normalizePortofolio = require('../../lib/normalizePortofolio');
const portfolioQuery = {
    content_type: 'portfolio',
    include: 1,
    order: '-fields.date',
    limit: 1,
};
module.exports = async () => {
    return new Promise((resolve, reject) => {
        contentfulClient
            .getEntries(portfolioQuery)
            .then((photos) => {
                const normalizedPortfolio = normalizePortofolio(photos);
                resolve(normalizedPortfolio);
            })
            .catch((err) => reject(err));
    });
};
