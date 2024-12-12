import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  devToolbar: { enabled: false },
  prefetch: true,
  experimental: {
    svg: true,
  },
  adapter: netlify(),
});
