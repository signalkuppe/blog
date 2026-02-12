import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, '../src/content/posts');
const PORTFOLIO_DIR = path.join(__dirname, '../src/content/portfolio');

async function fixFile(filePath) {
  let content = await fs.readFile(filePath, 'utf-8');

  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return false;

  const frontmatter = match[1];
  const rest = content.substring(match[0].length);

  const lines = frontmatter.split('\n');
  const fixed = [];
  let changed = false;

  for (const line of lines) {
    // Check for lines with unescaped quotes in quoted values
    // Pattern: key: "value with "inner" quotes"
    const quotedMatch = line.match(/^(\s*\w+: ")(.*)(")/);

    if (quotedMatch) {
      const [, prefix, content, suffix] = quotedMatch;

      // Check if content has unescaped quotes
      if (content.includes('"') && !content.includes('\\"')) {
        // Escape the inner quotes
        const escaped = content.replace(/"/g, '\\"');
        fixed.push(prefix + escaped + suffix);
        changed = true;
        continue;
      }
    }

    fixed.push(line);
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
  console.log('Fixing quotes in YAML...\n');

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
