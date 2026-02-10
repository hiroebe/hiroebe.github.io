import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { generateOgImage } from '../../lib/og-image';

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await getCollection('blog');
	return posts.map((post) => ({
		params: { slug: post.id },
		props: { title: post.data.title },
	}));
};

export const GET: APIRoute = async ({ props }) => {
	const { title } = props as { title: string };
	const png = await generateOgImage(title);

	return new Response(png, {
		headers: { 'Content-Type': 'image/png' },
	});
};
