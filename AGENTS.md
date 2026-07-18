# AGENTS.md

Guidance for AI coding agents working in this repository.

## What this is

Personal mountain-adventure blog (signalkuppe.com) by Matteo Leoni. Astro 7, deployed to Netlify. All content and UI copy is in **Italian**.

## Commands

```bash
npm run dev          # dev server at localhost:4321
npm run build        # rm -rf dist .astro && astro build
npm run preview      # preview the production build
npm run deploy:test  # build + deploy to test--signalkuppe.netlify.app
npm run deploy:prod  # build + deploy to production
```

There are no tests and no lint script. A full build is slow the first time (Sharp pre-generates every image variant for ~320 posts; 10–20+ min, ~7 GB dist) but fast afterward thanks to Astro's image cache — avoid `npm run build` for quick verification; type errors surface in `npm run dev`.

The SSR pages need env vars locally: `SIGNALKUPPE_WEBSITE_WEATHERLINK_APIKEY` and `SIGNALKUPPE_WEBSITE_WEATHERLINK_SECRET` (WeatherLink API, used by the meteo page).

## Architecture

**Output model:** `output: "static"` with the Netlify adapter (`imageCDN: false` — images are processed by Sharp at build time, not on demand). Almost everything is prerendered; only four routes opt out with `export const prerender = false`: `/meteo-concenedo`, `/cerca` (search), `/api/meteo-concenedo`, `/api/webcam`. These run as Netlify functions.

**Content collections** (`src/content.config.ts`, glob loaders):
- `posts` — ~320 folders in `src/content/posts/YYYY-MM-DD-slug/` containing an MDX file plus co-located AVIF images (cover + gallery). AVIFs are intentionally committed to git as the canonical assets. Frontmatter includes category, tags, GPX track refs, lat/lon, and elevation stats.
- `portfolio` — numbered folders with one photo each.

**Routing** (`src/pages/`):
- `[...category]/[...page].astro` — paginated post listings at the site root: `/`, `/2`, `/scialpinismo`, `/scialpinismo/2`, etc. Categories are the hardcoded list in `src/constants.js`; a post's first category is the one that counts. Includes a Leaflet map of post locations.
- `[...post].astro` — individual posts. The URL is the post's `id`, which comes from the frontmatter `slug` (e.g. `scialpinismo/2025/12/13/testa-dei-fra`), not the folder name.
- Old `/blog/*` URLs 301 to the root equivalents via `netlify.toml` — the redesign moved listings from `/blog` to `/`; keep those redirects intact.

**Site-wide config lives in `src/constants.js`** (title, categories, map tile URL, social links) and `astro.config.mjs` (fonts via `fontProviders.fontsource()`, sitemap, prefetch-all).

**GPX tracks** live in `public/gpx/` and are referenced by filename from post frontmatter; `PostGpx.astro` renders the Leaflet map + Chart.js elevation profile.

### Meteo subsystem (`/meteo-concenedo`)

SSR page edge-cached via `Netlify-CDN-Cache-Control` (s-maxage=60 + stale-while-revalidate on success, s-maxage=30 on failure) so visitors never wait on the upstream API calls.

- `src/lib/weatherlink.js` — fetches the personal weather station data (~8 WeatherLink API calls). Elapsed 24h historic windows are cached at module scope; timestamps must be computed **per call** with the 7-day window start hour-aligned — computing them at module scope froze the data window on warm serverless instances (a bug that already happened once).
- `src/lib/forecast.js` — 3-day forecast from Open-Meteo (free, keyless), fetched server-side, 15-min module cache, WMO code → icon/Italian-description map.
- `src/lib/weatherIcons.js` + `WeatherIcon.astro` — Meteocons *line*-style SVGs from `src/assets/weather-icons/`, inlined with their colliding `id="a"` gradients namespaced per icon.
- `/api/webcam` — cached proxy to the caiseregno.it webcam PHP script (can't be bypassed: image filenames are timestamped). Shown in a native `<dialog>`, fetched on first open. The remote domain is allowlisted under `[images]` in `netlify.toml`.
- `MeteoGraphs.astro` — bare chart.js on a **category axis** (no date adapter, no datalabels plugin — deliberately removed, don't re-add), lazy-loaded via IntersectionObserver. Chart colors are resolved at draw time from computed styles because `light-dark()` CSS values aren't canvas-parseable.

## UI conventions (deliberate, do not regress)

The redesign (branch `redesign-26`) systematically removed UI libraries in favor of native platform features. **Do not add UI dependencies or re-add removed ones** (photoswipe, @floating-ui/dom, chartjs plugins). Reach for:

- Native `<dialog>`, Popover API (with CSS anchor positioning + centered fallback), `command`/`commandfor` invokers, `details`.
- Vanilla inline `<script>` in Astro components; `src/lib/dom.js` has shared client helpers.
- Dynamic `import()` for the remaining heavy deps (chart.js, leaflet) so they never block first paint.

Design language: JetBrains Mono everywhere, heavy (800/900) headings, fully **flat** cards — no backgrounds, borders, radius, or shadows; whitespace separates sections (a `--color-surface` token was tried and explicitly dropped). Colors are `:root` tokens in `GlobalStyles.astro` using `light-dark()`, never JS constants; page-specific tokens are prefixed (`--color-weather-*`); cross-page chart colors are exactly two tokens: `--color-graph-bg` and `--color-graph-line`. Theme override is stored in localStorage under the key in `src/constants.js` and read pre-paint in `Layout.astro`.

## Known staleness

`README.md` predates the redesign in places: it says Astro 5, and references `scripts/generate-post.js`, a `postbuild` cleanup-avif step, photoswipe, and @floating-ui/dom — none of which exist on this branch. Trust the code over the README where they disagree.
