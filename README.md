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

**Example**

```bash
tailwindcss-extend -p 'styles/**' --watch
```

### Vite

If you are using vite as a bundler you can directly use the plugin instead of the cli:

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
			type: 'commonjs'
		})
	]
});
```

### TailwindCSS config

Add the compiled plugin to your tailwind config:

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

## Config

Editing the theme inside the tailwind config doesn´t feel very natural due to the use of css in js. With tailwindcss-extend you can set your config directly inside (post-)css!

This:

```css
:config {
	theme {
		extend {
			colors {
				--brand: #fa3;
			}
		}
	}
}
```

compiles to:

```ts
const config = {
	theme: {
		extend: {
			colors: {
				brand: '#fa3'
			}
		}
	}
};
```

You can even use css variables to dynamicly set your theme!

```css
@layer base {
	:root {
		--bg: 255 255 255;
		--fg: 51 51 51;
	}

	@media (prefers-color-schema: dark) {
		:root {
			--bg: 51 51 51;
			--fg: 255 255 255;
		}
	}
}

:config {
	theme {
		extend {
			textColor {
				--main: rgb(var(--fg) / __alpha_value__);
			}
			backgroundColor {
				--main: rgb(var(--bg) / __alpha_value__);
			}
		}
	}
}
```

compiles to:

```ts
const config = {
	theme: {
		extend: {
			textColor: {
				main: 'rgb(var(--fg) / <alpha-value>)'
			},
			backgroundColor: {
				main: 'rgb(var(--bg) / <alpha-value>)'
			}
		}
	}
};
```

## License

[MIT](https://github.com/david-plugge/tailwindcss-extend/blob/main/LICENSE)
