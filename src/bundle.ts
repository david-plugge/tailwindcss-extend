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

	const g = new Glob(pattern, {
		nodir: true,
		absolute: true
	});

	for await (const file of g) {
		const css = await readFile(file, 'utf8');

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
	}

	const content = [
		`${
			type === 'commonjs' ? 'module.exports =' : 'export default'
		} (api) => {`,
		`\t${layers.join('\n\t')}`,
		'};'
	].join('\n');

	await writeFile(output, content, 'utf-8');
}
