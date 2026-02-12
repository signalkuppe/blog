import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDir = path.join(__dirname, '../src/content/posts');

let updatedCount = 0;

function updatePostFrontmatter(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      updatePostFrontmatter(fullPath);
    } else if (entry.name.endsWith('.mdx')) {
      try {
        let content = fs.readFileSync(fullPath, 'utf8');
        const originalContent = content;

        // Update gpxTracks src to remove ./ prefix
        content = content.replace(
          /src:\s*"\.\/([^"]+\.gpx)"/g,
          'src: "$1"'
        );

        if (content !== originalContent) {
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log(`Updated: ${entry.name}`);
          updatedCount++;
        }
      } catch (error) {
        console.error(`Error processing ${fullPath}:`, error.message);
      }
    }
  }
}

console.log('Updating frontmatter in all posts...');
updatePostFrontmatter(postsDir);
console.log(`\nUpdated ${updatedCount} post files.`);
