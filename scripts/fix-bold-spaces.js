import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDir = path.join(__dirname, '../src/content/posts');

function fixBoldSpaces(content) {
  // Fix pattern: **text ** -> **text**
  return content.replace(/\*\*([^*]+?)\s+\*\*/g, '**$1**');
}

function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.name.endsWith('.mdx')) {
      try {
        let content = fs.readFileSync(fullPath, 'utf8');
        const originalContent = content;

        content = fixBoldSpaces(content);

        if (content !== originalContent) {
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log(`Fixed: ${fullPath}`);
        }
      } catch (error) {
        console.error(`Error processing ${fullPath}:`, error.message);
      }
    }
  }
}

console.log('Fixing bold formatting with spaces...');
processDirectory(postsDir);
console.log('Done!');
