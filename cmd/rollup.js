const { bin, glob, opts, paths, resolve, root, spawn } = require('./util');

const exitCode = glob(
	...(paths.length ? paths : ['packages/*/*'])
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
