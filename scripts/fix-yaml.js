import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, '../src/content/posts');
const PORTFOLIO_DIR = path.join(__dirname, '../src/content/portfolio');

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
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Check if this is an array item (line with dash)
    const dashMatch = line.match(/^(\s*)- (\w+:.*)/);

    if (dashMatch) {
      const indent = dashMatch[1];
      const firstProp = dashMatch[2];
      const propIndent = indent + '  '; // Properties should be indented 2 more spaces

      fixed.push(line);
      i++;

      // Collect subsequent properties for this array item
      while (i < lines.length) {
        const nextLine = lines[i];

        // Check if it's a property of this array item
        // Must be indented more than the dash level, must have a colon, must not be another dash
        const currentIndentMatch = nextLine.match(/^(\s*)/);
        const currentIndent = currentIndentMatch ? currentIndentMatch[1].length : 0;
        const dashIndent = indent.length;

        if (nextLine.match(/^\s+\w+:/) && !nextLine.match(/^\s*- /) && currentIndent > dashIndent) {
          // This is a property of the array item, fix its indentation
          const trimmed = nextLine.trim();
          fixed.push(propIndent + trimmed);
          i++;
        } else {
          break;
        }
      }
    } else {
      fixed.push(line);
      i++;
    }
  }

  const newFrontmatter = fixed.join('\n');

  if (newFrontmatter !== frontmatter) {
    const newContent = `---\n${newFrontmatter}\n---${rest}`;
    await fs.writeFile(filePath, newContent, 'utf-8');
    return true;
  }

  return false;
}

async function fixAll() {
  console.log('Fixing YAML indentation...\n');

  // Posts
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

  console.log(`Posts: ${fixed} fixed\n`);

  // Portfolio
  const portfolioDirs = await fs.readdir(PORTFOLIO_DIR);
  fixed = 0;

  for (const dir of portfolioDirs) {
    const portfolioDir = path.join(PORTFOLIO_DIR, dir);
    const stats = await fs.stat(portfolioDir);

    if (stats.isDirectory()) {
      const mdFile = path.join(portfolioDir, 'index.md');
      try {
        await fs.access(mdFile);
        if (await fixFile(mdFile)) fixed++;
      } catch (e) {}
    }
  }

  console.log(`Portfolio: ${fixed} fixed\n`);
  console.log('✓ Done!');
}

fixAll().catch(error => {
  console.error('Failed:', error);
  process.exit(1);
});
