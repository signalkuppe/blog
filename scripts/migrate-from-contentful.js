import * as contentful from 'contentful';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import slugFn from 'slug';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Contentful client
const client = contentful.createClient({
  space: process.env.SIGNALKUPPE_WEBSITE_CONTENTFUL_SPACE,
  accessToken: process.env.SIGNALKUPPE_WEBSITE_CONTENTFUL_ACCESSTOKEN,
  host: 'cdn.contentful.com',
});

const POSTS_DIR = path.join(__dirname, '..', 'src', 'content', 'posts');
const PORTFOLIO_DIR = path.join(__dirname, '..', 'src', 'content', 'portfolio');
const PUBLIC_GPX_DIR = path.join(__dirname, '..', 'public', 'gpx');

// Helper to download file
async function downloadFile(url, filepath) {
  const fullUrl = url.startsWith('//') ? `https:${url}` : url;
  console.log(`  Downloading: ${fullUrl}`);

  const response = await fetch(fullUrl);
  if (!response.ok) {
    throw new Error(`Failed to download ${fullUrl}: ${response.statusText}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(filepath, buffer);
}

// Helper to sanitize filename
function sanitizeFilename(filename) {
  return filename
    .replace(/[^a-z0-9.-]/gi, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}

// Helper to format date as YYYY-MM-DD
function formatDatePrefix(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

// Convert Contentful rich text to MDX
function richTextToMDX(document, inlineImages) {
  let imports = [];
  let mdxContent = [];
  let imageCounter = 0;

  function processNode(node, inList = false) {
    const nodeType = node.nodeType;

    switch (nodeType) {
      case 'document':
        return node.content.map(n => processNode(n)).join('\n\n');

      case BLOCKS.PARAGRAPH:
        const paraContent = node.content.map(n => processNode(n)).join('');
        return inList ? paraContent : paraContent;

      case BLOCKS.HEADING_2:
        return `### ${node.content.map(n => processNode(n)).join('')}`;

      case BLOCKS.HEADING_3:
        return `#### ${node.content.map(n => processNode(n)).join('')}`;

      case BLOCKS.UNORDERED_LIST:
        return node.content.map(n => processNode(n, true)).join('\n');

      case BLOCKS.ORDERED_LIST:
        return node.content.map((n, i) => {
          const content = processNode(n, true);
          return `${i + 1}. ${content}`;
        }).join('\n');

      case BLOCKS.LIST_ITEM:
        const listContent = node.content.map(n => processNode(n, true)).join('');
        return inList ? `- ${listContent}` : listContent;

      case BLOCKS.EMBEDDED_ASSET:
        const asset = node.data.target;
        if (asset && asset.fields && asset.fields.file) {
          const contentType = asset.fields.file.contentType;

          if (contentType.startsWith('image/')) {
            const imgId = asset.sys.id;
            const existingImg = inlineImages.find(img => img.id === imgId);

            if (existingImg) {
              const importName = `inline_image_${imageCounter++}`;
              const alt = asset.fields.title || '';

              imports.push({
                name: importName,
                path: `./${existingImg.filename}`
              });

              return `<PostImage src={${importName}} alt="${alt}" />`;
            }
          }
        }
        return '';

      case INLINES.HYPERLINK:
        const url = node.data.uri;
        const linkText = node.content.map(n => processNode(n)).join('');

        // Check if it's a YouTube video
        if (url.includes('youtube') && linkText.toLowerCase().includes('youtube')) {
          return `\n\n<iframe\n  data-youtube-embed\n  src="${url}"\n  frameBorder="0"\n  allow="accelerometer; autoplay; encrypted-media; gyroscope;"\n  allowFullScreen\n></iframe>\n\n`;
        }

        return `[${linkText}](${url})`;

      case INLINES.ASSET_HYPERLINK:
        const linkAsset = node.data.target;
        const linkLabel = node.content.map(n => processNode(n)).join('');

        if (linkAsset && linkAsset.fields && linkAsset.fields.file) {
          const fileName = linkAsset.fields.title || 'file';
          const fileUrl = linkAsset.fields.file.url;
          const fullFileUrl = fileUrl.startsWith('//') ? `https:${fileUrl}` : fileUrl;

          return `<a href="${fullFileUrl}" download="${fileName}" class="download-file">
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="download-icon">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="download-spinner">
    <style>{\`.download-spinner-animation { transform-origin: center; animation: spinner_svv2 0.75s infinite linear; } @keyframes spinner_svv2 { 100% { transform: rotate(360deg); } }\`}</style>
    <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" className="download-spinner-animation" fill="currentColor" />
  </svg>
  <span>${linkLabel}</span>
</a>`;
        }
        return '';

      case INLINES.ENTRY_HYPERLINK:
        const entryLink = node.data.target;
        const entryText = node.content.map(n => processNode(n)).join('');

        if (entryLink && entryLink.fields) {
          const slug = entryLink.fields.slug || '';
          const description = entryLink.fields.description || '';
          return `[${entryText}](/${slug} "${description}")`;
        }
        return entryText;

      case 'text':
        let text = node.value;

        // Handle marks (bold, italic, etc.)
        if (node.marks && node.marks.length > 0) {
          node.marks.forEach(mark => {
            if (mark.type === 'bold') {
              text = `**${text}**`;
            } else if (mark.type === 'italic') {
              text = `*${text}*`;
            } else if (mark.type === 'code') {
              text = `\`${text}\``;
            }
          });
        }

        return text;

      default:
        // For unsupported node types, try to process content if it exists
        if (node.content) {
          return node.content.map(n => processNode(n)).join('');
        }
        return '';
    }
  }

  const content = processNode(document);

  return { imports, content };
}

