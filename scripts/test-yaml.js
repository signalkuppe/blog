import fs from 'fs/promises';
import yaml from 'js-yaml';

const filePath = 'src/content/posts/2004-08-26-castore/2004-08-26-castore.mdx';

async function test() {
  const content = await fs.readFile(filePath, 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);

  if (!match) {
    console.log('No frontmatter found');
    return;
  }

  const frontmatter = match[1];

  console.log('Frontmatter length:', frontmatter.length);
  console.log('\nFirst 500 chars:');
  console.log(frontmatter.substring(0, 500));

  try {
    const parsed = yaml.load(frontmatter);
    console.log('\n✓ YAML parsed successfully!\n');
    console.log('Keys:', Object.keys(parsed));
    console.log('\nslug:', parsed.slug);
    console.log('title:', parsed.title);
    console.log('date:', parsed.date);
    console.log('cover:', parsed.cover ? 'present' : 'missing');
    console.log('gallery:', parsed.gallery ? `${parsed.gallery.length} items` : 'missing');
  } catch (error) {
    console.log('\n✗ YAML parsing error:');
    console.log(error.message);
  }
}

test().catch(console.error);
