import rss from "@astrojs/rss";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import { getCollection } from "astro:content";
import { parse as htmlParser } from "node-html-parser";
import { getImage } from "astro:assets";

const markdownParser = new MarkdownIt();
const imagesGlob = import.meta.glob("/src/images/**/*.{jpeg,jpg,png,gif}");

export async function GET(context) {
  if (!context.site) {
    throw Error("site not set");
  }

  const blog = await getCollection("blog");
  const feed = [];

  for (const post of blog) {
    const body = markdownParser.render(post.body);
    const html = htmlParser.parse(body);
    const images = html.querySelectorAll("img");

    for (const img of images) {
      const src = img.getAttribute("src");

      const prefixRemoved = src.replaceAll("../", "");
      const imagePathPrefix = `/src/${prefixRemoved}`;

      const imagePath = await imagesGlob[imagePathPrefix]?.()?.then(
        (res) => res.default,
      );

      if (imagePath) {
        const optimizedImg = await getImage({ src: imagePath });
        img.setAttribute(
          "src",
          context.site + optimizedImg.src.replace("/", ""),
        );
      }
    }

    const content = sanitizeHtml(html.toString(), {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    });

    feed.push({
      link: `/blog/${post.slug}/`,
      description: content,
      content,
      ...post.data,
    });
  }

  return rss({
    title: "Ethan Denny",
    description: "Writing about my projects and the things I learn",
    site: context.site,
    items: feed,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
    },
    customData: [
      "<language>en-ca</language>",
      `<atom:link href="${new URL("rss.xml", context.site)}" rel="self" type="application/rss+xml" />`,
    ].join(""),
    trailingSlash: false,
  });
}
