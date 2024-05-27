// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    description: z.string(),
    permalink: z.string(),
    tags: z.array(z.string()),
    cover: z.string(),
  }),
});
// Export a single `collections` object to register your collection(s)
export const collections = {
  blog: postsCollection,
};
