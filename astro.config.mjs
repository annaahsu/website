import { defineConfig } from "astro/config";
import image from "@astrojs/image";

import astro from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://annahsu.dev",
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
  experimental: {
    integrations: true,
  },
  integrations: [image(), astro()],
});
