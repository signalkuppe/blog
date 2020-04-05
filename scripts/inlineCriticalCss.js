const path = require("path");
const fs = require("fs");
const critical = require("critical");
const cheerio = require("cheerio");
const glob = require("glob");
const _ = require("lodash");
const log = require(path.join(process.cwd(), "lib/log"));
let i = 0;
// options is optional
glob(
  "index.html",
  {
    cwd: path.join(process.cwd(), "dist"),
  },
  (err, files) => {
    if (err) {
      log.error("inline critical css glob error");
    } else {
      files.forEach(async (file) => {
        try {
          const { css, html, uncritical } = await critical.generate({
            inline: false,
            base: "dist",
            minify: true,
            src: file,
            width: 1300,
            height: 900,
          });
          console.log(file);
          const oldFile = fs.readFileSync(path.join("dist", file)).toString();
          const $ = cheerio.load(oldFile);
          $("link[rel='stylesheet']").map((i, link) => {
            const stylesheet = "this.rel='stylesheet'";
            $(link).attr("rel", "preload");
            $(link).attr("as", "style");
            $(link).attr("onload", stylesheet);
          });
          $("head").append(`<style media="screen">${css}</style>`);
          fs.writeFileSync(
            path.join("dist", file),
            _.replace(
              $.html(),
              new RegExp("this.rel=&apos;stylesheet&apos;", "g"),
              "this.rel='stylesheet'"
            )
          );
          log.info(`inlined css for ${file}`);
          i++;
          if (i === files.length) {
            log.success(`Inline critical css for all files (${i})`);
          }
        } catch (err) {
          log.error(`critical css err: ${err}`);
        }
      });
    }
  }
);
