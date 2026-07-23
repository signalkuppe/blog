import { defineConfig, fontProviders, svgoOptimizer } from "astro/config";
import netlify from "@astrojs/netlify";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.signalkuppe.com",
  output: "static",
  compressHTML: true,
  // every internal link prefetches on tap (not hover: hover + Netlify's
  // must-revalidate HTML caching hit a Chromium race where the real
  // navigation right after a prefetch occasionally lands on an empty
  // response body — a blank page with no console error, self-healing
  // on reload). The Meteo header link overrides this with "load" to
  // mask its slow server render.
  prefetch: true,
  adapter: netlify({
    imageCDN: false,
  }), // https://docs.astro.build/en/guides/deploy/netlify/#image-cdn
  integrations: [
    mdx(),
    sitemap({
      // SSR pages are excluded automatically; meteo is worth indexing
      customPages: ["https://www.signalkuppe.com/meteo-concenedo/"],
    }),
  ],
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    server: {
      allowedHosts: [".ngrok-free.app"],
    },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "JetBrains Mono",
      cssVariable: "--base-font",
      // JetBrains Mono tops out at ExtraBold 800 (there is no 900); this
      // range serves the variable font covering every weight the CSS uses
      weights: ["400 800"],
      styles: ["normal"],
      subsets: ["latin"],
      formats: ["woff2"],
      fallbacks: ["monospace"],
    },
  ],
});
