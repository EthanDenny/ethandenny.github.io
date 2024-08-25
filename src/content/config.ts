import { z, defineCollection } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
  }),
});

export const collections = {
  blog: postsCollection,
  draft: postsCollection,
};
