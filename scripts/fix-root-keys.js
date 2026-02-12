import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, '../src/content/posts');

// Known root-level keys that should not be indented
const ROOT_KEYS = ['title', 'description', 'date', 'slug', 'category', 'tags', 'cover', 'gallery', 'gpxTracks', 'location', 'elevationGain', 'distance', 'minimumAltitude', 'maximumAltitude'];

async function fixFile(filePath) {
  let content = await fs.readFile(filePath, 'utf-8');

  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    return false;
  }

  const frontmatter = match[1];
  const rest = content.substring(match[0].length);

  const lines = frontmatter.split('\n');
  const fixed = [];
  let changed = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if this line is a root key that's incorrectly indented
    const indentedKeyMatch = line.match(/^(\s+)(\w+):\s*$/);

    if (indentedKeyMatch) {
      const indent = indentedKeyMatch[1];
      const key = indentedKeyMatch[2];

      if (ROOT_KEYS.includes(key) && indent.length === 2) {
        // This is a root key that's indented - fix it
        fixed.push(`${key}:`);
        i++;

        // Fix the properties under this key
        while (i < lines.length) {
          const nextLine = lines[i];

          // Check if it's a property of this object (not indented or minimally indented)
          if (nextLine.match(/^\s{0,2}\w+:/) && !nextLine.match(/^(\w+:|\s{4,})/)) {
            // This property needs to be indented 2 spaces
            const trimmed = nextLine.trim();
            fixed.push(`  ${trimmed}`);
            i++;
          } else {
            i--; // Back up so the outer loop processes this line
            break;
          }
        }

        changed = true;
      } else {
        fixed.push(line);
      }
    } else {
      fixed.push(line);
    }
  }

  if (changed) {
    const newFrontmatter = fixed.join('\n');
    const newContent = `---\n${newFrontmatter}\n---${rest}`;
    await fs.writeFile(filePath, newContent, 'utf-8');
    return true;
  }

  return false;
}

async function fixAll() {
  console.log('Fixing root key indentation...\n');

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
          if (fixed % 50 === 0) console.log(`  ${fixed} posts fixed...`);
        }
      }
    }
  }

  console.log(`Posts: ${fixed} fixed\n✓ Done!`);
}

fixAll().catch(error => {
  console.error('Failed:', error);
  process.exit(1);
});
