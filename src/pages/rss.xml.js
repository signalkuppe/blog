import rss from "@astrojs/rss";
import { siteTitle, siteSlogan, prodSiteUrl } from "../constants";
import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('posts');
  posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: siteTitle,
    description: "Lista delle uscite pubblicate",
    site: prodSiteUrl,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `${prodSiteUrl}/${post.slug}/`,
    })),
    customData: `<language>it</language>`,
  });
}
