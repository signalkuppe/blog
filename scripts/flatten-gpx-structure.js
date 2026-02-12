import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicGpxDir = path.join(__dirname, '../public/gpx');
const postsDir = path.join(__dirname, '../src/content/posts');

let movedCount = 0;
let updatedCount = 0;

// Step 1: Flatten GPX directory structure
console.log('Step 1: Flattening GPX directory structure...');

if (fs.existsSync(publicGpxDir)) {
  const subdirs = fs.readdirSync(publicGpxDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory());

  for (const subdir of subdirs) {
    const subdirPath = path.join(publicGpxDir, subdir.name);
    const files = fs.readdirSync(subdirPath);

    for (const file of files) {
      if (file.endsWith('.gpx')) {
        const sourcePath = path.join(subdirPath, file);
        const destPath = path.join(publicGpxDir, file);

        // Move file
        fs.renameSync(sourcePath, destPath);
        console.log(`Moved: ${subdir.name}/${file} -> ${file}`);
        movedCount++;
      }
    }

    // Remove empty subdirectory
    try {
      fs.rmdirSync(subdirPath);
      console.log(`Removed directory: ${subdir.name}`);
    } catch (err) {
      console.warn(`Could not remove directory ${subdir.name}: ${err.message}`);
    }
  }
}

console.log(`\nMoved ${movedCount} GPX files to root directory.`);

// Step 2: Update frontmatter in all posts
console.log('\nStep 2: Updating frontmatter in all posts...');

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
          console.log(`Updated: ${fullPath}`);
          updatedCount++;
        }
      } catch (error) {
        console.error(`Error processing ${fullPath}:`, error.message);
      }
    }
  }
}

updatePostFrontmatter(postsDir);

console.log(`\nUpdated ${updatedCount} post files.`);
console.log('\nDone! GPX structure flattened and frontmatter updated.');
