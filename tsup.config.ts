import { defineConfig } from 'tsup';
import { name, version } from './package.json';

export default defineConfig({
	entry: ['src/vite.ts', 'src/cli.ts'],
	format: ['esm'],
	dts: {
		entry: ['src/vite.ts']
	},
	clean: true,
	define: {
		PKG_NAME: JSON.stringify(name),
		PKG_VERSION: JSON.stringify(version)
	}
});
