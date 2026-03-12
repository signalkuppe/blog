#!/usr/bin/env node

import { createHash, randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "src/content/posts");
const PORTFOLIO_DIR = path.join(ROOT, "src/content/portfolio");
const MAPPING_PATH = path.join(ROOT, "src/data/cloudinary-originals.json");
const REPORT_PATH = path.join(ROOT, "tmp/cloudinary-upload-report.json");

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const DEFAULT_POSTS_FOLDER = "signalkuppe.com/posts";
const DEFAULT_PORTFOLIO_FOLDER = "signalkuppe.com/portoflio";
const DEFAULT_MAX_RETRIES = 4;
const DEFAULT_RETRY_BASE_MS = 1500;
const DEFAULT_REQUEST_TIMEOUT_MS = 120000;
const DEFAULT_LARGE_FILE_THRESHOLD_BYTES = 10 * 1024 * 1024;
const DEFAULT_CHUNK_SIZE_BYTES = 6 * 1024 * 1024;
const DEFAULT_MAX_UPLOAD_FILE_BYTES = 10 * 1024 * 1024;

function getEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

async function collectFiles(dir) {
  const results = [];
  async function walk(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }
      const ext = path.extname(entry.name).toLowerCase();
      if (SUPPORTED_EXTENSIONS.has(ext)) {
        results.push(fullPath);
      }
    }
  }
  await walk(dir);
  return results;
}

async function sha1File(filePath) {
  const content = await fs.readFile(filePath);
  return createHash("sha1").update(content).digest("hex");
}

function cloudinarySignature(params, apiSecret) {
  const payload = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
  return createHash("sha1")
    .update(`${payload}${apiSecret}`)
    .digest("hex");
}

function getArgNumber(name, fallback) {
  const arg = process.argv.find((value) => value.startsWith(`${name}=`));
  if (!arg) return fallback;
  const value = Number.parseInt(arg.slice(name.length + 1), 10);
  if (Number.isNaN(value) || value < 0) return fallback;
  return value;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatError(error) {
  if (!error) return "Unknown error";
  const parts = [];
  if (error.name) parts.push(error.name);
  if (error.message) parts.push(error.message);
  if (error.cause?.code) parts.push(`cause=${error.cause.code}`);
  if (error.cause?.message) parts.push(`causeMsg=${error.cause.message}`);
  if (parts.length === 0) return String(error);
  return parts.join(" | ");
}

function sourceKey(filePath) {
  const normalized = filePath.split(path.sep).join("/");
  const idx = normalized.indexOf("src/content/");
  if (idx === -1) {
    throw new Error(`Unexpected source path: ${filePath}`);
  }
  return normalized.slice(idx + "src/content/".length);
}

function publicIdFromKey(key, postsFolder, portfolioFolder) {
  const extension = path.extname(key);
  const keyWithoutExtension = key.slice(0, -extension.length);

  if (key.startsWith("posts/")) {
    const relativePath = keyWithoutExtension.slice("posts/".length);
    return `${postsFolder}/${relativePath}`;
  }
  if (key.startsWith("portfolio/")) {
    const relativePath = keyWithoutExtension.slice("portfolio/".length);
    return `${portfolioFolder}/${relativePath}`;
  }
  throw new Error(`Unsupported key prefix: ${key}`);
}

async function fetchJsonWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    const text = await response.text();
    let body = null;
    try {
      body = text ? JSON.parse(text) : null;
    } catch {
      body = { raw: text };
    }
    return { response, body };
  } finally {
    clearTimeout(timeoutId);
  }
}

async function uploadSmallAsset({
  uploadBuffer,
  uploadFileName,
  publicId,
  cloudName,
  apiKey,
  apiSecret,
  requestTimeoutMs,
}) {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = cloudinarySignature(
    {
      public_id: publicId,
      timestamp,
    },
    apiSecret,
  );

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const form = new FormData();
  form.append("file", new Blob([uploadBuffer]), uploadFileName);
  form.append("public_id", publicId);
  form.append("timestamp", String(timestamp));
  form.append("api_key", apiKey);
  form.append("signature", signature);

  const { response, body } = await fetchJsonWithTimeout(
    endpoint,
    {
      method: "POST",
      body: form,
    },
    requestTimeoutMs,
  );
  if (!response.ok) {
    throw new Error(
      `Cloudinary upload failed (${response.status}): ${body?.error?.message || "Unknown error"}`,
    );
  }
  return body;
}

