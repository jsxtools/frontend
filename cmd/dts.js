const tsc = require('typescript');
const {
	color,
	glob,
	gzipSize,
	paths,
	relative,
	resolve,
	root,
	size
} = require('./util');

const tsconfig = require(resolve(root, 'tsconfig.json'));
const dtsCodeHash = Object.create(null);
const prefixCode = Array.from(tsconfig.includes)
	.map(include => tsc.sys.readFile(resolve(root, include), 'utf8'))
	.join('\n');

const host = Object.assign(
	tsc.createCompilerHost({
		allowJs: true,
		declaration: true,
		emitDeclarationOnly: true
	}),
	{
		getSourceFile(fileName, languageVersion) {
			const sourceCode =
				(fileName in fileNameHash ? prefixCode : '') +
				tsc.sys.readFile(fileName);

			return sourceCode === undefined
				? undefined
				: tsc.createSourceFile(fileName, sourceCode, languageVersion);
		},
		writeFile(fileName, contents) {
			return (dtsCodeHash[dtsNameHash[fileName] || fileName] = contents.replace(
				/^declare\s/gm,
				'export $&'
			));
		}
	}
);

const fileNames = glob(
	...(paths.length ? paths : ['packages/*/*/src/index.ts']).map(path =>
		path.replace(/\/?(\.ts)?$/, ($0, $1) => ($1 ? $0 : '/**/index.ts'))
	)
);

const fileNameHash = fileNames.reduce(
	(hash, name) => Object.assign(hash, { [name]: true }),
	{}
);

const dtsNameHash = fileNames.reduce(
	(hash, name) =>
		Object.assign(hash, { [name.replace(/[^.]+$/, 'd.ts')]: name }),
	{}
);

const program = tsc.createProgram(
	fileNames,
	{
		allowJs: true,
		declaration: true,
		emitDeclarationOnly: true
	},
	host
);

program.emit();

fileNames.forEach(fileName => {
	const dtsFileName = resolve(fileName, '../..', 'index.d.ts');
	const dtsContents = dtsCodeHash[fileName];

	tsc.sys.writeFile(dtsFileName, dtsContents);

	console.log(
		`${color('green')('Created')} ${relative(root, dtsFileName)} ${color('dim')(
			`(${size(dtsContents)} bytes, ${gzipSize(dtsContents)} gzipped)`
		)}`
	);
});
