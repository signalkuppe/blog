const contentImageModules = {
  ...import.meta.glob("/src/content/posts/**/*.{avif,gif,jpeg,jpg,png,webp}", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob(
    "/src/content/portfolio/**/*.{avif,gif,jpeg,jpg,png,webp}",
    {
      eager: true,
      import: "default",
    },
  ),
};

function normalizeRelativePath(path) {
  return path.replace(/^\.\//, "");
}

function isResolvedImage(value) {
  return value && typeof value === "object" && typeof value.src === "string";
}

function entryDirectory(entryId) {
  const parts = entryId.split("/");
  parts.pop();
  return parts.join("/");
}

export function resolveCollectionImage(collection, entryId, relativePath) {
  const key = `/src/content/${collection}/${entryDirectory(entryId)}/${normalizeRelativePath(relativePath)}`;
  const image = contentImageModules[key];

  if (!image) {
    throw new Error(`Unable to resolve content image: ${key}`);
  }

  return image;
}

export function resolvePostData(post) {
  if (isResolvedImage(post.data.cover.src)) {
    return post;
  }

  return {
    ...post,
    data: {
      ...post.data,
      cover: {
        ...post.data.cover,
        src: resolveCollectionImage("posts", post.id, post.data.cover.src),
      },
      gallery: post.data.gallery?.map((photo) => ({
        ...photo,
        src: resolveCollectionImage("posts", post.id, photo.src),
      })),
    },
  };
}

export function resolvePortfolioData(photo) {
  if (isResolvedImage(photo.data.photo.src)) {
    return photo;
  }

  return {
    ...photo,
    data: {
      ...photo.data,
      photo: {
        ...photo.data.photo,
        src: resolveCollectionImage("portfolio", photo.id, photo.data.photo.src),
      },
    },
  };
}
