import { rssSchema } from "@astrojs/rss";

export const collections = {
  blog: rssSchema,
  draft: rssSchema,
};
