const { bin, glob, opts, paths, resolve, root, spawn, watch } = require('./util');

if (opts.hasOwnProperty('--watch')) {
	const watcher = watch();

	glob(
		...(paths.length ? paths : ['packages/*/*/src/*.ts'])
	).forEach(file => {
		watcher.add(file);
	});

	watcher.on('all', (event, file) => {
		if (event === 'add' || event === 'change') {
			spawn(
				bin('eslint'),
				[
					...opts.toArray({
						'--cache': [],
						'--ignore-path': [resolve(root, '.gitignore')],
						'--resolve-plugins-relative-to': [resolve(root, 'node_modules')],
					}, arg => arg !== '--watch'),
					file,
				]
			)
		}
	});
} else {
	const exitCode = spawn(
		bin('eslint'),
		[
			...opts.toArray({
				'--cache': [],
				'--ignore-path': [resolve(root, '.gitignore')],
				'--resolve-plugins-relative-to': [resolve(root, 'node_modules')],
			}),
			...glob(
				...(paths.length ? paths : ['packages/*/*/src/*.ts'])
			),
		]
	).status;

	process.exit(exitCode);
}
