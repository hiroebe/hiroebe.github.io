// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import astroD2 from 'astro-d2';
import { defineConfig } from 'astro/config';
import remarkLinkCardPlus from 'remark-link-card-plus';

// https://astro.build/config
export default defineConfig({
	site: 'https://hiroebe.net',
	integrations: [
		astroD2({
			layout: 'elk',
			inline: true,
			pad: 30,
			experimental: { useD2js: true },
		}),
		mdx(),
		sitemap(),
	],
	markdown: {
		remarkPlugins: [remarkLinkCardPlus],
		syntaxHighlight: {
			type: 'shiki',
			excludeLangs: ['d2'],
		},
	},
});
