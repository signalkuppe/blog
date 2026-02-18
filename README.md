# Signalkuppe.com - Mountain Adventure Blog

Personal blog about mountain adventures, ski touring, hiking, and alpine photography by Matteo Leoni. Built with Astro and deployed on Netlify.

## 🏔️ Tech Stack

- **Framework**: [Astro 5](https://astro.build) - Static site generation with content collections
- **Content**: MDX files with frontmatter, stored in Git with LFS for images
- **Styling**: Custom CSS with CSS variables for theming (dark/light mode)
- **Hosting**: Netlify (manual deployment from local build)
- **Image Format**: AVIF for optimized file sizes
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

### GPX Tracks

- **Location**: `public/gpx/`
- **Format**: Standard GPX files
- **Usage**: Referenced in post frontmatter via filename
- **Features**: Interactive map + elevation chart

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
| `npm run preview` | Preview production build locally |
| `npm run astro` | Run Astro CLI commands |

## 🚢 Deployment

The site uses **manual deployment** to Netlify to avoid build timeouts with large image assets.

### Initial Setup

The Netlify CLI is installed locally:

```bash
# Already installed in package.json
npm install
```

### Deploy Commands

```bash
# Draft deploy (temporary preview URL)
npm run deploy:draft

# Test deploy (stable alias URL: test--signalkuppe.netlify.app)
npm run deploy:test

# Production deploy
npm run deploy:prod
```

### Deployment Process

1. **Local Build**: Site builds locally with full Node.js resources (4GB memory)
2. **Netlify CLI**: Uploads only changed files (delta uploads)
3. **First Deploy**: ~7GB upload (all images)
4. **Subsequent Deploys**: Only changed files (~10-50MB typically)

### Deploy Scripts Explained

- **`deploy:draft`**: Creates temporary preview with random URL
  - Use for: Quick testing
  - URL format: `[random-hash]--signalkuppe.netlify.app`

- **`deploy:test`**: Creates stable test environment
  - Use for: Extended testing, sharing with others
  - URL format: `test--signalkuppe.netlify.app`
  - Same URL on every deploy

- **`deploy:prod`**: Deploys to production
  - Use for: Going live
  - URL: `www.signalkuppe.com`

### Why Manual Deployment?

- **Build Timeouts**: Netlify's build environment times out with 7GB of images
- **Memory Limits**: Local machine has more memory for image processing
- **Faster Iterations**: Build locally, test, then deploy
- **Delta Uploads**: Only changed files upload (much faster after first deploy)

## ⚙️ Configuration

### Netlify Configuration (`netlify.toml`)

```toml
[build]
  command = "npm run build"
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
- **Prefetch**: Automatic link prefetching

## 📄 License

Personal project - All content and code © Matteo Leoni

## 🤝 Contributing

This is a personal blog, but if you find bugs or have suggestions, feel free to open an issue.

---

Built with ❤️ and ⛰️ by Matteo
