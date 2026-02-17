// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'hiroebe のブログ';
export const SITE_DESCRIPTION = 'hiroebe のブログです。技術的な話もそうでないものも、好きに書いています。';

export const TAGS = {
	tech: 'tech',
	random: 'random',
	albirex: 'アルビレックス新潟',
	bonsaisns: 'Bonsai SNS',
} as const;

export type Tag = keyof typeof TAGS;
