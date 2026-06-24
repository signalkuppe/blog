import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  devToolbar: { enabled: false },
  output: "static",
  // Astro 7 changed the default to 'jsx' (strips inline whitespace with JSX
  // rules); keep v6 HTML-aware behavior to preserve prose spacing.
  compressHTML: true,
  prefetch: true,
  adapter: netlify({ imageCDN: false }),
  integrations: [mdx()],
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    server: {
      allowedHosts: [".ngrok-free.app"],
    },
  },
});
