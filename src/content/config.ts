import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.array(z.string()),
    tags: z.array(z.string()).optional(),
    cover: z.object({
      src: image(),
      alt: z.string(),
    }),
    gallery: z.array(z.object({
      src: image(),
      alt: z.string(),
    })).optional(),
    gpxTracks: z.array(z.object({
      src: z.string(),
      fileName: z.string(),
    })).optional(),
    location: z.object({
      lat: z.number(),
      lon: z.number(),
    }).optional(),
    elevationGain: z.number().optional(),
    distance: z.number().optional(),
    minimumAltitude: z.number().optional(),
    maximumAltitude: z.number().optional(),
  }),
});

const portfolioCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    date: z.coerce.date(),
    title: z.string(),
    photo: z.object({
      src: image(),
      alt: z.string(),
    }),
  }),
});

export const collections = {
  'posts': postsCollection,
  'portfolio': portfolioCollection,
};