async function uploadChunkedAsset({
  uploadBuffer,
  uploadFileName,
  publicId,
  cloudName,
  apiKey,
  apiSecret,
  chunkSizeBytes,
  requestTimeoutMs,
}) {
  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const totalBytes = uploadBuffer.length;
  const uploadId = randomUUID();
  let lastBody = null;

  for (let start = 0; start < totalBytes; start += chunkSizeBytes) {
    const endExclusive = Math.min(start + chunkSizeBytes, totalBytes);
    const chunk = uploadBuffer.subarray(start, endExclusive);
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = cloudinarySignature(
      {
        public_id: publicId,
        timestamp,
      },
      apiSecret,
    );

    const form = new FormData();
    form.append("file", new Blob([chunk]), uploadFileName);
    form.append("public_id", publicId);
    form.append("timestamp", String(timestamp));
    form.append("api_key", apiKey);
    form.append("signature", signature);

    const { response, body } = await fetchJsonWithTimeout(
      endpoint,
      {
        method: "POST",
        headers: {
          "X-Unique-Upload-Id": uploadId,
          "Content-Range": `bytes ${start}-${endExclusive - 1}/${totalBytes}`,
        },
        body: form,
      },
      requestTimeoutMs,
    );

    if (!response.ok) {
      throw new Error(
        `Cloudinary chunk upload failed (${response.status}) at bytes ${start}-${endExclusive - 1}: ${body?.error?.message || body?.raw || "Unknown error"}`,
      );
    }
    lastBody = body;
  }

  return lastBody;
}

async function uploadAssetWithRetry({
  uploadBuffer,
  uploadFileName,
  publicId,
  cloudName,
  apiKey,
  apiSecret,
  requestTimeoutMs,
  maxRetries,
  retryBaseMs,
  largeFileThresholdBytes,
  chunkSizeBytes,
}) {
  let attempt = 0;
  let lastError = null;
  const sizeBytes = uploadBuffer.length;
  const useChunked = sizeBytes >= largeFileThresholdBytes;

  while (attempt <= maxRetries) {
    try {
      if (useChunked) {
        return await uploadChunkedAsset({
          uploadBuffer,
          uploadFileName,
          publicId,
          cloudName,
          apiKey,
          apiSecret,
          chunkSizeBytes,
          requestTimeoutMs,
        });
      }
      return await uploadSmallAsset({
        uploadBuffer,
        uploadFileName,
        publicId,
        cloudName,
        apiKey,
        apiSecret,
        requestTimeoutMs,
      });
    } catch (error) {
      lastError = error;
      if (attempt >= maxRetries) break;
      const backoff = retryBaseMs * 2 ** attempt;
      const jitter = Math.floor(Math.random() * 300);
      await sleep(backoff + jitter);
      attempt += 1;
    }
  }

  throw new Error(
    `Upload failed after ${maxRetries + 1} attempt(s): ${formatError(lastError)}`,
  );
}

function makeEncoder(image, format, quality) {
  if (format === "avif") return image.avif({ quality, effort: 4 });
  if (format === "webp") return image.webp({ quality });
  if (format === "png") return image.png({ compressionLevel: 9, palette: true });
  return image.jpeg({ quality, mozjpeg: true });
}

async function prepareUploadPayload(filePath, maxUploadFileBytes) {
  const originalBuffer = await fs.readFile(filePath);
  if (originalBuffer.length <= maxUploadFileBytes) {
    return {
      uploadBuffer: originalBuffer,
      uploadFileName: path.basename(filePath),
      transformed: false,
    };
  }

  const ext = path.extname(filePath).toLowerCase();
  const requestedFormat = ext === ".avif" ? "avif" : ext === ".webp" ? "webp" : ext === ".png" ? "png" : "jpeg";
  const metadata = await sharp(originalBuffer).metadata();
  const originalWidth = metadata.width || null;
  const steps = [
    { scale: 1, quality: 82 },
    { scale: 0.92, quality: 78 },
    { scale: 0.85, quality: 74 },
    { scale: 0.78, quality: 70 },
    { scale: 0.72, quality: 66 },
    { scale: 0.66, quality: 62 },
    { scale: 0.6, quality: 58 },
    { scale: 0.54, quality: 54 },
  ];

  for (const step of steps) {
    const width = originalWidth ? Math.max(600, Math.floor(originalWidth * step.scale)) : undefined;
    let pipeline = sharp(originalBuffer);
    if (width) {
      pipeline = pipeline.resize({
        width,
        withoutEnlargement: true,
        fit: "inside",
      });
    }
    const outputBuffer = await makeEncoder(pipeline, requestedFormat, step.quality).toBuffer();
    if (outputBuffer.length <= maxUploadFileBytes) {
      return {
        uploadBuffer: outputBuffer,
        uploadFileName: path.basename(filePath),
        transformed: true,
      };
    }
  }

  throw new Error(
    `File exceeds ${maxUploadFileBytes} bytes and could not be reduced enough for upload`,
  );
}

async function readMapping() {
  try {
    const raw = await fs.readFile(MAPPING_PATH, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw error;
  }
}

async function writeJson(filePath, value) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(value, null, 2) + "\n", "utf8");
}

