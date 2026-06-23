// Cached, same-origin proxy for the third-party Concenedo webcam endpoint.
// Fetched client-side by MeteoWebCam so the slow PHP source never blocks the
// server render of /meteo-concenedo. CDN-cached with stale-while-revalidate.
export const prerender = false;

const WEBCAM_URL = "https://www.caiseregno.it/webcam_concenedo/webcam.php";

export async function GET() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(WEBCAM_URL, { signal: controller.signal });
    clearTimeout(timeout);
    const data = await response.json();
    const rawUrl = data?.url ?? null;

    // Serve the 4K source through Netlify Image CDN (resized/optimized, then
    // edge-cached). In dev the /.netlify/images endpoint isn't available, so
    // fall back to the raw URL. Format is auto-negotiated (webp/avif).
    const url = !rawUrl
      ? null
      : import.meta.env.DEV
        ? rawUrl
        : `/.netlify/images?url=${encodeURIComponent(rawUrl)}&w=1600&q=70`;

    return new Response(JSON.stringify({ url }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        // Edge-cache for 2 min, serve stale while revalidating for 5 more.
        "Netlify-CDN-Cache-Control":
          "public, durable, s-maxage=120, stale-while-revalidate=300",
        "Cache-Control": "public, max-age=60",
      },
    });
  } catch (error) {
    clearTimeout(timeout);
    console.error("Webcam fetch failed:", error.message);
    return new Response(JSON.stringify({ url: null }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  }
}
