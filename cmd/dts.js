const { default: rollupPluginDts } = require('rollup-plugin-dts');
const { fs, glob, gzipSize, paths, relative, root, resolve } = require('./util');
const { rollup } = require('rollup');
const tsc = require('typescript');
const tsconfigPath = resolve(root, 'tsconfig.json');
const tsconfig = require(tsconfigPath);

const parseConfigHost = {
	fileExists: fs.existsSync,
	readDirectory: tsc.sys.readDirectory,
	readFile: file => fs.readFileSync(file, 'utf8'),
	useCaseSensitiveFileNames: true,
};

const parsed = tsc.parseJsonConfigFileContent(
	{
		...tsconfig,
		declarations: true,
		noEmitJs: true,
	},
	parseConfigHost,
	root,
	{
		outDir: '..',
	}
);

glob(
	...(paths.length ? paths : ['packages/*/*/src/index.ts'])
).forEach(tsFile => {
	const tsDir = resolve(tsFile, '..');
	const program = tsc.createProgram([ tsFile ], parsed.options);

	program.emit(undefined, async (dtsFile, tsCode) => {
		dtsFile = resolve(tsDir, dtsFile);
		const includeCode = parsed.raw.includes.map(
			include => fs.readFileSync(resolve(root, include), 'utf8')
		).join('\n');

		fs.writeFileSync(dtsFile, includeCode + tsCode);

		const bundle = await rollup({
			input: dtsFile,
			plugins: [
				rollupPluginDts()
			]
		});

		const generated = await bundle.generate({ format: 'cjs' });
		const { output: [ { code } ] } = generated;

		fs.writeFileSync(dtsFile, code);

		console.log(`Created ${relative(root, dtsFile)} (${gzipSize(code)} bytes)`);
	}, undefined, true);
});
