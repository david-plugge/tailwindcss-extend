import type { Plugin } from 'vite';
import { Minimatch } from 'minimatch';
import { ModuleType, bundle } from './bundle.js';

interface TailwindExtendConfig {
	pattern: string;
	output?: string;
	type?: ModuleType;
}

export default function vitePluginTailwindcssExtend({
	pattern,
	output = 'tailwindcss-extend.cjs',
	type = 'commonjs'
}: TailwindExtendConfig): Plugin {
	const mm = new Minimatch(pattern);

	const runBundle = () =>
		bundle(pattern, type, output).catch((err) => {
			console.error(err);
		});

	return {
		name: 'vite-plugin-tailwindcss-extend',
		configureServer(vite) {
			vite.watcher.on('all', (event, path) => {
				if (mm.match(path)) {
					runBundle();
				}
			});
		},
		async buildStart() {
			await runBundle();
		}
	};
}
