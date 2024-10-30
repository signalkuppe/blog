import * as contentful from "contentful";
import { union } from "underscore";
import cache from "./cache";

export const contentfulClient = contentful.createClient({
  space: import.meta.env.SIGNALKUPPE_WEBSITE_CONTENTFUL_SPACE,
  accessToken:
    import.meta.env.NODE_ENV === "development"
      ? import.meta.env.SIGNALKUPPE_WEBSITE_CONTENTFUL_PREVIEWTOKEN
      : import.meta.env.SIGNALKUPPE_WEBSITE_CONTENTFUL_ACCESSTOKEN,
  host:
    import.meta.env.NODE_ENV === "development"
      ? "preview.contentful.com"
      : "cdn.contentful.com",
});

export async function getPosts() {
  const cached = cache.get("posts");
  if (cached) {
    console.log("posts from cache");
    return {
      posts: cached,
    };
  }
  console.log("fetching posts from contentful");
  const query = {
    content_type: "post",
    include: 1,
    order: "-fields.date",
    limit: 1,
    skip: 0,
  };
  const perIteration = 20;
  let iteration = 1;
  let posts;
  query.limit = perIteration;
  query.skip = 0;
  let chunk = await contentfulClient.getEntries(query);
  posts = chunk.items;
  while (chunk.total > query.limit * iteration) {
    query.skip = query.limit * iteration;
    chunk = await contentfulClient.getEntries(query);
    posts = union(posts, chunk.items);
    iteration++;
  }

  cache.set("posts", posts);

  return { posts };
}
