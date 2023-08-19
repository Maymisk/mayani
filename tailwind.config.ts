import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				gray100: '#F2F2F2',
				gray300: '#BCBCBC',
				gray400: '#333333',
				gray500: '#262626',

				blue100: '#CFD7D8',
				blue500: '#4EA8DE',
				blue700: '#1E6F9F',

				danger: '#E25858',
			},
		},
	},
	plugins: [],
};
export default config;
