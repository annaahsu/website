import { defineConfig } from "astro/config";
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  vite: {
    ssr: {
      external: ['svgo']
    }
  },
  integrations: [image()]
});