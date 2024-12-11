import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://www.signalkuppe.com",
  devToolbar: { enabled: false },
  prefetch: true,
  adapter: netlify(),
  outDir: "./site",
});
