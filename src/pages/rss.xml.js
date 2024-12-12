import rss from "@astrojs/rss";
import { siteTitle, siteSlogan, prodSiteUrl } from "../constants";
import { getData } from "../lib/contentful";
const { post: posts } = await getData({ type: "post", sort: "-fields.date" });

export function GET() {
  return rss({
    title: siteTitle,
    description: "Lista delle uscite pubblicate",
    site: prodSiteUrl,
    items: posts.map((post) => ({
      title: post.fields.title,
      pubDate: post.fields.date,
      description: post.fields.description,
      link: `${prodSiteUrl}/${post.fields.slug}/`,
    })),
    customData: `<language>it</language>`,
  });
}
