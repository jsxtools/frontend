const { color, fs, gzipSize, relative, resolve, root, size } = require('./cmd/util');
const babel = require('rollup-plugin-babel');
const babelConfig = require('./babel.config');
const { terser } = require('rollup-plugin-terser');

module.exports = {
	input: 'src/index.ts',
	output: [
		{ file: 'index.js', format: 'cjs', strict: false },
		{ file: 'index.mjs', format: 'esm', strict: false },
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
		reportCodeGolf(),
		writeCodeGolfToReadme()
	]
};

function reportCodeGolf() {
	return {
		name: 'code-golf',
		writeBundle(bundle) {
			Object.keys(bundle).forEach(filename => {
				const file = bundle[filename];
				const filepath = resolve(process.cwd(), filename);

				if (file) {
					file.size = size(file.code);
					file.gzipSize = gzipSize(file.code);

					console.log(
						`${color('green')('Created')} ${relative(root, filepath)} ${color('dim')(`(${file.size} bytes, ${file.gzipSize} gzipped)`)}`
					);
				}
			});
		}
	};
}

function writeCodeGolfToReadme() {
	return {
		name: 'write-code-golf-to-readme',
		writeBundle(bundle) {
			const indexJs = bundle['index.js'];

			if (indexJs) {
				const readmeMd = fs.readFileSync('README.md', 'utf8');
				const readmeMdUpdated = readmeMd.replace(/<strong size>[\W\w]*<\/strong>/g, `<strong size>${indexJs.size} bytes (${indexJs.gzipSize} gzipped)</strong>`);

				fs.writeFileSync('README.md', readmeMdUpdated);
			}
		}
	};
}
