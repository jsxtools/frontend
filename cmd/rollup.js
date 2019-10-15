const { bin, glob, isDirectory, opts, paths, resolve, root, spawn } = require('./util');

const exitCode = glob(
	...(paths.length ? paths : ['packages/*/*'])
).filter(
	cwd => /\.(m?js|ts)$/.test(cwd) || isDirectory(cwd)
).every(
	cwd => spawn(
		bin('rollup'),
		opts.toArray({
			'--silent': [],
			'--config': [resolve(root, 'rollup.config.js')]
		}),
		{ cwd }
	).status === 0
) ? 0 : 1;

process.exit(exitCode);
