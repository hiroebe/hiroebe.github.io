import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

let fontData: ArrayBuffer | null = null;

async function loadFont(): Promise<ArrayBuffer> {
	if (fontData) return fontData;

	const css = await fetch(
		'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700',
		{
			headers: {
				'User-Agent':
					'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
			},
		},
	).then((res) => res.text());

	const match = css.match(/src:\s*url\(([^)]+)\)/);
	if (!match?.[1]) {
		throw new Error('Failed to extract font URL from Google Fonts CSS');
	}

	fontData = await fetch(match[1]).then((res) => res.arrayBuffer());
	return fontData!;
}

function loadAvatar(): string {
	const avatarPath = path.join(process.cwd(), 'public', 'avatar.png');
	const data = fs.readFileSync(avatarPath);
	return `data:image/png;base64,${data.toString('base64')}`;
}

export async function generateOgImage(title: string): Promise<Buffer> {
	const font = await loadFont();
	const avatarSrc = loadAvatar();

	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					backgroundColor: '#ffffff',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '48px',
					border: '48px solid #2337ff',
					fontFamily: 'Noto Sans JP',
				},
				children: [
					{
						type: 'div',
						props: {
							style: {
								padding: '120px 48px',
								fontSize: '60px',
								fontWeight: 700,
								color: '#1c1917',
								lineHeight: 1.4,
							},
							children: title,
						},
					},
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								alignItems: 'center',
								gap: '16px',
							},
							children: [
								{
									type: 'img',
									props: {
										src: avatarSrc,
										width: 64,
										height: 64,
										style: {
											borderRadius: '50%',
										},
									},
								},
								{
									type: 'div',
									props: {
										style: {
											fontSize: '32px',
											color: '#1c1917',
											fontWeight: 700,
										},
										children: 'hiroebe.net',
									},
								},
							],
						},
					},
				],
			},
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: 'Noto Sans JP',
					data: font,
					weight: 700,
					style: 'normal',
				},
			],
		},
	);

	return await sharp(Buffer.from(svg)).png().toBuffer();
}
