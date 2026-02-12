import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDir = path.join(__dirname, '../src/content/posts');

// Test with just one post
const TEST_POST = '2025-12-13-testa-dei-fra';

let totalOriginalSize = 0;
let totalConvertedSize = 0;
let convertedCount = 0;
let errorCount = 0;

const AVIF_QUALITY = 65;
const AVIF_EFFORT = 4;

async function convertImageToAvif(imagePath) {
  const ext = path.extname(imagePath).toLowerCase();
  const avifPath = imagePath.replace(new RegExp(`${ext}$`), '.avif');

  if (fs.existsSync(avifPath)) {
    console.log(`  ⏭️  Skipped (already exists): ${path.basename(avifPath)}`);
    return null;
  }

  try {
    const stats = fs.statSync(imagePath);
    const originalSize = stats.size;

    console.log(`  🔄 Converting: ${path.basename(imagePath)}...`);

    await sharp(imagePath)
      .avif({
        quality: AVIF_QUALITY,
        effort: AVIF_EFFORT,
      })
      .toFile(avifPath);

    const avifStats = fs.statSync(avifPath);
    const convertedSize = avifStats.size;

    const savings = ((originalSize - convertedSize) / originalSize * 100).toFixed(1);

    totalOriginalSize += originalSize;
    totalConvertedSize += convertedSize;
    convertedCount++;

    console.log(`  ✅ ${path.basename(imagePath)} → ${path.basename(avifPath)}`);
    console.log(`     ${formatBytes(originalSize)} → ${formatBytes(convertedSize)} (${savings}% smaller)`);

    // DON'T delete original in test mode
    console.log(`     ⚠️  Original kept for testing: ${path.basename(imagePath)}`);

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
  const originalContent = content;

  conversions.forEach(({ oldExt }) => {
    // Update frontmatter (cover.src and gallery[].src)
    const frontmatterRegex = new RegExp(`(src:\\s*"\\./[^"]+)${oldExt}"`, 'g');
    content = content.replace(frontmatterRegex, `$1.avif"`);

    // Update MDX import statements
    const importRegex = new RegExp(`(import\\s+\\w+\\s+from\\s+"\\./[^"]+)${oldExt}"`, 'g');
    content = content.replace(importRegex, `$1.avif"`);
  });

  if (content !== originalContent) {
    updated = true;
  }

  if (updated) {
    // Show what would change
    console.log(`\n  📝 Frontmatter and import changes in ${path.basename(mdxPath)}:`);
    console.log(`     Would update: ${conversions.length} image references`);

    // Actually write the file
    fs.writeFileSync(mdxPath, content, 'utf8');
    console.log(`     ✅ Updated!`);
  }
}

async function processTestPost() {
  const postDir = path.join(postsDir, TEST_POST);

  if (!fs.existsSync(postDir)) {
    console.error(`❌ Test post not found: ${TEST_POST}`);
    console.log('\nAvailable posts:');
    fs.readdirSync(postsDir, { withFileTypes: true })
      .filter(e => e.isDirectory())
      .slice(0, 5)
      .forEach(e => console.log(`  - ${e.name}`));
    process.exit(1);
  }

  console.log('🧪 TEST MODE - Converting one post only');
  console.log(`📁 Post: ${TEST_POST}`);
  console.log(`Quality: ${AVIF_QUALITY}, Effort: ${AVIF_EFFORT}\n`);

  const entries = fs.readdirSync(postDir, { withFileTypes: true });
  const conversions = [];
  const imageExtensions = ['.jpg', '.jpeg', '.png'];

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

  if (conversions.length > 0) {
    const mdxFile = entries.find(e => e.name.endsWith('.mdx'));
    if (mdxFile) {
      updateFrontmatter(path.join(postDir, mdxFile.name), conversions);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Test Results:');
  console.log('='.repeat(60));
  console.log(`✅ Converted: ${convertedCount} images`);
  console.log(`❌ Errors: ${errorCount} images`);
  console.log(`📦 Original size: ${formatBytes(totalOriginalSize)}`);
  console.log(`📦 New size: ${formatBytes(totalConvertedSize)}`);
  console.log(`💰 Saved: ${formatBytes(totalOriginalSize - totalConvertedSize)} (${((totalOriginalSize - totalConvertedSize) / totalOriginalSize * 100).toFixed(1)}%)`);
  console.log('='.repeat(60));
  console.log('\n⚠️  NOTE: Original files were kept in test mode');
  console.log('💡 If results look good, run: node scripts/convert-to-avif.js');
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

processTestPost().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
