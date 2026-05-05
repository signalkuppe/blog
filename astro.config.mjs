import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import mdx from "@astrojs/mdx";
import sentry from "@sentry/astro";

// https://astro.build/config
export default defineConfig({
  devToolbar: { enabled: false },
  output: "static",
  prefetch: true,
  adapter: netlify({ imageCDN: false }),
  integrations: [
    mdx(),
    sentry({
      project: "signalkuppe",
      org: "signalkuppe",
      authToken: process.env.SENTRY_AUTH_TOKEN,
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
});
