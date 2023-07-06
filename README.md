# tailwindcss-extend

[![npm](https://img.shields.io/npm/v/tailwindcss-extend)](https://www.npmjs.com/package/tailwindcss-extend)
![GitHub top language](https://img.shields.io/github/languages/top/david-plugge/tailwindcss-extend)
![GitHub Workflow Status (with branch)](https://img.shields.io/github/actions/workflow/status/david-plugge/tailwindcss-extend/main.yaml?branch=main)

Compile your tailwindcss components into tailwind plugins and enjoy full autocompletion!

## Installation

```bash
# npm
npm i tailwindcss-extend

# pnpm
pnpm i tailwindcss-extend

# yarn
yarn add tailwindcss-extend
```

## Usage

### Cli

```
Usage
    $ tailwindcss-extend [options]

Options
    -p, --pattern    pattern to match files
    -t, --type       output type, "module" or "commonjs"  (default commonjs)
    -o, --output     output path  (default tailwindcss-extend.cjs)
    -w, --watch      watch for changes  (default false)
    -v, --version    Displays current version
    -h, --help       Displays this message
```

### Vite

```ts
// vite.config.ts

import { defineConfig } from 'vite';
import tailwindcssExtend from 'tailwindcss-extend/vite';

export default defineConfig({
	plugins: [
		tailwindcssExtend({
			// required param
			pattern: '**/styles/*',

			// optional params with defaults
			output: 'tailwindcss-extend.cjs',
			type: 'commonjs',
		}),
	],
});
```

### TailwindCSS config

```js
// tailwind.config.cjs

/** @type {import('tailwindcss').Config} */
const config = {
	...
	plugins: [
		...

		// this points to the genereted file
		require('./tailwindcss-extend.cjs')
	]
};

module.exports = config;
```

## License

[MIT](https://github.com/david-plugge/tailwindcss-extend/blob/main/LICENSE)
