const { bin, glob, opts, paths, root, spawn } = require('./util');

const exitCode = spawn(
	bin('jest'),
	[
		...opts.toArray({
			'--ci': [],
			'--colors': [],
			'--coverage': [],
			'--passWithNoTests': [],
			...(opts.hasOwnProperty('--watchAll') ? {} : { '--onlyChanged': [] }),
		}),
		...glob(
			...(paths.length ? paths : ['packages/*/*/src'])
		)
	],
	{
		cwd: root,
		detached: true,
		env: {
			...process.env,
			// disables jest usage prompt
			TERM: 'dumb'
		},
	}
).status;

process.exit(exitCode);
