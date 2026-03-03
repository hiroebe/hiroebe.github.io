// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import astroD2 from 'astro-d2';
import { defineConfig } from 'astro/config';
import remarkLinkCardPlus from 'remark-link-card-plus';

import tailwindcss from '@tailwindcss/vite';

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
		remarkPlugins: [
			// Some sites (e.g. engineering.mercari.com) block OGP extraction on CI.
			// For those links, inline the card HTML in the markdown and cache the favicon locally.
			[remarkLinkCardPlus, { cache: true }],
		],
		syntaxHighlight: {
			type: 'shiki',
			excludeLangs: ['d2'],
		},
	},

	vite: {
		plugins: [tailwindcss()],
	},
});
