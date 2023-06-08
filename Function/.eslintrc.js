const path = require('path');
require('dotenv').config({ path: './.env' });

module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint'
	],
	env: {
		browser: true,
		es2021: true,
		jest: true,
		es6: true
	},
	extends: [
		'airbnb-base',
		'airbnb-typescript/base'
	],
	parserOptions: {
		project: './tsconfig.json',
		ecmaVersion: 12,
		sourceType: 'module'
	},
	ignorePatterns: [".eslintrc.js", "babel.config.js", "jest.config.js", "webpack.config.js", "rollup.config.js"],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'comma-dangle': 'off',
		'@typescript-eslint/comma-dangle': [
			'error',
			'never'
		],
		'linebreak-style': 'off',
		indent: 'off',
		'no-tabs': 'off',
		'@typescript-eslint/indent': ['error', 'tab'],
		'no-unused-vars': 'off',
		'import/no-unused-modules': [1, { unusedExports: true }]
	},
	settings: {
		'import/resolver': {
			alias: {
				map: [
					['@common', path.resolve(__dirname, '../Common/src')],
					['@', path.resolve(__dirname, './src')]
				],
				extensions: ['.ts', '.js']
			}
		}
	}
};
