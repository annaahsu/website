import { defineConfig } from "astro/config";
import image from "@astrojs/image";
import astro from "astro-robots-txt";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://annahsu.dev",
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
  markdown: {
    syntaxHighlight: "prism",
  },
  integrations: [
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    astro(),
    mdx(),
    sitemap(),
  ],
  scopedStyleStrategy: "class",
});