// Process a single post
async function migratePost(post) {
  const fields = post.fields;
  const slug = fields.slug;
  const date = fields.date;
  const datePrefix = formatDatePrefix(date);
  const folderName = `${datePrefix}-${slug.split('/').pop()}`;
  const postDir = path.join(POSTS_DIR, folderName);

  console.log(`\nMigrating post: ${fields.title}`);
  console.log(`  Folder: ${folderName}`);

  // Create post directory
  await fs.mkdir(postDir, { recursive: true });

  // Download cover image
  let coverInfo = null;
  if (fields.cover && fields.cover.fields && fields.cover.fields.file) {
    const coverUrl = fields.cover.fields.file.url;
    const coverExt = path.extname(coverUrl.split('?')[0]) || '.jpg';
    const coverFilename = `cover${coverExt}`;
    const coverPath = path.join(postDir, coverFilename);

    await downloadFile(coverUrl, coverPath);

    coverInfo = {
      src: `./${coverFilename}`,
      alt: fields.cover.fields.title || fields.title,
      width: fields.cover.fields.file.details.image.width,
      height: fields.cover.fields.file.details.image.height,
    };
  }

  // Download gallery images
  let galleryInfo = [];
  if (fields.gallery && fields.gallery.length > 0) {
    console.log(`  Downloading ${fields.gallery.length} gallery images...`);

    for (let i = 0; i < fields.gallery.length; i++) {
      const photo = fields.gallery[i];
      if (photo && photo.fields && photo.fields.file) {
        const photoUrl = photo.fields.file.url;
        const photoExt = path.extname(photoUrl.split('?')[0]) || '.jpg';
        const photoFilename = sanitizeFilename(`gallery-${i}${photoExt}`);
        const photoPath = path.join(postDir, photoFilename);

        await downloadFile(photoUrl, photoPath);

        galleryInfo.push({
          src: `./${photoFilename}`,
          alt: photo.fields.title || `Gallery image ${i + 1}`,
          width: photo.fields.file.details.image.width,
          height: photo.fields.file.details.image.height,
        });
      }
    }
  }

  // Extract and download inline images from body
  let inlineImages = [];
  if (fields.body && fields.body.content) {
    function extractAssets(node) {
      if (node.nodeType === BLOCKS.EMBEDDED_ASSET) {
        const asset = node.data.target;
        if (asset && asset.fields && asset.fields.file) {
          const contentType = asset.fields.file.contentType;
          if (contentType.startsWith('image/')) {
            inlineImages.push({
              id: asset.sys.id,
              asset: asset
            });
          }
        }
      }

      if (node.content) {
        node.content.forEach(child => extractAssets(child));
      }
    }

    fields.body.content.forEach(node => extractAssets(node));

    // Download inline images
    if (inlineImages.length > 0) {
      console.log(`  Downloading ${inlineImages.length} inline images...`);

      for (const img of inlineImages) {
        const imgUrl = img.asset.fields.file.url;
        const imgExt = path.extname(imgUrl.split('?')[0]) || '.jpg';
        const imgFilename = sanitizeFilename(`inline-${img.id}${imgExt}`);
        const imgPath = path.join(postDir, imgFilename);

        await downloadFile(imgUrl, imgPath);
        img.filename = imgFilename;
      }
    }
  }

  // Download GPX files
  let gpxInfo = [];
  const gpxTracks = fields.gpxTracks || fields.gpsTracks || [];

  if (gpxTracks.length > 0) {
    console.log(`  Downloading ${gpxTracks.length} GPX files...`);

    for (const track of gpxTracks) {
      if (track && track.fields && track.fields.file) {
        const fileName = track.fields.file.fileName;
        if (fileName && fileName.endsWith('.gpx')) {
          const trackUrl = track.fields.file.url;
          const trackFilename = sanitizeFilename(fileName);
          const trackPath = path.join(postDir, trackFilename);

          await downloadFile(trackUrl, trackPath);

          // Also copy to public/gpx for client-side access
          const publicGpxDir = path.join(PUBLIC_GPX_DIR, slug.split('/').pop());
          await fs.mkdir(publicGpxDir, { recursive: true });
          const publicGpxPath = path.join(publicGpxDir, trackFilename);
          await fs.copyFile(trackPath, publicGpxPath);

          gpxInfo.push({
            src: `./${trackFilename}`,
            fileName: track.fields.title || fileName,
          });
        }
      }
    }
  }

  // Convert body to MDX
  let mdxImports = [];
  let mdxBody = '';

  if (fields.body) {
    const { imports, content } = richTextToMDX(fields.body, inlineImages);
    mdxImports = imports;
    mdxBody = content;
  }

  // Generate frontmatter
  const frontmatter = {
    title: fields.title,
    description: fields.description || '',
    date: fields.date,
    slug: fields.slug,
    category: Array.isArray(fields.category) ? fields.category : [fields.category],
  };

  if (fields.tags && fields.tags.length > 0) {
    frontmatter.tags = fields.tags;
  }

  if (coverInfo) {
    frontmatter.cover = coverInfo;
  }

  if (galleryInfo.length > 0) {
    frontmatter.gallery = galleryInfo;
  }

  if (gpxInfo.length > 0) {
    frontmatter.gpxTracks = gpxInfo;
  }

  if (fields.location) {
    frontmatter.location = {
      lat: fields.location.lat,
      lon: fields.location.lon,
    };
  }

  if (fields.elevationGain) frontmatter.elevationGain = fields.elevationGain;
  if (fields.distance) frontmatter.distance = fields.distance;
  if (fields.minimumAltitude) frontmatter.minimumAltitude = fields.minimumAltitude;
  if (fields.maximumAltitude) frontmatter.maximumAltitude = fields.maximumAltitude;

  // Generate MDX file content
  let mdxFileContent = '---\n';
  mdxFileContent += JSON.stringify(frontmatter, null, 2).slice(1, -1).trim() + '\n';
  mdxFileContent += '---\n\n';

  // Add imports
  if (mdxImports.length > 0) {
    mdxFileContent += 'import PostImage from "../../../components/PostImage.astro";\n';
    for (const imp of mdxImports) {
      mdxFileContent += `import ${imp.name} from "${imp.path}";\n`;
    }
    mdxFileContent += '\n';
  }

  // Add body
  mdxFileContent += mdxBody;

  // Write MDX file
  const mdxFilename = `${folderName}.mdx`;
  const mdxPath = path.join(postDir, mdxFilename);
  await fs.writeFile(mdxPath, mdxFileContent, 'utf-8');

  console.log(`  ✓ Post migrated successfully`);
}

