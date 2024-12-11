import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://www.signalkuppe.com",
  outDir: ".site",
  devToolbar: { enabled: false },
  prefetch: true,
  adapter: netlify(),
});
