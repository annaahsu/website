import { defineConfig } from "astro/config";
import astro from "astro-robots-txt";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

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
  image: {
    service: {
      entrypoint: "astro/assets/services/noop",
    },
  },
  integrations: [astro(), mdx(), sitemap(), icon()],
  scopedStyleStrategy: "class",
});
