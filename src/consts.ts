// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'hiroebe.net';
export const SITE_DESCRIPTION = 'hiroebe のブログ';

export const TAGS = {
	tech: 'tech',
	random: 'random',
	albirex: 'アルビレックス新潟',
	bonsaisns: 'Bonsai SNS',
} as const;

export type Tag = keyof typeof TAGS;
