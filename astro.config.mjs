import { defineConfig, fontProviders, svgoOptimizer } from "astro/config";
import netlify from "@astrojs/netlify";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: "static",
  compressHTML: true,
  prefetch: true,
  adapter: netlify(),
  integrations: [mdx()],
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
      weights: ["400 700 900"],
      styles: ["normal"],
      subsets: ["latin"],
    },
  ],
});