// Process a single portfolio item
async function migratePortfolio(portfolioItem, index) {
  const fields = portfolioItem.fields;
  const folderName = String(index);
  const portfolioDir = path.join(PORTFOLIO_DIR, folderName);

  console.log(`\nMigrating portfolio: ${fields.title || fields.photo?.fields?.title}`);
  console.log(`  Folder: ${folderName}`);

  // Create portfolio directory
  await fs.mkdir(portfolioDir, { recursive: true });

  // Download photo
  let photoInfo = null;
  if (fields.photo && fields.photo.fields && fields.photo.fields.file) {
    const photoUrl = fields.photo.fields.file.url;
    const photoExt = path.extname(photoUrl.split('?')[0]) || '.jpg';
    const photoFilename = `photo${photoExt}`;
    const photoPath = path.join(portfolioDir, photoFilename);

    await downloadFile(photoUrl, photoPath);

    photoInfo = {
      src: `./${photoFilename}`,
      alt: fields.photo.fields.title || fields.title || 'Portfolio photo',
      width: fields.photo.fields.file.details.image.width,
      height: fields.photo.fields.file.details.image.height,
    };
  }

  // Generate frontmatter
  const frontmatter = {
    date: fields.date,
    title: fields.title || fields.photo?.fields?.title || 'Untitled',
    photo: photoInfo,
  };

  // Generate markdown file content
  let mdContent = '---\n';
  mdContent += JSON.stringify(frontmatter, null, 2).slice(1, -1).trim() + '\n';
  mdContent += '---\n';

  // Write markdown file
  const mdPath = path.join(portfolioDir, 'index.md');
  await fs.writeFile(mdPath, mdContent, 'utf-8');

  console.log(`  ✓ Portfolio item migrated successfully`);
}

