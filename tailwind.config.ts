import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			keyframes: {
				fadeIn: {
					'0%': {
						opacity: '0',
						transform: 'translateY(-2px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
				fadeOut: {
					'0%': {
						opacity: '1',
						transform: 'translateY(-2px)',
					},
					'100%': {
						opacity: '0',
						transform: 'translateY(0)',
					},
				},
			},
			animation: {
				fadeIn: 'fadeIn 0.2s ease-in-out',
				fadeOut: 'fadeOut 0.2s ease-in-out',
			},

			colors: {
				white: '#EDE8FF',

				gray100: '#F2F2F2',
				gray200: '#92959E',
				gray300: '#BCBCBC',
				gray400: '#333333',
				gray500: '#262626',
				gray600: '#282828',

				blue100: '#CFD7D8',
				blue500: '#4EA8DE',
				blue700: '#1E6F9F',

				green400: '#53ba83',

				danger: '#E25858',
			},
		},
	},
	plugins: [],
};
export default config;
