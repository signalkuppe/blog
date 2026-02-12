import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, '../src/content/posts');

async function fixFile(filePath) {
  let content = await fs.readFile(filePath, 'utf-8');

  // Find and simplify download links with SVG icons
  // Pattern: <a href="..." download="..." class="download-file">...<svg>...</svg>...<span>text</span></a>
  const downloadLinkPattern = /<a href="([^"]+)" download="([^"]*)" class="download-file">\s*<svg[^>]*>[\s\S]*?<\/svg>\s*<svg[^>]*>[\s\S]*?<\/svg>\s*<span>([^<]+)<\/span>\s*<\/a>/g;

  const fixed = content.replace(downloadLinkPattern, (match, href, download, text) => {
    // Simplify to just a text link with download attribute
    return `[${text}](${href})`;
  });

  if (fixed !== content) {
    await fs.writeFile(filePath, fixed, 'utf-8');
    return true;
  }

  return false;
}

async function fixAll() {
  console.log('Fixing download links in posts...\n');

  const postDirs = await fs.readdir(POSTS_DIR);
  let fixed = 0;

  for (const dir of postDirs) {
    const postDir = path.join(POSTS_DIR, dir);
    const stats = await fs.stat(postDir);

    if (stats.isDirectory()) {
      const files = await fs.readdir(postDir);
      const mdxFile = files.find(f => f.endsWith('.mdx'));

      if (mdxFile) {
        if (await fixFile(path.join(postDir, mdxFile))) {
          fixed++;
        }
      }
    }
  }

  console.log(`Fixed ${fixed} posts\n✓ Done!`);
}

fixAll().catch(error => {
  console.error('Failed:', error);
  process.exit(1);
});
