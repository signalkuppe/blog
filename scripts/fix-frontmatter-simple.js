import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, '../src/content/posts');
const PORTFOLIO_DIR = path.join(__dirname, '../src/content/portfolio');

async function fixFrontmatter(filePath) {
  let content = await fs.readFile(filePath, 'utf-8');

  // Extract frontmatter
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    return false;
  }

  const frontmatterText = match[1];
  const restOfContent = content.substring(match[0].length);

  // Fix the bad indentation pattern:
  // Convert:
  //   -
  //       src: "./gallery-0.jpeg"
  //       alt: "..."
  //     -
  //       src: "./gallery-1.jpeg"
  // To:
  //   - src: "./gallery-0.jpeg"
  //     alt: "..."
  //   - src: "./gallery-1.jpeg"

  let fixed = frontmatterText;
  let changed = false;

  // Pattern 1: dash on its own line followed by indented properties
  // Replace:  -\n      key: value  with:  - key: value
  fixed = fixed.replace(/^(  )-\n(      )(\w+:)/gm, '$1- $3');
  if (fixed !== frontmatterText) changed = true;

  // Pattern 2: dash at wrong indentation in middle of array
  // Replace:    -\n      key: value  with:  - key: value
  fixed = fixed.replace(/^(    )-\n(      )(\w+:)/gm, '  - $3');
  if (fixed !== frontmatterText) changed = true;

  // Pattern 3: Fix any remaining extra indentation on non-first properties
  // After a dash, properties should be indented 2 more spaces
  const lines = fixed.split('\n');
  const newLines = [];
  let inArray = false;
  let arrayIndent = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect array start
    if (line.match(/^(\s+)\w+:\s*$/)) {
      const nextLine = lines[i + 1] || '';
      if (nextLine.match(/^\s+- /)) {
        inArray = true;
        arrayIndent = nextLine.match(/^(\s+)-/)[1].length;
      }
      newLines.push(line);
      continue;
    }

    // Detect array item
    if (inArray && line.match(/^(\s+)- /)) {
      const currentIndent = line.match(/^(\s+)-/)[1].length;
      if (currentIndent !== arrayIndent) {
        // Wrong indentation, fix it
        newLines.push(' '.repeat(arrayIndent) + line.trim());
      } else {
        newLines.push(line);
      }
      continue;
    }

    // Check if we exited array
    if (inArray && line.match(/^\s*\w+:/) && !line.match(/^\s{4,}\w+:/)) {
      inArray = false;
    }

    // For properties after dash, ensure they're indented correctly
    if (inArray && line.match(/^\s{4,}\w+:/) && !line.match(/^\s*- /)) {
      // Property in array item, should be indented arrayIndent + 2
      const propertyIndent = arrayIndent + 2;
      newLines.push(' '.repeat(propertyIndent) + line.trim());
    } else {
      newLines.push(line);
    }
  }

  fixed = newLines.join('\n');
  if (fixed !== frontmatterText) changed = true;

  if (changed) {
    const newContent = `---\n${fixed}\n---${restOfContent}`;
    await fs.writeFile(filePath, newContent, 'utf-8');
    return true;
  }

  return false;
}

async function fixAllFrontmatter() {
  console.log('Fixing frontmatter in all posts...\n');

  // Fix posts
  const postDirs = await fs.readdir(POSTS_DIR);
  let fixed = 0;

  for (const dir of postDirs) {
    const postDir = path.join(POSTS_DIR, dir);
    const stats = await fs.stat(postDir);

    if (stats.isDirectory()) {
      const files = await fs.readdir(postDir);
      const mdxFile = files.find(f => f.endsWith('.mdx'));

      if (mdxFile) {
        const result = await fixFrontmatter(path.join(postDir, mdxFile));
        if (result) {
          fixed++;
          if (fixed % 50 === 0) {
            console.log(`  Fixed ${fixed} posts...`);
          }
        }
      }
    }
  }

  console.log(`Posts: Fixed ${fixed} total\n`);

  // Fix portfolio
  console.log('Fixing frontmatter in all portfolio items...\n');

  const portfolioDirs = await fs.readdir(PORTFOLIO_DIR);
  fixed = 0;

  for (const dir of portfolioDirs) {
    const portfolioDir = path.join(PORTFOLIO_DIR, dir);
    const stats = await fs.stat(portfolioDir);

    if (stats.isDirectory()) {
      const mdFile = path.join(portfolioDir, 'index.md');
      try {
        await fs.access(mdFile);
        const result = await fixFrontmatter(mdFile);
        if (result) fixed++;
      } catch (e) {
        // File doesn't exist, skip
      }
    }
  }

  console.log(`Portfolio: Fixed ${fixed} total\n`);
  console.log('✓ Done!');
}

fixAllFrontmatter().catch(error => {
  console.error('Failed:', error);
  process.exit(1);
});
