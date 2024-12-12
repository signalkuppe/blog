import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import sentry from "@sentry/astro";

// https://astro.build/config
export default defineConfig({
  devToolbar: { enabled: false },
  prefetch: true,
  adapter: netlify(),
  integrations: [
    sentry({
      dsn: "https://7a6efe73d658a38d87f519858fdc994f@o4508455479672832.ingest.de.sentry.io/4508455481442384",
      sourceMapsUploadOptions: {
        project: "javascript-astro",
        authToken: process.env.SENTRY_AUTH_TOKEN,
        telemetry: false,
      },
    }),
  ],
  experimental: {
    svg: true,
  },
});
