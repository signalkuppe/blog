const _ = require('lodash');
const contentful = require('contentful');
const perIteration = 20;
const Client = contentful.createClient({
    space: process.env.SIGNALKUPPE_WEBSITE_CONTENTFUL_SPACE,
    accessToken: process.env.SIGNALKUPPE_WEBSITE_CONTENTFUL_ACCESSTOKEN,
});

const getEntries = async (query) => {
    try {
        let iteration = 1;
        let entries;
        query.limit = perIteration;
        query.skip = 0;
        let chunk = await Client.getEntries(query);
        entries = chunk.items;
        while (chunk.total > query.limit * iteration) {
            query.skip = query.limit * iteration;
            chunk = await Client.getEntries(query);
            entries = _.union(entries, chunk.items);
            iteration++;
        }
        return entries;
    } catch (err) {
        console.log(err);
        return [];
    }
};

const getEntry = async (entryId) => {
    const post = await Client.getEntry(entryId);
    return [post];
};

module.exports = { getEntries, getEntry };
