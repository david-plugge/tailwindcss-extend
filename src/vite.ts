import type { Plugin } from 'vite';
import { Minimatch } from 'minimatch';
import { ModuleType, bundle } from './bundle';

interface TailwindExtendConfig {
	pattern: string;
	output?: string;
	type?: ModuleType;
}

export default function vitePluginTailwindcssExtend({
	pattern,
	output = 'tailwindcss-extend.cjs',
	type = 'commonjs',
}: TailwindExtendConfig): Plugin {
	const mm = new Minimatch(pattern);

	return {
		name: 'vite-plugin-tailwindcss-extend',
		configureServer(vite) {
			vite.watcher.on('all', (event, path) => {
				if (mm.match(path)) {
					bundle(pattern, type, output);
				}
			});
		},
		async buildStart() {
			await bundle(pattern, type, output);
		},
	};
}
