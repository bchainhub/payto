const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				green: {
					'100': '#DBEDD6',
					'200': '#C2E0BA',
					'300': '#A9D49E',
					'400': '#90C781',
					'500': '#77bb65',
					'600': '#5AA147',
					'700': '#447A36',
					'800': '#2E5325',
					'900': '#284820'
				},
				gold: {
					light: '#ddbf5f',
					base: '#d4af37',
					dark: '#aa8c2c'
				}
			}
		}
	},

	plugins: [require('@tailwindcss/forms'), require('tailwindcss-logical')]
};

module.exports = config;
