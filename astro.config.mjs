import { defineConfig } from "astro/config";
import astro from "astro-robots-txt";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

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
    astro(),
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    sitemap(),
    icon(),
  ],
  scopedStyleStrategy: "class",
});
