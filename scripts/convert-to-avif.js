import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDir = path.join(__dirname, '../src/content/posts');

let totalOriginalSize = 0;
let totalConvertedSize = 0;
let convertedCount = 0;
let errorCount = 0;

// AVIF conversion settings
const AVIF_QUALITY = 65; // Good balance of quality/size (50-80 range)
const AVIF_EFFORT = 4;    // Compression effort (0-9, higher = smaller but slower)

async function convertImageToAvif(imagePath) {
  const ext = path.extname(imagePath).toLowerCase();
  const avifPath = imagePath.replace(new RegExp(`${ext}$`), '.avif');

  // Skip if AVIF already exists
  if (fs.existsSync(avifPath)) {
    console.log(`  ⏭️  Skipped (already exists): ${path.basename(avifPath)}`);
    return null;
  }

  try {
    const stats = fs.statSync(imagePath);
    const originalSize = stats.size;

    // Convert to AVIF
    await sharp(imagePath)
      .avif({
        quality: AVIF_QUALITY,
        effort: AVIF_EFFORT,
      })
      .toFile(avifPath);

    const avifStats = fs.statSync(avifPath);
    const convertedSize = avifStats.size;

    // Calculate savings
    const savings = ((originalSize - convertedSize) / originalSize * 100).toFixed(1);

    totalOriginalSize += originalSize;
    totalConvertedSize += convertedSize;
    convertedCount++;

    console.log(`  ✅ ${path.basename(imagePath)} → ${path.basename(avifPath)}`);
    console.log(`     ${formatBytes(originalSize)} → ${formatBytes(convertedSize)} (${savings}% smaller)`);

    // Delete original after successful conversion
    fs.unlinkSync(imagePath);

    return {
      oldPath: imagePath,
      newPath: avifPath,
      oldExt: ext,
    };
  } catch (error) {
    console.error(`  ❌ Error converting ${imagePath}:`, error.message);
    errorCount++;
    return null;
  }
}

function updateFrontmatter(mdxPath, conversions) {
  if (conversions.length === 0) return;

  let content = fs.readFileSync(mdxPath, 'utf8');
  let updated = false;

  conversions.forEach(({ oldExt }) => {
    // Update frontmatter (cover.src and gallery[].src)
    const frontmatterRegex = new RegExp(`(src:\\s*"\\./[^"]+)${oldExt}"`, 'g');
    const beforeFrontmatter = content;
    content = content.replace(frontmatterRegex, `$1.avif"`);
    if (content !== beforeFrontmatter) updated = true;

    // Update MDX import statements
    // Example: import inline_image_0 from "./inline-xyz.jpg";
    const importRegex = new RegExp(`(import\\s+\\w+\\s+from\\s+"\\./[^"]+)${oldExt}"`, 'g');
    const beforeImport = content;
    content = content.replace(importRegex, `$1.avif"`);
    if (content !== beforeImport) updated = true;
  });

  if (updated) {
    fs.writeFileSync(mdxPath, content, 'utf8');
    console.log(`  📝 Updated frontmatter and imports in ${path.basename(mdxPath)}`);
  }
}

async function processPostDirectory(postDir) {
  const entries = fs.readdirSync(postDir, { withFileTypes: true });

  console.log(`\n📁 Processing: ${path.basename(postDir)}`);

  const conversions = [];
  const imageExtensions = ['.jpg', '.jpeg', '.png'];

  // Find and convert all images
  for (const entry of entries) {
    const fullPath = path.join(postDir, entry.name);

    if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();

      if (imageExtensions.includes(ext)) {
        const result = await convertImageToAvif(fullPath);
        if (result) {
          conversions.push(result);
        }
      }
    }
  }

  // Update frontmatter if any conversions happened
  if (conversions.length > 0) {
    const mdxFile = entries.find(e => e.name.endsWith('.mdx'));
    if (mdxFile) {
      updateFrontmatter(path.join(postDir, mdxFile.name), conversions);
    }
  }
}

async function processAllPosts() {
  console.log('🚀 Starting AVIF conversion...');
  console.log(`Quality: ${AVIF_QUALITY}, Effort: ${AVIF_EFFORT}\n`);

  const postDirs = fs.readdirSync(postsDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => path.join(postsDir, entry.name));

  for (const postDir of postDirs) {
    await processPostDirectory(postDir);
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Conversion Summary:');
  console.log('='.repeat(60));
  console.log(`✅ Converted: ${convertedCount} images`);
  console.log(`❌ Errors: ${errorCount} images`);
  console.log(`📦 Original size: ${formatBytes(totalOriginalSize)}`);
  console.log(`📦 New size: ${formatBytes(totalConvertedSize)}`);
  console.log(`💰 Saved: ${formatBytes(totalOriginalSize - totalConvertedSize)} (${((totalOriginalSize - totalConvertedSize) / totalOriginalSize * 100).toFixed(1)}%)`);
  console.log('='.repeat(60));
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Run the conversion
processAllPosts().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
