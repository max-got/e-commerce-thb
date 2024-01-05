import theme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				display: ['Inter Variable', ...theme.fontFamily.sans],
				body: ['IBM Plex Mono', ...theme.fontFamily.mono]
			},
			screens: {
				xs: '475px'
			},
			colors: {
				primary: {
					DEFAULT: '#CC1132',
					50: '#FDE3E8',
					100: '#FBCBD4',
					200: '#F693A5',
					300: '#F25F7A',
					400: '#ED2B4F',
					500: '#CC1132',
					600: '#A50E29',
					700: '#7A0A1F',
					800: '#500714',
					900: '#2A040B',
					950: '#130205'
				},
				secondary: {
					DEFAULT: '#DE8DC4',
					50: '#FCF3F9',
					100: '#F8E7F3',
					200: '#F1D0E7',
					300: '#ECBCDC',
					400: '#E5A4D0',
					500: '#DE8DC4',
					600: '#CE55A8',
					700: '#AA3184',
					800: '#6F2056',
					900: '#37102B',
					950: '#1C0815'
				},
				accent: {
					DEFAULT: '#130F0E',
					50: '#ECE6E5',
					100: '#D6CAC7',
					200: '#AF9892',
					300: '#81665F',
					400: '#493A36',
					500: '#130F0E',
					600: '#0F0C0B',
					700: '#0C0909',
					800: '#090706',
					900: '#030202',
					950: '#030202'
				}
			},
			maxWidth: {
				layout: '1366px'
			},
			animation: {
				'background-shine': 'background-shine 2s linear infinite'
			},
			keyframes: {
				'background-shine': {
					from: {
						backgroundPosition: '0 0'
					},
					to: {
						backgroundPosition: '-200% 0'
					}
				}
			}
		},
		corePlugins: {
			aspectRatio: false
		}
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
		require('tailwindcss-elevation'),
		require('@tailwindcss/typography')
	]
};
