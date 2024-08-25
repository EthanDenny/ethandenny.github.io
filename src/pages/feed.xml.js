import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export async function GET(context) {
  const blog = await getCollection("blog");

  return rss({
    title: "Ethan Denny's Blog",
    description: "Writing about my projects and the things I learn",
    site: context.site,
    items: blog.map(({ data }) => data),
  });
}
