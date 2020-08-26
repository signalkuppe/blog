/**
 * Grab portofolio items
 * and store them in the portfolio collection
 * we only call the api one time, to avoid rate limit issues
 * The first time a log file is created
 */

require("dotenv").config();
const _ = require("lodash");
const mkdirp = require("mkdirp");
const path = require("path");
const fs = require("fs");
const log = require(path.join(process.cwd(), "lib/log"));
const contentfulClient = require(path.join(
  process.cwd(),
  "lib/contentfulClient"
));
const logFile = path.join(
  process.cwd(),
  process.env.ELEVENTY_CACHE_DIR,
  "_portoflio.json"
);
let photosQuery = {
  content_type: "portfolio",
  include: 1,
  order: "-fields.date",
};

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    if (!fs.existsSync(logFile)) {
      // don’t call the api every time
      try {
        await mkdirp(path.join(process.cwd(), process.env.ELEVENTY_CACHE_DIR));
        let photos = await contentfulClient.getEntries(photosQuery);
        fs.writeFileSync(logFile, JSON.stringify(photos), "utf-8"); // write log file
        resolve(photos);
      } catch (err) {
        log.error("Photos fetch error", err);
        reject(err);
      }
    } else {
      // already done
      log.info(
        `Used cache for PORTFOLIO, to grab fresh data delete ${logFile}`
      );
      resolve(JSON.parse(fs.readFileSync(logFile))); // read cached file
    }
  });
};
