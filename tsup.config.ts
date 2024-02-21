import { defineConfig } from 'tsup';
import { name, version } from './package.json';

export default defineConfig([
	{
		entry: ['src/vite.ts', 'src/cli.ts'],
		format: ['esm'],
		dts: true,
		clean: true
	},
	{
		entry: ['src/cli.ts'],
		format: ['esm'],
		dts: false,
		clean: true,
		banner: {
			js: '#!/usr/bin/env node'
		},
		define: {
			PKG_NAME: JSON.stringify(name),
			PKG_VERSION: JSON.stringify(version)
		}
	}
]);
