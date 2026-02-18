# Generate Post Script

This script converts JPG images to AVIF format and generates a starter MDX file for a new blog post.

## Usage

1. Create a new folder in `src/content/posts/` with the format: `YYYY-MM-DD-post-slug`
   ```bash
   mkdir src/content/posts/2026-02-15-monte-example
   ```

2. Copy all your JPG images into this folder

3. Run the script (two options):

   **Option A: From the project root**
   ```bash
   npm run generate-post src/content/posts/2026-02-15-monte-example
   ```

   **Option B: Navigate to the folder first**
   ```bash
   cd src/content/posts/2026-02-15-monte-example
   npm run generate-post
   ```

## What the script does

1. **Converts all JPG images to AVIF** format with high quality (85)
2. **Names images automatically**: All images → `gallery-0.avif`, `gallery-1.avif`, etc.
3. **Randomly selects cover image**: Picks one random gallery image to use as the post cover
4. **Randomly selects inline image**: Picks one random gallery image to use in the content
5. **Deletes original JPG files** after successful conversion
6. **Generates MDX file** with:
   - Complete frontmatter (title, description, date, category, tags)
   - Cover image with dimensions
   - Gallery array with all images and dimensions
   - Placeholder for GPX tracks, location, and altitude data
   - PostImage component import
   - Sample content structure with 4 sections
   - One inline image inserted in the second section

## After running the script

You need to manually update:

- ✏️ **Title and description**
- 📂 **Category** (Escursionismo, Alpinismo, Trail, Scialpinismo, Trekking, Viaggi)
- 🏷️ **Tags**
- 🗺️ **Slug** - Update the path and date if needed
- 🖼️ **Image alt texts** - Replace placeholder text with actual descriptions
- 📍 **Location and GPX data** - Uncomment and fill if applicable
- 📝 **Content** - Replace sample text with your actual post content

## Example

```bash
cd src/content/posts/2026-02-15-monte-bianco
# (folder contains: IMG_001.jpg, IMG_002.jpg, IMG_003.jpg, ...)
npm run generate-post
```

This will create:
- `gallery-0.avif`, `gallery-1.avif`, `gallery-2.avif`, ... (from all JPG files)
- `2026-02-15-monte-bianco.mdx` (starter MDX file with random cover and inline image references)

And delete all original JPG files.

All images are added to the gallery array, and one random image is selected as the cover.

## Notes

- The script automatically deletes original JPG files after successful conversion
- Images are sorted alphabetically, so name your JPGs accordingly if order matters
- AVIF quality is set to 85 with effort 6 (good balance of quality/size)
- One random gallery image is selected for inline use in the content (no duplicate files created)
