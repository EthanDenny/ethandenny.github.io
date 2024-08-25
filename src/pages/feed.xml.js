import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context) {
  const blog = await getCollection("blog");

  return rss({
    title: "Ethan Denny",
    description: "Writing about my projects and the things I learn",
    site: context.site,
    items: blog.map((post) => {
      const content = sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      });

      return {
        link: `/blog/${post.slug}/`,
        description: content,
        content,
        ...post.data,
      };
    }),
  });
}
