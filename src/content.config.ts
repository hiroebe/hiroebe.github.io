import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { TAGS, type Tag } from './consts';

const tagKeys = Object.keys(TAGS) as [Tag, ...Tag[]];

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			tags: z.array(z.enum(tagKeys)).nonempty(),
			order: z.number().optional(),
		}),
});

export const collections = { blog };
