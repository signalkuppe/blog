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

  // Fix unescaped quotes in quoted strings
  // Pattern: Look for alt/title fields with problematic quotes
  const fixed = frontmatter.replace(
    /((?:alt|title|description): ")(.*?)(")/gm,
    (match, prefix, content, suffix) => {
      // If the content has quotes, escape them or use single quotes
      if (content.includes('"') && !content.includes('\\"')) {
        // Replace inner quotes with escaped quotes
        const escaped = content.replace(/"/g, '\\"');
        return prefix + escaped + suffix;
      }
      return match;
    }
  );

  if (fixed !== frontmatter) {
    const newContent = `---\n${fixed}\n---${rest}`;
    await fs.writeFile(filePath, newContent, 'utf-8');
    return true;
  }

  return false;
}

async function fixAll() {
  console.log('Fixing quotes in frontmatter...\n');

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
