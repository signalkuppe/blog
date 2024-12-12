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

export async function getData({ type, sort }) {
  const cached = cache.get(type);
  if (cached) {
    console.log(`${type} from cache`);
    return {
      [type]: cached,
    };
  }

  const query = {
    content_type: type,
    include: 1,
    order: sort,
    limit: 1,
    skip: 0,
  };

  console.log(`fetching ${type} from contentful`);
  const perIteration = 20;
  let iteration = 1;
  let items;
  query.limit = perIteration;
  query.skip = 0;
  let chunk = await contentfulClient.getEntries(query);
  items = chunk.items;
  while (chunk.total > query.limit * iteration) {
    query.skip = query.limit * iteration;
    chunk = await contentfulClient.getEntries(query);
    items = union(items, chunk.items);
    iteration++;
  }

  cache.set(type, items);

  return { [type]: items };
}
