#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";
import simplify from "simplify-js";

const SOURCE_GPX_DIR = path.resolve("public/gpx");
const OUTPUT_GPX_DIR = path.resolve(process.env.GPX_OUTPUT_DIR || "dist/gpx");
const MAX_POINTS = 1200;
const START_TOLERANCE = 0.00004;

function extractLatLon(trkpt) {
  const latMatch = trkpt.match(/\blat="([^"]+)"/);
  const lonMatch = trkpt.match(/\blon="([^"]+)"/);
  if (!latMatch || !lonMatch) return null;
  const lat = Number.parseFloat(latMatch[1]);
  const lon = Number.parseFloat(lonMatch[1]);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  return { lat, lon };
}

function simplifySegment(segmentContent) {
  const trkptRegex = /<trkpt\b[^>]*>([\s\S]*?)<\/trkpt>|<trkpt\b[^>]*\/>/g;
  const trkpts = [...segmentContent.matchAll(trkptRegex)].map((m) => m[0]);
  if (trkpts.length <= MAX_POINTS) return segmentContent;

  const mapped = trkpts
    .map((trkpt, i) => {
      const point = extractLatLon(trkpt);
      if (!point) return null;
      return {
        x: point.lon,
        y: point.lat,
        index: i,
      };
    })
    .filter(Boolean);

  if (mapped.length <= MAX_POINTS) return segmentContent;

  let tolerance = START_TOLERANCE;
  let simplified = mapped;
  while (simplified.length > MAX_POINTS && tolerance < 1) {
    simplified = simplify(mapped, tolerance, true);
    tolerance *= 1.5;
  }

  const keep = new Set(simplified.map((p) => p.index));
  const reduced = trkpts.filter((_, i) => keep.has(i)).join("\n");

  return segmentContent.replace(trkptRegex, "").replace(/\s+$/g, "") + "\n" + reduced + "\n";
}

function generateLiteGpx(content) {
  return content.replace(/<trkseg>([\s\S]*?)<\/trkseg>/g, (_full, segmentInner) => {
    const simplifiedSegment = simplifySegment(segmentInner);
    return `<trkseg>${simplifiedSegment}</trkseg>`;
  });
}

async function main() {
  await fs.mkdir(OUTPUT_GPX_DIR, { recursive: true });

  let files = await fs.readdir(SOURCE_GPX_DIR);
  files = files.filter((f) => f.endsWith(".gpx") && !f.endsWith("-lite.gpx"));

  let generated = 0;
  for (const file of files) {
    const fullPath = path.join(SOURCE_GPX_DIR, file);
    const litePath = path.join(
      OUTPUT_GPX_DIR,
      file.replace(/\.gpx$/i, "-lite.gpx"),
    );

    const source = await fs.readFile(fullPath, "utf8");
    const lite = generateLiteGpx(source);

    await fs.writeFile(litePath, lite, "utf8");
    generated += 1;
  }

  // eslint-disable-next-line no-console
  console.log(`Generated ${generated} lite GPX file(s) in ${OUTPUT_GPX_DIR}`);
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
