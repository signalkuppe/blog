const path = require("path");
const fs = require("fs");
const critical = require("critical");
const glob = require("glob");
const log = require(path.join(process.cwd(), "lib/log"));
let i = 0;
// options is optional
glob(
  "**/*.html",
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
            inline: true,
            base: "dist",
            src: file,
            width: 1300,
            height: 900,
          });
          fs.writeFileSync(path.join(process.cwd(), "dist", file), html);
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