// Main migration function
async function migrate() {
  console.log('Starting Contentful to Astro Content Collections migration...\n');

  // Create directories
  await fs.mkdir(POSTS_DIR, { recursive: true });
  await fs.mkdir(PORTFOLIO_DIR, { recursive: true });
  await fs.mkdir(PUBLIC_GPX_DIR, { recursive: true });

  // Fetch all posts
  console.log('Fetching posts from Contentful...');
  let allPosts = [];
  let skip = 0;
  const limit = 20;
  let hasMore = true;

  while (hasMore) {
    const response = await client.getEntries({
      content_type: 'post',
      order: '-fields.date',
      limit: limit,
      skip: skip,
      include: 2,
    });

    allPosts = allPosts.concat(response.items);
    skip += limit;
    hasMore = response.items.length === limit;

    console.log(`  Fetched ${allPosts.length} posts...`);
  }

  console.log(`\nTotal posts to migrate: ${allPosts.length}`);

  // Migrate posts
  for (const post of allPosts) {
    try {
      await migratePost(post);
    } catch (error) {
      console.error(`  ✗ Error migrating post "${post.fields.title}":`, error.message);
    }
  }

  // Fetch all portfolio items
  console.log('\n\nFetching portfolio items from Contentful...');
  let allPortfolio = [];
  skip = 0;
  hasMore = true;

  while (hasMore) {
    const response = await client.getEntries({
      content_type: 'portfolio',
      order: '-fields.date',
      limit: limit,
      skip: skip,
      include: 1,
    });

    allPortfolio = allPortfolio.concat(response.items);
    skip += limit;
    hasMore = response.items.length === limit;

    console.log(`  Fetched ${allPortfolio.length} portfolio items...`);
  }

  console.log(`\nTotal portfolio items to migrate: ${allPortfolio.length}`);

  // Migrate portfolio items
  for (let i = 0; i < allPortfolio.length; i++) {
    try {
      await migratePortfolio(allPortfolio[i], i + 1);
    } catch (error) {
      console.error(`  ✗ Error migrating portfolio item ${i + 1}:`, error.message);
    }
  }

  console.log('\n\n✓ Migration complete!');
  console.log(`  Posts: ${allPosts.length}`);
  console.log(`  Portfolio: ${allPortfolio.length}`);
}

// Run migration
migrate().catch(error => {
  console.error('Migration failed:', error);
  process.exit(1);
});
