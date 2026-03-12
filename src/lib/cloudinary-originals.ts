import originals from "../data/cloudinary-originals.json";

type CloudinaryEntry = {
  secureUrl?: string;
  publicId?: string;
};

type CloudinaryMap = Record<string, CloudinaryEntry>;

const mapping = originals as CloudinaryMap;
const mappingKeys = Object.keys(mapping);

export function getCloudinaryOriginalUrl(key: string): string | null {
  const entry = mapping[key];
  if (!entry || !entry.secureUrl) return null;
  return entry.secureUrl;
}

export function getCloudinaryDownloadUrl(key: string): string | null {
  const original = getCloudinaryOriginalUrl(key);
  if (!original) return null;
  return toJpgDownloadUrl(original);
}

export function getCloudinaryPortfolioOriginalUrl(portfolioId: string): string | null {
  const key = findPortfolioKey(portfolioId);
  if (!key) return null;
  return getCloudinaryDownloadUrl(key);
}

export function getCloudinaryPortfolioViewUrl(portfolioId: string): string | null {
  const key = findPortfolioKey(portfolioId);
  if (!key) return null;
  return getCloudinaryOriginalUrl(key);
}

export function getCloudinaryPostGalleryOriginalUrl(
  postId: string,
  galleryIndex: number,
  sourceFormat: string,
): string | null {
  const key = findPostGalleryKey(postId, galleryIndex, sourceFormat);
  if (!key) return null;
  return getCloudinaryDownloadUrl(key);
}

export function getCloudinaryPostGalleryViewUrl(
  postId: string,
  galleryIndex: number,
  sourceFormat: string,
): string | null {
  const key = findPostGalleryKey(postId, galleryIndex, sourceFormat);
  if (!key) return null;
  return getCloudinaryOriginalUrl(key);
}

export function cloudinaryResponsiveImage(
  secureUrl: string,
  widths: number[],
  quality: string = "auto",
): { src: string; srcset: string } {
  const validWidths = [...new Set(widths.filter((width) => width > 0))].sort(
    (a, b) => a - b,
  );
  if (validWidths.length === 0) {
    return {
      src: cloudinaryTransformedUrl(secureUrl, `f_auto,q_${quality}`),
      srcset: "",
    };
  }

  const maxWidth = validWidths[validWidths.length - 1];
  const src = cloudinaryTransformedUrl(
    secureUrl,
    `f_auto,q_${quality},w_${maxWidth}`,
  );
  const srcset = validWidths
    .map(
      (width) =>
        `${cloudinaryTransformedUrl(
          secureUrl,
          `f_auto,q_${quality},w_${width}`,
        )} ${width}w`,
    )
    .join(", ");

  return { src, srcset };
}

function extractGalleryNumber(key: string): number {
  const fileName = key.split("/").pop() || "";
  const match = fileName.match(/^gallery-(\d+)\./);
  if (!match) return Number.MAX_SAFE_INTEGER;
  return Number.parseInt(match[1], 10);
}

function toJpgDownloadUrl(secureUrl: string): string {
  return cloudinaryTransformedUrl(secureUrl, "f_jpg,fl_attachment");
}

function cloudinaryTransformedUrl(secureUrl: string, transformation: string): string {
  const marker = "/image/upload/";
  const idx = secureUrl.indexOf(marker);
  if (idx === -1) return secureUrl;
  const head = secureUrl.slice(0, idx + marker.length);
  const tail = secureUrl.slice(idx + marker.length);
  return `${head}${transformation}/${tail}`;
}

function findPortfolioKey(portfolioId: string): string | null {
  const prefix = `portfolio/${portfolioId}/photo.`;
  const key = mappingKeys.find((candidate) => candidate.startsWith(prefix));
  return key || null;
}

function findPostGalleryKey(
  postId: string,
  galleryIndex: number,
  sourceFormat: string,
): string | null {
  const folderPrefix = `posts/${postId}/`;
  const exactKey = `${folderPrefix}gallery-${galleryIndex}.${sourceFormat.toLowerCase()}`;
  if (mapping[exactKey]) return exactKey;

  const folderGalleryKeys = mappingKeys
    .filter((candidate) => candidate.startsWith(folderPrefix))
    .filter((candidate) => /^gallery-\d+\./.test(candidate.split("/").pop() || ""))
    .sort((a, b) => extractGalleryNumber(a) - extractGalleryNumber(b));

  return folderGalleryKeys[galleryIndex] || null;
}
