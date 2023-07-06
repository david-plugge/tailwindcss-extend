import sade from 'sade';
import chokidar from 'chokidar';
import { bundle } from './bundle.js';

sade(PKG_NAME, true)
	.version(PKG_VERSION)
	.option('--pattern, -p', 'pattern to match files')
	.option('--type, -t', 'output type, "module" or "commonjs"', 'commonjs')
	.option('--output, -o', 'output path', 'tailwindcss-extend.cjs')
	.option('--watch, -w', 'watch for changes', false)
	.action(async ({ pattern, type, output, watch }) => {
		if (!pattern) {
			error('No pattern provided.');
		}
		if (!['module', 'commonjs'].includes(type)) {
			error('Invalid type specified.');
		}
		if (!output) {
			error('No output provided.');
		}

		if (watch) {
			const watcher = chokidar.watch(pattern);

			watcher.on('all', () => {
				bundle(pattern, type, output);
			});

			await bundle(pattern, type, output);
		} else {
			await bundle(pattern, type, output);
		}
	})
	.parse(process.argv);

function error(str: string): never {
	console.error(`${str}`);
	console.error(`Type ${PKG_NAME} --help.`);
	process.exit(1);
}
