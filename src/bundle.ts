import { readFile, writeFile } from 'fs/promises';
import { Glob } from 'glob';
import { parse } from 'postcss';
import { objectify } from 'postcss-js';

export type ModuleType = 'module' | 'commonjs';

const layerMap = {
	'@layer base': 'addBase',
	'@layer components': 'addComponents',
	'@layer utilities': 'addUtilities'
} as const;

export async function bundle(
	pattern: string,
	type: ModuleType,
	output: string
) {
	const layers: string[] = [];
	let config: any = {};

	const g = new Glob(pattern, {
		nodir: true,
		absolute: true
	});

	for await (const file of g) {
		let css = await readFile(file, 'utf8');

		css = css.replaceAll('__alpha_value__', '<alpha-value>');

		const root = parse(css, { from: file });
		const jss = objectify(root);

		let layer: keyof typeof layerMap;
		for (layer in layerMap) {
			if (layer in jss) {
				layers.push(
					`api.${layerMap[layer]}(${JSON.stringify(jss[layer])});`
				);
			}
		}

		if (':config' in jss) {
			config = deepmerge(config, jss[':config']);
		}
	}

	const handlerStr = [
		'const handler = (api) => {',
		`\t${layers.join('\n\t\t')}`,
		'};'
	].join('\n');

	const configStr = `const config = ${JSON.stringify(config)};`;

	const content = [
		handlerStr,
		'',
		configStr,
		'',
		`${type === 'commonjs' ? 'module.exports =' : 'export default'} {`,
		'\thandler,',
		'\tconfig,',
		'};'
	].join('\n');

	await writeFile(output, content, 'utf-8');
}

function isObject(o: unknown) {
	return typeof o === 'object' && !Array.isArray(o);
}

function deepmerge(target: any, ...sources: any[]) {
	if (!sources.length) return target;
	const source = sources.shift();

	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (isObject(source[key])) {
				if (!target[key]) Object.assign(target, { [key]: {} });
				deepmerge(target[key], source[key]);
			} else {
				Object.assign(target, { [key]: source[key] });
			}
		}
	}

	return deepmerge(target, ...sources);
}
