require("dotenv").config();
const fs = require("fs-extra");
const path = require("path");
const log = require(path.join(process.cwd(), "lib/log"));

fs.remove(process.env.ELEVENTY_CACHE_DIR, (err) => {
  if (err) return;
  log.success(`Cache deleted`);
});
