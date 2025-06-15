'use strict';

const process = require( 'process' );

const colors = [
	'primary',
	'primary-10',
	'primary-30',
	'primary-80',
	'primary-100',
	'secondary',
	'secondary-10',
	'secondary-30',
	'secondary-80',
	'secondary-100',
	'tertiary',
	'tertiary-10',
	'tertiary-30',
	'tertiary-80',
	'tertiary-100',
	'text-color',
	'text-medium',
	'light',
	'dark',
	'black',
	'white',
	'gray-100',
	'gray-200',
	'gray-300',
	'gray-400',
	'gray-500',
	'gray-600',
	'gray-700',
	'gray-800',
	'gray-900'
];

module.exports = ( ctx ) => {
	return {
		map: {
			inline: false,
			annotation: true,
			sourcesContent: true,
		},
		plugins: {
			autoprefixer: {
				cascade: false,
				env: 'bs5',
			},
			'postcss-understrap-palette-generator': {
				colors: colors.map( ( x ) => `--${ 'bs-' }${ x }` ),
			},
		},
	};
};
