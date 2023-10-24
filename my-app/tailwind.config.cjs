const config = {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

	plugins: [require('flowbite/plugin')],

	darkMode: 'class',

	theme: {
		extend: {
			colors: {
				// flowbite-svelte
				primary: {
					50: '#FFF5F2',
					100: '##ff5722',
					200: '#FFE4DE',
					300: '#FFD5CC',
					400: '#FFBCAD',
					500: '#FE795D',
					600: '#EF562F',
					700: '#ff5722',
					800: '#CC4522',
					900: '#A5371B'
				},
				secondary: {
					50: '#BBBBBB',
					100: '#A0A0A0',
					200: '#858585',
					300: '#696969',
					400: '#4E4E4E',
					500: '#333333',
					600: '#2D2D2D',
					700: '#262626',
					800: '#202020',
					900: '#1A1A1A'
				}
			}
		}
	}
};

module.exports = config;