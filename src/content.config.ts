import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    tagline: z.string(),
    order: z.number(),
    featured: z.boolean(),
    status: z.enum(['production', 'active', 'archived']),
    impact: z.array(z.string()),
    tech: z.array(z.string()),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    heroImage: image().optional(),
    problem: z.string(),
    solution: z.string(),
    architecture: z.string().optional(),
    timeline: z.string().optional(),
  })
});

export const collections = { projects };
