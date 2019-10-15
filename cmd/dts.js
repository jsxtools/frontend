const { createHash } = require('crypto');
const { color, fs, glob, gzipSize, paths, relative, root, resolve, size } = require('./util');
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
	root
);
const includeCode = parsed.raw.includes.map(
	include => fs.readFileSync(resolve(root, include), 'utf8')
).join('\n');

glob(
	...(paths.length ? paths : ['packages/*/*/src/index.ts']).map(
		path => path.replace(/\/?(\.ts)?$/, ($0, $1) => $1 ? $0 : '/**.ts')
	)
).forEach(tsFile => {
	const tsFileContents = includeCode + '\n' + fs.readFileSync(tsFile, 'utf8');
	const hashFile = resolve('/tmp', createHash('sha1').update(tsFileContents).digest('base64').replace(/[^\w]/g, '-') + '.ts');
	fs.writeFileSync(hashFile, tsFileContents);

	const tsDir = resolve(tsFile, '..');
	const program = tsc.createProgram([hashFile], parsed.options);

	program.emit(undefined, (dtsFile, code) => {
		code = code.replace(/^declare\s/gm, 'export $&');

		dtsFile = resolve(tsDir, '../index.d.ts');

		fs.unlinkSync(hashFile);
		fs.writeFileSync(dtsFile, code);

		console.log(
			`${color('green')('Created')} ${relative(root, dtsFile)} ${color('dim')(`(${size(code)} bytes, ${gzipSize(code)} gzipped)`)}`
		);
	}, undefined, true);
});
