#!/usr/bin/env node
/**
 * cleanup-avif.js
 *
 * Removes unreferenced AVIF and JPG source copies from dist/_astro/ after build.
 *
 * Astro emits the original source file for every imported image alongside the
 * processed variants (e.g. resized WebP thumbnails). These originals are never
 * linked in HTML — they are dead weight that inflates deploy size significantly.
 *
 * This script:
 *   1. Collects all *.avif and *.jpg/*.jpeg filenames from dist/_astro/
 *   2. Scans all HTML and JS files in dist/ for /_astro/*.avif and /_astro/*.jpg references
 *   3. Deletes any file that is not referenced
 *
 * Run automatically via the postbuild npm script.
 */

import { readFileSync, readdirSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { glob } from "glob";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
const astroDir = join(distDir, "_astro");

const allFiles = readdirSync(astroDir);
const avifFiles = allFiles.filter((f) => f.endsWith(".avif"));
const jpgFiles = allFiles.filter(
  (f) => f.endsWith(".jpg") || f.endsWith(".jpeg") || f.endsWith(".JPG"),
);

// Scan HTML and JS output files for referenced filenames.
const scanFiles = [
  ...glob.sync("**/*.html", { cwd: distDir, absolute: true }),
  ...glob.sync("_astro/**/*.js", { cwd: distDir, absolute: true }),
];

const referencedAvif = new Set();
const referencedJpg = new Set();

for (const file of scanFiles) {
  const content = readFileSync(file, "utf-8");
  for (const match of content.matchAll(/\/_astro\/([^\s"',>]+?\.avif)/g)) {
    referencedAvif.add(match[1]);
  }
  for (const match of content.matchAll(/\/_astro\/([^\s"',>]+?\.jpe?g)/gi)) {
    referencedJpg.add(match[1]);
  }
}

function cleanup(files, referenced, label) {
  let deleted = 0;
  let savedBytes = 0;
  for (const filename of files) {
    if (!referenced.has(filename)) {
      const filePath = join(astroDir, filename);
      savedBytes += statSync(filePath).size;
      unlinkSync(filePath);
      deleted++;
    }
  }
  const savedMB = (savedBytes / 1024 / 1024).toFixed(1);
  console.log(`cleanup-avif: removed ${deleted} ${label} files, saved ${savedMB} MB`);
}

cleanup(avifFiles, referencedAvif, "AVIF");
cleanup(jpgFiles, referencedJpg, "JPG");
