import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    draft: z.boolean(),
  }),
});

export const collections = {
  blog: blogCollection,
};
