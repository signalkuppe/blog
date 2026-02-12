import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  devToolbar: { enabled: false },
  prefetch: true,
  adapter: netlify(),
  integrations: [mdx()],
  image: {
    service: { entrypoint: 'astro/assets/services/noop' }
  },
});
