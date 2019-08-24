const { glob: miniglobGlob } = require('miniglob');
const { spawnSync } = require('child_process');
const { watch: chokidarWatch } = require('chokidar');
const fs = require('fs');
const { sync: gzipSizeSync } = require('gzip-size');
const path = require('path');

const isString = value => typeof value === 'string';
const root = path.resolve(__dirname, '..');

const { opts, paths } = process.argv.slice(2).reduce(
	(argo, arg) => {
		if (/^-{1,2}/.test(arg)) {
			argo.opts[argo.prop = arg] = [];
		} else if (argo.prop) {
			argo.opts[argo.prop].push(arg);
		} else {
			argo.paths.push(arg);
		}

		return argo;
	},
	{
		opts: Object.create({
			toArray (more, filter) {
				return Object.keys(this).reduce(
					(arr, prop) => arr.concat(prop, this[prop]),
					more ? Object.keys(more).reduce(
						(arr, prop) => arr.concat(prop, more[prop]),
						[]
					) : []
				).filter(filter || (() => true));
			}
		}),
		paths: [],
	}
);

const args = argo => Object.keys(argo).reduce(
	(args, prop) => args.concat(
		prop === '_' ? '' : prop,
		argo[prop]
	),
	[]
);

const bin = which => path.resolve(root, 'node_modules', '.bin', which);
const glob = (...paths) => paths.reduce((all, path) => all.concat(miniglobGlob(path)), []);
const join = (...paths) => path.join(...paths.filter(isString));
const readFile = fs.readFileSync;
const relative = (...paths) => path.relative(...paths.filter(isString));
const resolve = (...paths) => path.resolve(...paths.filter(isString));
const spawn = (cmd, args, opts) => spawnSync(cmd, args, Object.assign({ stdio: [ 'inherit', 'inherit', 'inherit' ] }, opts));
const watch = (paths, options) => chokidarWatch(paths, { disableGlobbing: true, ...Object(options), });

exports.args = args;
exports.bin = bin;
exports.fs = fs;
exports.glob = glob;
exports.gzipSize = gzipSizeSync;
exports.join = join;
exports.opts = opts;
exports.paths = paths;
exports.readFile = readFile;
exports.relative = relative;
exports.resolve = resolve;
exports.root = root;
exports.spawn = spawn;
exports.watch = watch;
