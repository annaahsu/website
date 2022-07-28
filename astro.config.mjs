import { defineConfig } from "astro/config";
import image from "@astrojs/image";
import astro from "astro-robots-txt";
import mdx from "@astrojs/mdx";

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
  experimental: {
    integrations: true,
  },
  integrations: [image(), astro(), mdx()],
});
