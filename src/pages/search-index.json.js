import { getCollection } from "astro:content";
import { getImage } from "astro:assets";

// Static JSON search index. Built once at deploy time and fetched lazily by the
// search autocomplete (src/lib/search-autocomplete.js) on first use, instead of
// inlining the whole dataset into every HTML page.
//
// The cover image is emitted as a small WebP thumbnail (not the full-res
// original, and not AVIF — the postbuild cleanup script removes AVIF/JPG in
// _astro/ that are not referenced in HTML/JS, and it does not scan this JSON).
export async function GET() {
  const posts = await getCollection("posts");
  posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const dataset = await Promise.all(
    posts.map(async (post) => {
      const thumb = await getImage({
        src: post.data.cover.src,
        width: 120,
        height: 120,
        fit: "cover",
        format: "webp",
        quality: 60,
      });

      return {
        title: post.data.title,
        slug: (post.id ?? "").replace(/\.(md|mdx)$/i, ""),
        tags: post.data.tags || [],
        date: post.data.date.toISOString(),
        description: post.data.description,
        image: thumb.src,
      };
    }),
  );

  return new Response(JSON.stringify(dataset), {
    headers: { "Content-Type": "application/json" },
  });
}
