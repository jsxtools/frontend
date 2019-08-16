const babel = require('rollup-plugin-babel');
const babelConfig = require('./babel.config');
const { terser } = require('rollup-plugin-terser');

module.exports = {
	input: 'src/index.ts',
	output: [
		{ file: 'index.js', format: 'cjs', strict: false },
		{ file: 'index.mjs', format: 'esm', strict: false }
	],
	plugins: [
		babel({
			...babelConfig,
			extensions: [
				'.js',
				'.jsx',
				'.ts',
				'.tsx'
			]
		}),
		terser(),
	]
};
