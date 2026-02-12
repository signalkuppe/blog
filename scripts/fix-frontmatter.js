import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, '../src/content/posts');
const PORTFOLIO_DIR = path.join(__dirname, '../src/content/portfolio');

function jsonToYaml(obj, indent = 0) {
  const spaces = ' '.repeat(indent);
  let yaml = '';

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) {
      continue;
    }

    if (Array.isArray(value)) {
      yaml += `${spaces}${key}:\n`;
      for (const item of value) {
        if (typeof item === 'object' && item !== null) {
          // For object arrays, put first property on same line as dash
          const entries = Object.entries(item);
          if (entries.length > 0) {
            const [firstKey, firstValue] = entries[0];
            const firstStrValue = typeof firstValue === 'string' ? `"${firstValue}"` : firstValue;
            yaml += `${spaces}  - ${firstKey}: ${firstStrValue}\n`;

            // Rest of properties indented under the dash
            for (let i = 1; i < entries.length; i++) {
              const [k, v] = entries[i];
              const strValue = typeof v === 'string' ? `"${v}"` : v;
              yaml += `${spaces}    ${k}: ${strValue}\n`;
            }
          }
        } else {
          const strValue = typeof item === 'string' ? `"${item}"` : item;
          yaml += `${spaces}  - ${strValue}\n`;
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      yaml += `${spaces}${key}:\n`;
      yaml += jsonToYaml(value, indent + 2);
    } else {
      const strValue = typeof value === 'string' ? `"${value}"` : value;
      yaml += `${spaces}${key}: ${strValue}\n`;
    }
  }

  return yaml;
}

async function fixFrontmatter(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');

  // Extract frontmatter
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    return false;
  }

  const frontmatterText = match[1];
  const restOfContent = content.substring(match[0].length);

  // Try to parse as JSON first (original format)
  try {
    const frontmatterObj = JSON.parse(`{${frontmatterText}}`);

    // Convert to proper YAML
    const yamlFrontmatter = jsonToYaml(frontmatterObj);

    // Write back
    const newContent = `---\n${yamlFrontmatter}---${restOfContent}`;
    await fs.writeFile(filePath, newContent, 'utf-8');

    return true;
  } catch (error) {
    // Already in YAML format, try to re-convert if it has bad indentation
    // Check if it has the problematic pattern (dash on its own line)
    if (frontmatterText.includes('\n  -\n')) {
      // Extract all lines and rebuild
      try {
        // This is a workaround - use js-yaml to parse and re-stringify
        const yaml = await import('js-yaml');
        const parsed = yaml.load(frontmatterText);
        const yamlFrontmatter = jsonToYaml(parsed);

        const newContent = `---\n${yamlFrontmatter}---${restOfContent}`;
        await fs.writeFile(filePath, newContent, 'utf-8');

        return true;
      } catch (e) {
        console.error(`  ✗ Error fixing ${filePath}:`, e.message);
        return false;
      }
    }

    return false;
  }
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
