# Signalkuppe.com - Mountain Adventure Blog

Personal blog about mountain adventures, ski touring, hiking, and alpine photography by Matteo Leoni. Built with Astro and deployed on Netlify.

## 🏔️ Tech Stack

- **Framework**: [Astro 5](https://astro.build) - Static site generation with content collections
- **Content**: MDX files with frontmatter and co-located media
- **Styling**: Custom CSS with CSS variables for theming (dark/light mode)
- **Hosting**: Netlify
- **Image Format**: AVIF for optimized file sizes
- **Original Downloads**: Cloudinary (JPG conversion + attachment delivery)
- **Maps**: Leaflet with GPX track visualization
- **Charts**: Chart.js for elevation profiles

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
│   ├── layouts/          # Page layouts
│   ├── pages/            # Routes (file-based routing)
│   ├── lib/              # Utilities and helpers
│   └── icons/            # SVG icons
├── netlify.toml          # Netlify configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or equivalent package manager

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`

## 📝 Content Management

### Blog Posts

Posts are stored in `src/content/posts/` as MDX files with co-located images:

```
src/content/posts/
└── 2025-12-13-testa-dei-fra/
    ├── 2025-12-13-testa-dei-fra.mdx
    ├── cover.avif
    ├── gallery-0.avif
    ├── gallery-1.avif
    └── ...
```

#### Post Frontmatter Structure

```yaml
---
title: "Post Title"
description: "Brief description for SEO and previews"
date: "2025-12-13T00:00"
slug: "category/2025/12/13/post-slug"
category:
  - "Scialpinismo"  # or Alpinismo, Trekking, etc.
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
- **Optimization**: Disabled in build (images are pre-optimized)
- **Alt Text**: Required for accessibility

Why AVIF is kept in Git:

1. AVIF files are the canonical, optimized assets used for page rendering
2. Keeping them versioned makes local builds deterministic and reproducible
3. Content and media stay synchronized in the same commit history
4. Repository size and clone time stay lower than storing large original JPGs
5. Original-download bandwidth is handled by Cloudinary instead of Netlify

### GPX Tracks

- **Location**: `public/gpx/`
- **Format**: Standard GPX files
- **Usage**: Referenced in post frontmatter via filename
- **Features**: Interactive map + elevation chart

## 🤖 Script Workflows

### Generate a New Post From JPG Files

Use `scripts/generate-post.js` through:

```bash
# From project root
npm run generate-post src/content/posts/YYYY-MM-DD-post-slug

# Or from inside a post folder
cd src/content/posts/YYYY-MM-DD-post-slug
npm run generate-post
```

What it does:

1. Converts JPG files to AVIF (quality 85)
2. Renames output files to `gallery-0.avif`, `gallery-1.avif`, ...
3. Picks a random cover image from gallery files
4. Picks a random inline image from gallery files
5. Generates a starter MDX file with frontmatter and placeholder sections
6. Deletes original JPG files after successful conversion

After running the script, update title/description, category, tags, slug, alt text, and optional GPX/location metadata.

### Cloudinary Upload Sync

Use `scripts/upload-originals-cloudinary.js` through:

```bash
npm run upload-cloudinary-originals
```

What it does:

1. Scans `src/content/posts` and `src/content/portfolio`
2. Skips unchanged files when `sha1` + `bytes` + `publicId` match mapping
3. Uploads only new/changed files
4. Auto-resizes/compresses files over upload limit (default 10MB) before upload
5. Retries failed uploads with exponential backoff
6. Supports chunked uploads for large payloads
7. Can retry only failed files from the previous run
8. Writes mapping to `src/data/cloudinary-originals.json`
9. Writes a run report to `tmp/cloudinary-upload-report.json`

Useful commands:

```bash
# Full sync
npm run upload-cloudinary-originals

# Retry only previously failed files
npm run upload-cloudinary-originals -- --only-failures

# Tune retries/timeouts if needed
npm run upload-cloudinary-originals -- --max-retries=6 --request-timeout-ms=180000
```

Required environment variables:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Optional environment variables:

- `CLOUDINARY_POSTS_FOLDER` (default: `signalkuppe.com/posts`)
- `CLOUDINARY_PORTFOLIO_FOLDER` (default: `signalkuppe.com/portoflio`)
- `CLOUDINARY_MAX_RETRIES` (default: `4`)
- `CLOUDINARY_RETRY_BASE_MS` (default: `1500`)
- `CLOUDINARY_REQUEST_TIMEOUT_MS` (default: `120000`)
- `CLOUDINARY_LARGE_FILE_THRESHOLD_BYTES` (default: `10485760`)
- `CLOUDINARY_CHUNK_SIZE_BYTES` (default: `6291456`)
- `CLOUDINARY_MAX_UPLOAD_FILE_BYTES` (default: `10485760`)

## 🎨 Features

### Accessibility
- Semantic HTML with proper heading hierarchy
- ARIA attributes for interactive components
- Keyboard navigation (arrow keys in search, image galleries)
- Skip to main content link
- Alt text on all images
- Focus management for dialogs

### Search
- Real-time search by title and tags
- Keyboard navigation (↑/↓ arrows, Enter, Escape)
- Visual highlighting of selected results
- Autocomplete suggestions

### Image Galleries
- PhotoSwipe lightbox integration
- Touch/swipe support
- Keyboard navigation
- Lazy loading

### Maps & GPX
- Interactive Leaflet maps
- GPX track overlay with start/end markers
- Elevation profile chart with smooth curves
- Statistics: elevation gain, distance, min/max altitude

### Theme
- Dark/light mode with system preference detection
- Persistent theme selection (localStorage)
- CSS custom properties for easy theming

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run build:deploy` | Upload Cloudinary originals, then build |
| `npm run preview` | Preview production build locally |
| `npm run astro` | Run Astro CLI commands |
| `npm run deploy:test` | Upload originals, build, deploy test alias |
| `npm run deploy:prod` | Upload originals, build, deploy production |
| `npm run generate-post` | Generate post starter content from JPG files |
| `npm run upload-cloudinary-originals` | Upload/sync originals to Cloudinary |

## 🚢 Deployment

Deployment is done with Netlify CLI from the local machine.

### Deploy Commands

```bash
# Test deploy (stable alias URL: test--signalkuppe.netlify.app)
npm run deploy:test

# Production deploy
npm run deploy:prod
```

### Deployment Process

1. `upload-originals-cloudinary` syncs new/changed originals to Cloudinary
2. `astro build` creates `dist/`
3. Netlify CLI deploys the generated output

### Why Cloudinary for Original Downloads

1. Netlify bandwidth was dominated by large original photo downloads from lightbox
2. Astro-generated page images remain optimized for viewing (AVIF/WebP)
3. Original download traffic is offloaded to Cloudinary CDN
4. Download links use Cloudinary transformations to force JPG and attachment behavior
5. Upload script is incremental, so deploys do not re-upload unchanged media

Cloudinary folder strategy:

- Posts: `signalkuppe.com/posts/<post-folder>/<file>`
- Portfolio: `signalkuppe.com/portoflio/<id>/photo`

## ⚙️ Configuration

### Netlify Configuration (`netlify.toml`)

```toml
[build]
  command = "npm run build:deploy"
  publish = "dist"

[build.environment]
  NODE_OPTIONS = "--max-old-space-size=4096"

[[redirects]]
  from = "/portfolio"
  to = "/portfolio/1"
  status = 301
```

### Astro Configuration (`astro.config.mjs`)

- **Adapter**: `@astrojs/netlify` for serverless deployment
- **Integrations**: `@astrojs/mdx` for MDX support
- **Image Service**: Disabled (images are pre-optimized as AVIF)

### Content Collections Schema

Located in `src/content/config.ts`:
- **Posts**: Full blog posts with images, GPX tracks, metadata
- **Portfolio**: Photo portfolio items

## 📊 Build Output

- **Size**: ~7GB (mostly images)
- **Files**: ~6,000 files
- **Build Time**: ~2-3 minutes locally
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
- `leaflet` - Interactive maps
- `leaflet-gpx` - GPX track rendering
- `chart.js` - Elevation charts
- `photoswipe` - Image lightbox
- `@floating-ui/dom` - Tooltips and popovers
- `netlify-cli` - Manual deployment

## 🎯 Performance

- **Image Format**: AVIF (50-80% smaller than JPEG)
- **Image Optimization**: Disabled (pre-optimized)
- **Lazy Loading**: Images below fold
- **Code Splitting**: Automatic via Astro
- **CSS**: Scoped component styles
- **Original Downloads**: Served from Cloudinary (JPG attachment delivery)

## 📄 License

Personal project - All content and code © Matteo Leoni

## 🤝 Contributing

This is a personal blog, but if you find bugs or have suggestions, feel free to open an issue.

---

Built with ❤️ and ⛰️ by Matteo
