import { defineConfig, fontProviders, svgoOptimizer } from "astro/config";
import netlify from "@astrojs/netlify";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.signalkuppe.com",
  output: "static",
  compressHTML: true,
  // every internal link prefetches on hover/tap; the Meteo header link
  // overrides this with "load" to mask its slow server render
  prefetch: {
    prefetchAll: true,
  },
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
    inlineStylesheets: "always",
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
      weights: ["400 700 900"],
      styles: ["normal"],
      subsets: ["latin"],
    },
  ],
});
