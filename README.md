# Signalkuppe.com - Mountain Adventure Blog

Personal blog about mountain adventures, ski touring, hiking, and alpine photography by Matteo Leoni. Built with Astro and deployed on Netlify. All content and UI copy is in Italian.

## 🏔️ Tech Stack

- **Framework**: [Astro 7](https://astro.build) - `output: "static"` with the Netlify adapter (`imageCDN: false`, Sharp processes images at build time); four routes opt out of prerendering for SSR (`/meteo-concenedo`, `/cerca`, `/api/meteo-concenedo`, `/api/webcam`)
- **Content**: MDX files with frontmatter and co-located media
- **Styling**: Custom CSS with `light-dark()` CSS variables for theming, JetBrains Mono everywhere, fully flat cards (no backgrounds/borders/radius/shadows)
- **Hosting**: Netlify
- **Image Format**: AVIF for optimized file sizes
- **Maps**: Leaflet with GPX track visualization
- **Charts**: Chart.js for elevation profiles and weather graphs
- **UI**: No component/UI libraries — native `<dialog>`, the Popover API, and `command`/`commandfor` invokers instead (see "UI philosophy" below)

## 📁 Project Structure

```
/
├── public/
│   ├── gpx/              # GPX track files for posts
│   ├── images/           # Static images (icons, markers)
│   └── fonts/            # Web fonts
├── src/
│   ├── components/       # Reusable Astro components
│   ├── content/
│   │   ├── posts/        # Blog posts (MDX + images)
│   │   └── portfolio/    # Portfolio photos
│   ├── content.config.ts # Content collection schemas (glob loaders)
│   ├── constants.js      # Site-wide config: title, categories, map tiles, social links
│   ├── layouts/          # Page layouts
│   ├── pages/            # Routes (file-based routing)
│   ├── lib/              # Utilities and helpers (weatherlink, forecast, dom, etc.)
│   └── assets/           # Weather icons and other bundled assets
├── netlify.toml          # Netlify configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`

The SSR-only meteo page needs two env vars locally: `SIGNALKUPPE_WEBSITE_WEATHERLINK_APIKEY` and `SIGNALKUPPE_WEBSITE_WEATHERLINK_SECRET` (WeatherLink API credentials).

## 📝 Content Management

### Blog Posts

Posts are stored in `src/content/posts/` as MDX files with co-located images. There is no post-generation script — folders and frontmatter are created by hand:

```
src/content/posts/
└── 2025-12-13-testa-dei-fra/
    ├── 2025-12-13-testa-dei-fra.mdx
    ├── cover.avif
    ├── gallery-0.avif
    ├── gallery-1.avif
    └── ...
```

The folder name doesn't drive the URL — the page route comes from the frontmatter `slug` (e.g. `scialpinismo/2025/12/13/testa-dei-fra`).

#### Post Frontmatter Structure

```yaml
---
title: "Post Title"
description: "Brief description for SEO and previews"
date: "2025-12-13T00:00"
slug: "category/2025/12/13/post-slug"
category:
  - "Scialpinismo"  # or Alpinismo, Trekking, etc. — see src/constants.js
tags:
  - "tag1"
  - "tag2"
cover:
  src: "./cover.avif"
  alt: "Image description"
gallery:
  - src: "./gallery-0.avif"
    alt: "Photo description"
  - src: "./gallery-1.avif"
    alt: "Photo description"
gpxTracks:
  - src: "track-name.gpx"
    fileName: "track-name"
location:
  lat: 45.7689
  lon: 7.6535
elevationGain: 1200
distance: 12.5
minimumAltitude: 1500
maximumAltitude: 2700
---
```

### Images

- **Format**: AVIF (optimized for web)
- **Location**: Co-located with posts in content collections
- **Optimization**: Sharp at build time (generates all size variants during `astro build`)
- **Alt Text**: Required for accessibility

Why AVIF is kept in Git:

1. AVIF files are the canonical, optimized assets used for page rendering
2. Keeping them versioned makes local builds deterministic and reproducible
3. Content and media stay synchronized in the same commit history
4. Repository size and clone time stay lower than storing large original JPGs

### GPX Tracks

- **Location**: `public/gpx/`
- **Format**: Standard GPX files
- **Usage**: Referenced in post frontmatter via filename
- **Features**: Interactive Leaflet map + Chart.js elevation profile (rendered by `PostGpx.astro`)

## 🎨 Features

### Accessibility
- Semantic HTML with proper heading hierarchy
- ARIA attributes for interactive components
- Keyboard navigation (arrow keys in search, image galleries)
- Skip to main content link
- Alt text on all images
- Focus management for dialogs

### Search (`/cerca`)
- SSR route, real-time search by title and tags
- Keyboard navigation (↑/↓ arrows, Enter, Escape)
- Visual highlighting of selected results

### Image Galleries
- Native `<dialog>`-based lightbox (`GalleryModal.astro`) — no lightbox library
- Touch/swipe support
- Keyboard navigation
- Lazy loading

### Maps & GPX
- Interactive Leaflet maps (posts map on category listings, per-post GPX map)
- GPX track overlay with start/end markers
- Elevation profile chart with smooth curves
- Statistics: elevation gain, distance, min/max altitude

### Meteo (`/meteo-concenedo`)
- SSR page pulling live data from a personal WeatherLink station, edge-cached via `Netlify-CDN-Cache-Control`
- 3-day forecast from Open-Meteo
- Cached webcam proxy (`/api/webcam`) shown in a native `<dialog>`
- Chart.js graphs on a category axis, lazy-loaded via `IntersectionObserver`

### Theme
- Dark/light mode with system preference detection via `light-dark()` CSS
- Persistent theme override (localStorage), read pre-paint in `Layout.astro`
- No JS color constants — every color is a `:root` token in `GlobalStyles.astro`

## 🧭 UI philosophy

This site deliberately avoids UI component/interaction libraries in favor of native platform features:

- Native `<dialog>`, the Popover API (with CSS anchor positioning + a centered fallback), `command`/`commandfor` invokers, `<details>`
- Vanilla inline `<script>` in Astro components; `src/lib/dom.js` holds shared client helpers
- Dynamic `import()` for the remaining heavy deps (chart.js, leaflet) so they never block first paint

Libraries like photoswipe and @floating-ui/dom were removed in favor of the above and should not be reintroduced.

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run astro` | Run Astro CLI commands |
| `npm run api` | Serve Netlify functions locally |
| `npm run deploy:test` | Build and deploy to `test--signalkuppe.netlify.app` |
| `npm run deploy:prod` | Build and deploy to production |

There is no lint script and no test suite. Type errors surface via `npm run dev` (or your editor's TS server) — a full `npm run build` is slow enough that it's not a good feedback loop for quick checks.

## 🚢 Deployment

Deployment is done with Netlify CLI from the local machine.

```bash
# Test deploy (stable alias URL: test--signalkuppe.netlify.app)
npm run deploy:test

# Production deploy
npm run deploy:prod
```

Both commands run `astro build` and then have the Netlify CLI deploy the generated `dist/` output.

## ⚙️ Configuration

### Netlify Configuration (`netlify.toml`)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_OPTIONS = "--max-old-space-size=4096"
  NODE_VERSION = "22"
  AWS_LAMBDA_JS_RUNTIME = "nodejs22.x"

# Allow the Concenedo webcam source through Netlify Image CDN
[images]
  remote_images = ["https://www\\.caiseregno\\.it/webcam_concenedo/.*"]
```

It also carries the redesign's SEO redirects (old `/blog/*` URLs → their root equivalents, `/portfolio/1` → `/portfolio`) and long-lived cache headers for `/_astro/*`, `/gpx/*`, and `/images/*`. See the file for the full list — keep the redirects intact if you touch this file.

### Astro Configuration (`astro.config.mjs`)

- **Output**: `static`, with `prefetch: { prefetchAll: true }` (every internal link prefetches on hover/tap)
- **Adapter**: `@astrojs/netlify` (`imageCDN: false` — uses Sharp at build time instead of Netlify's on-demand image CDN)
- **Integrations**: `@astrojs/mdx`, `@astrojs/sitemap` (SSR pages are excluded automatically; `/meteo-concenedo` is added back as a custom page)
- **Fonts**: JetBrains Mono via `fontProviders.fontsource()`, variable weight range `400 800`

### Content Collections Schema

Located in `src/content.config.ts` (glob loaders):
- **posts** — ~320 folders in `src/content/posts/YYYY-MM-DD-slug/`, full blog posts with images, GPX tracks, metadata
- **portfolio** — numbered folders, one photo each

## 📊 Build Output

- **Size**: ~7GB (mostly images)
- **Build Time**: First build: 10–20+ minutes locally (Sharp generates all image variants for ~320 posts); subsequent builds: fast thanks to Astro's image cache
- **Upload Time**: First deploy: varies by connection; subsequent: <2 minutes

## 🔧 Troubleshooting

### TypeScript Errors with Images

If you see type errors on `Image` components:
```bash
# Clear Astro cache
rm -rf .astro node_modules/.astro

# Restart dev server
npm run dev
```

### GPX Map Not Loading

- Check GPX file exists in `public/gpx/`
- Verify filename matches frontmatter `gpxTracks.src`
- Check browser console for network errors

### Meteo page shows stale/frozen data

The WeatherLink historic-window timestamps in `src/lib/weatherlink.js` must be computed per request, not cached at module scope — computing them once froze the data window on warm serverless instances. If this regresses, check that code path first.

### Build Memory Issues

Increase Node memory if needed:
```bash
export NODE_OPTIONS="--max-old-space-size=8192"
npm run build
```

## 📚 Key Dependencies

- `astro` - Static site generator
- `@astrojs/netlify` - Netlify adapter
- `@astrojs/mdx` - MDX support
- `@astrojs/sitemap` - Sitemap generation
- `leaflet` / `leaflet-gpx` - Interactive maps and GPX track rendering
- `chart.js` - Elevation and weather charts
- `dayjs`, `lodash`, `simplify-js` - General utilities (GPX simplification, dates)
- `netlify-cli` - Manual deployment (dev dependency)

## 🎯 Performance

- **Image Format**: AVIF (50-80% smaller than JPEG)
- **Image Optimization**: Sharp at build time (all size variants pre-generated as static files)
- **Lazy Loading**: Images below fold
- **Code Splitting**: Automatic via Astro
- **CSS**: Scoped component styles, no UI framework/runtime overhead

## 📄 License

Personal project - All content and code © Matteo Leoni

## 🤝 Contributing

This is a personal blog, but if you find bugs or have suggestions, feel free to open an issue.

---

Built with ❤️ and ⛰️ by Matteo