async function readReportFailures() {
  try {
    const raw = await fs.readFile(REPORT_PATH, "utf8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.failures)) return [];
    return parsed.failures
      .map((entry) => entry?.key)
      .filter((key) => typeof key === "string" && key.length > 0);
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function main() {
  const cloudName = getEnv("CLOUDINARY_CLOUD_NAME");
  const apiKey = getEnv("CLOUDINARY_API_KEY");
  const apiSecret = getEnv("CLOUDINARY_API_SECRET");
  const postsFolder = process.env.CLOUDINARY_POSTS_FOLDER || DEFAULT_POSTS_FOLDER;
  const portfolioFolder =
    process.env.CLOUDINARY_PORTFOLIO_FOLDER || DEFAULT_PORTFOLIO_FOLDER;
  const forceUpload = process.argv.includes("--force");
  const onlyFailures = process.argv.includes("--only-failures");
  const maxRetries =
    getArgNumber("--max-retries", Number.parseInt(process.env.CLOUDINARY_MAX_RETRIES || "", 10)) ||
    DEFAULT_MAX_RETRIES;
  const retryBaseMs =
    getArgNumber("--retry-base-ms", Number.parseInt(process.env.CLOUDINARY_RETRY_BASE_MS || "", 10)) ||
    DEFAULT_RETRY_BASE_MS;
  const requestTimeoutMs =
    getArgNumber("--request-timeout-ms", Number.parseInt(process.env.CLOUDINARY_REQUEST_TIMEOUT_MS || "", 10)) ||
    DEFAULT_REQUEST_TIMEOUT_MS;
  const largeFileThresholdBytes =
    getArgNumber(
      "--large-file-threshold-bytes",
      Number.parseInt(process.env.CLOUDINARY_LARGE_FILE_THRESHOLD_BYTES || "", 10),
    ) || DEFAULT_LARGE_FILE_THRESHOLD_BYTES;
  const chunkSizeBytes =
    getArgNumber("--chunk-size-bytes", Number.parseInt(process.env.CLOUDINARY_CHUNK_SIZE_BYTES || "", 10)) ||
    DEFAULT_CHUNK_SIZE_BYTES;
  const maxUploadFileBytes =
    getArgNumber("--max-upload-file-bytes", Number.parseInt(process.env.CLOUDINARY_MAX_UPLOAD_FILE_BYTES || "", 10)) ||
    DEFAULT_MAX_UPLOAD_FILE_BYTES;

  const existing = await readMapping();
  let files = [
    ...(await collectFiles(POSTS_DIR)),
    ...(await collectFiles(PORTFOLIO_DIR)),
  ];

  if (onlyFailures) {
    const failedKeys = new Set(await readReportFailures());
    files = files.filter((filePath) => failedKeys.has(sourceKey(filePath)));
  }
  const total = files.length;

  const report = {
    scanned: files.length,
    uploaded: 0,
    skipped: 0,
    failed: 0,
    failures: [],
  };

  // eslint-disable-next-line no-console
  console.log(
    onlyFailures
      ? `Retrying failed uploads only: ${total} file(s)`
      : `Starting Cloudinary upload scan: ${total} file(s)`,
  );

  for (let index = 0; index < files.length; index += 1) {
    const filePath = files[index];
    const step = `${index + 1}/${total}`;
    const key = sourceKey(filePath);
    const checksum = await sha1File(filePath);
    const sizeBytes = (await fs.stat(filePath)).size;
    const publicId = publicIdFromKey(key, postsFolder, portfolioFolder);

    if (
      !forceUpload &&
      existing[key] &&
      existing[key].sha1 === checksum &&
      existing[key].bytes === sizeBytes &&
      existing[key].publicId === publicId
    ) {
      report.skipped += 1;
      // eslint-disable-next-line no-console
      console.log(`[${step}] skipped  ${key}`);
      continue;
    }

    try {
      const payload = await prepareUploadPayload(filePath, maxUploadFileBytes);
      const uploaded = await uploadAssetWithRetry({
        uploadBuffer: payload.uploadBuffer,
        uploadFileName: payload.uploadFileName,
        publicId,
        cloudName,
        apiKey,
        apiSecret,
        requestTimeoutMs,
        maxRetries,
        retryBaseMs,
        largeFileThresholdBytes,
        chunkSizeBytes,
      });

      existing[key] = {
        publicId,
        bytes: sizeBytes,
        sha1: checksum,
        format: uploaded.format,
        width: uploaded.width,
        height: uploaded.height,
        secureUrl: uploaded.secure_url,
        updatedAt: new Date().toISOString(),
      };
      report.uploaded += 1;
      // eslint-disable-next-line no-console
      console.log(
        payload.transformed
          ? `[${step}] uploaded ${key} (auto-resized for upload limit)`
          : `[${step}] uploaded ${key}`,
      );
    } catch (error) {
      report.failed += 1;
      report.failures.push({
        key,
        filePath,
        error: formatError(error),
      });
      // eslint-disable-next-line no-console
      console.log(`[${step}] failed   ${key}`);
    }
  }

  await writeJson(MAPPING_PATH, existing);
  await writeJson(REPORT_PATH, report);

  // eslint-disable-next-line no-console
  console.log(
    `Cloudinary upload complete. scanned=${report.scanned} uploaded=${report.uploaded} skipped=${report.skipped} failed=${report.failed}`,
  );
  // eslint-disable-next-line no-console
  console.log(`Mapping: ${MAPPING_PATH}`);
  // eslint-disable-next-line no-console
  console.log(`Report: ${REPORT_PATH}`);

  if (report.failed > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
