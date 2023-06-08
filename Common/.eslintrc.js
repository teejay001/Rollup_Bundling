const path = require('path');

module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint'
	],
	env: {
		browser: true,
		es2021: true,
		jest: true
	},
	extends: [
		'airbnb-base',
		'airbnb-typescript/base'
	],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
		project: './tsconfig.eslint.json',
		tsconfigRootDir: __dirname,
	},
	ignorePatterns: [".eslintrc.js", "babel.config.js", "jest.config.js", "missingtypes.d.ts"],
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
		'import/no-unused-modules': 'off',
	},
	settings: {
		'import/resolver': {
			alias: {
				map: [
					['@common', path.resolve(__dirname, './src')]
				],
				extensions: ['.ts', '.js']
			}
		}
	}
};
