/**
 * Grab posts from contentful
 * and store them in the posts collection
 * we only call the api one time, to avoid rate limit issues
 * The first time a log file is created
 */

require("dotenv").config();
const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const mkdirp = require("mkdirp");
const log = require(path.join(process.cwd(), "lib/log"));
const contentfulClient = require(path.join(
  process.cwd(),
  "lib/contentfulClient"
));
const logFile = path.join(
  process.cwd(),
  process.env.ELEVENTY_CACHE_DIR,
  "_posts.json"
);
const htmlRenderer = require("@contentful/rich-text-html-renderer"); // https://github.com/contentful/rich-text/tree/master/packages/rich-text-html-renderer
const postQuery = {
  content_type: "post",
  include: 1,
  order: "-fields.date",
};
const makeFullSlug = (slug) => {
  return `/${slug}.html`;
};
const transformPosts = (posts) => {
  // ad some custom prop
  return posts.map((post, i) => {
    const renderInlineAsset = (node) => {
      const imgUrl = node.data.target.fields.file.url;
      const img = `${imgUrl}?fit=thumb&w=1440&fm=jpg&fl=progressive&q=70`;
      const imgTitle = node.data.target.fields.title;
      const imgAlt = node.data.target.fields.description;

      return `
          ${
            node.nodeType === "embedded-asset-block"
              ? `<noscript>
            <img 
              src="${img}" 
              alt="${imgAlt}"  />        
          </noscript>
          <figure class="c-post-embeddedImage">`
              : ""
          }
            <a 
              class="js-gallery${
                node.nodeType === "asset-hyperlink" ? ` textLink` : ``
              }"
              href="${imgUrl}?fit=thumb&w=800&fm=jpg&fl=progressive" 
              data-at-768="${imgUrl}?fit=thumb&w=1440&fm=jpg&fl=progressive"
              data-at-1280="${imgUrl}?fit=thumb&w=1920&fm=jpg&fl=progressive"
              data-at-1920="${imgUrl}?fit=thumb&w=2560&fm=jpg&fl=progressive"
              title="${imgTitle}"
            >
            ${
              node.nodeType === "embedded-asset-block"
                ? `<img 
                data-src="${img}"
                alt="${imgAlt}" 
                class="lazyImg"
                width="1440"
                height="960" />`
                : node.content[0].value
            }
            </a>
               ${
                 node.nodeType === "embedded-asset-block"
                   ? `
            <figcaption>${imgTitle}</figcaption>
          </figure>`
                   : ``
               }
          `;
    };
    const options = {
      renderNode: {
        "embedded-asset-block": (node) => {
          return renderInlineAsset(node);
        },
        hyperlink: (node) => {
          // how to render links in text
          return `<a href="${node.data.uri}">${node.content[0].value}</a>`;
        },
        "asset-hyperlink": (node) => {
          return renderInlineAsset(node);
        },
        /*"unordered-list": node => {
          // how to render lists
          return `<ul class="u-nicelist">${node.content.map(
            item => `<li>${htmlRenderer.documentToHtmlString(item)}<li>`
          )}`;
        } */
      },
    };
    const kmlTrack = (post) => {
      try {
        return post.fields.gpsTracks.find(
          (t) => t.fields.file.fileName.indexOf(".kml") !== -1
        );
      } catch (err) {
        return false;
      }
    };
    const gpxTrack = (post) => {
      try {
        return post.fields.gpsTracks.find(
          (t) => t.fields.file.fileName.indexOf(".gpx") !== -1
        );
      } catch (err) {
        return false;
      }
    };
    post.computed = {
      slug: makeFullSlug(post.fields.slug),
      body: htmlRenderer.documentToHtmlString(post.fields.body, options),
      gps: {
        hasTracks: Array.isArray(_.get(post, "fields.gpsTracks")),
        hasKml: !!kmlTrack(post),
        hasGpx: !!gpxTrack(post),
        kml: _.get(kmlTrack(post), "fields.file.url"),
        gpx: _.get(gpxTrack(post), "fields.file.url"),
      },
    };
    const prevNextData = (post) => {
      return {
        slug: makeFullSlug(post.fields.slug),
        date: post.fields.date,
        title: post.fields.title,
      };
    };
    if (posts[i + 1]) {
      // prev
      post.computed.prev = prevNextData(posts[i + 1]);
    }
    if (posts[i - 1]) {
      // next
      post.computed.next = prevNextData(posts[i - 1]);
    }
    // free some space
    delete post.fields.body;

    return post;
  });
};

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    if (!fs.existsSync(logFile)) {
      // don’t call the api every time
      try {
        await mkdirp(path.join(process.cwd(), process.env.ELEVENTY_CACHE_DIR));
        await mkdirp(path.join(process.cwd(), "dist", "js"));
        let posts = await contentfulClient.getEntries(postQuery);
        const computedPosts = transformPosts(posts);
        /* TEMP: old posts warning */
        const oldPosts = require("./oldPosts");
        log.warn(
          `Added ${oldPosts.length} old posts, !!! first old post: ${oldPosts[0].title} !!!`
        );
        fs.writeFileSync(logFile, JSON.stringify(computedPosts), "utf-8"); // write log file
        resolve(computedPosts);
      } catch (err) {
        log.error("Posts fetch error", err);
        reject(err);
      }
    } else {
      // already done
      log.info(`Used cache for POSTS, to grab fresh data delete ${logFile}`);
      resolve(JSON.parse(fs.readFileSync(logFile))); // read cached file
    }
  });
};
