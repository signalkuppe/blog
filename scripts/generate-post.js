#!/usr/bin/env node

import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { writeFile } from 'fs/promises';
import { join, basename, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Sample content sections
const SAMPLE_SECTIONS = [
  {
    title: "Partenza e avvicinamento",
    content: "Partiamo dal parcheggio e iniziamo a salire lungo il sentiero. Il percorso si snoda attraverso boschi e prati, offrendo scorci panoramici sulla vallata sottostante. La traccia è ben segnalata e non presenta difficoltà particolari."
  },
  {
    title: "Tratto intermedio",
    content: "Proseguiamo lungo la cresta, dove il terreno diventa più esposto. La vista si apre su un magnifico panorama che spazia dalle cime circostanti fino alle valli più lontane. Il sentiero continua con pendenze moderate ma costanti."
  },
  {
    title: "Arrivo in vetta",
    content: "Gli ultimi metri ci portano alla vetta, dove veniamo ricompensati da una vista mozzafiato a 360 gradi. Il panorama spazia dalle montagne più vicine fino all'orizzonte. È il momento perfetto per una pausa e qualche foto ricordo."
  },
  {
    title: "Discesa e ritorno",
    content: "La discesa segue lo stesso percorso dell'andata. Prestiamo particolare attenzione nei tratti più ripidi, dove il terreno può essere scivoloso. Il rientro al parcheggio conclude una bellissima giornata in montagna."
  }
];

// Random ID generator for inline images
function generateRandomId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Convert JPG to AVIF and get dimensions
async function convertImage(inputPath, outputPath) {
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  await image
    .avif({ quality: 85, effort: 6 })
    .toFile(outputPath);

  return {
    width: metadata.width,
    height: metadata.height
  };
}

// Main function
async function generatePost() {
  // Use provided path or current working directory
  const targetPath = process.argv[2] || process.cwd();
  const cwd = targetPath.startsWith('/') ? targetPath : join(process.cwd(), targetPath);

  console.log(`🔍 Working in: ${cwd}`);

  // Find all JPG files
  const files = await readdir(cwd);
  const jpgFiles = files.filter(f => {
    const ext = extname(f).toLowerCase();
    return ext === '.jpg' || ext === '.jpeg';
  }).sort();

  if (jpgFiles.length === 0) {
    console.error('❌ No JPG files found in current directory');
    process.exit(1);
  }

  console.log(`📸 Found ${jpgFiles.length} JPG files`);

  // Convert all images to gallery
  const images = [];

  for (let i = 0; i < jpgFiles.length; i++) {
    const jpgFile = jpgFiles[i];
    console.log(`🖼️  Converting image ${i + 1}/${jpgFiles.length}: ${jpgFile}`);

    const galleryPath = join(cwd, `gallery-${i}.avif`);
    const dims = await convertImage(join(cwd, jpgFile), galleryPath);

    images.push({
      type: 'gallery',
      filename: `gallery-${i}.avif`,
      alt: `Descrizione immagine ${i + 1}`,
      ...dims
    });
  }

  // Select random cover image
  const randomCoverIndex = Math.floor(Math.random() * images.length);
  const coverImage = images[randomCoverIndex];

  // Select one random inline image from gallery (can be different from cover)
  const randomInlineIndex = Math.floor(Math.random() * images.length);
  const inlineImages = [{
    filename: images[randomInlineIndex].filename,
    alt: images[randomInlineIndex].alt,
    varName: 'inline_image'
  }];

  // Get folder name for default values
  const folderName = basename(cwd);
  const dateMatch = folderName.match(/^(\d{4}-\d{2}-\d{2})/);
  const defaultDate = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];

  // Generate MDX content
  const mdxContent = generateMDXContent(images, coverImage, inlineImages, defaultDate, folderName);

  // Write MDX file
  const mdxPath = join(cwd, `${folderName}.mdx`);
  await writeFile(mdxPath, mdxContent, 'utf8');

  console.log(`\n✅ Successfully generated: ${mdxPath}`);
  console.log(`📝 Total images: ${images.length}`);
  console.log(`🎨 Cover image: ${coverImage.filename}`);
  console.log(`📄 Inline image: ${inlineImages[0].filename}`);

  // Delete original JPG files
  console.log(`\n🗑️  Deleting original JPG files...`);
  for (const jpgFile of jpgFiles) {
    const jpgPath = join(cwd, jpgFile);
    await unlink(jpgPath);
    console.log(`   ✓ Deleted: ${jpgFile}`);
  }

  console.log(`\n⚠️  Remember to update:`);
  console.log(`   - Title, description, and slug`);
  console.log(`   - Category and tags`);
  console.log(`   - Image alt texts`);
  console.log(`   - Location and GPX data (if applicable)`);
  console.log(`   - Content text`);
}

function generateMDXContent(images, coverImage, inlineImages, defaultDate, folderName) {
  let content = `---
title: "Titolo del post"
description: "Descrizione breve del post"
date: "${defaultDate}T00:00"
slug: "categoria/yyyy/mm/dd/${folderName}"
category:
  - "Escursionismo"
tags:
  - "tag1"
  - "tag2"
cover:
  src: "./${coverImage.filename}"
  alt: "${coverImage.alt}"
  width: ${coverImage.width}
  height: ${coverImage.height}
gallery:
`;

  // Add all images to gallery
  images.forEach(img => {
    content += `  - src: "./${img.filename}"
    alt: "${img.alt}"
    width: ${img.width}
    height: ${img.height}
`;
  });

  // Optional fields (commented out by default)
  content += `# gpxTracks:
#   - src: "track.gpx"
#     fileName: "Track Name"
# location:
#   lat: 45.0000
#   lon: 9.0000
# maximumAltitude: 2000
# elevationGain: 800
# distance: 10.5
---

import PostImage from "../../../components/PostImage.astro";
`;

  // Add inline image imports
  inlineImages.forEach(img => {
    content += `import ${img.varName} from "./${img.filename}";\n`;
  });

  content += '\n';

  // Add sample content with one inline image in the middle
  SAMPLE_SECTIONS.forEach((section, index) => {
    content += `### ${section.title}\n\n`;

    // Add inline image in the second section
    if (index === 1 && inlineImages.length > 0) {
      const img = inlineImages[0];
      content += `<PostImage src={${img.varName}} alt="${img.alt}" />\n\n`;
    }

    content += `${section.content}\n\n`;
  });

  return content;
}

// Run the script
generatePost().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
