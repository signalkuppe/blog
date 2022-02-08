require("dotenv").config();
const _ = require("lodash");
const path = require("path");
const log = require(path.join(process.cwd(), "lib/log"));
const contentful = require("contentful");
const perIteration = 20;
const Client = contentful.createClient({
  space: process.env.ELEVENTY_CONTENTFUL_SPACE,
  accessToken: process.env.ELEVENTY_CONTENTFUL_ACCESSTOKEN,
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
    log.success(
      `Found ${entries.length} ${query.content_type} entries in ${iteration} iterations`
    );
    return entries;
  } catch (err) {
    console.log(err);
    log.error(`Contentful fetch error ${err}`);
    return [];
  }
};

module.exports = { getEntries };
