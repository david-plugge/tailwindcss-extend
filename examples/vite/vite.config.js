import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcssExtend from 'tailwindcss-extend/vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcssExtend({
			pattern: 'styles/**',
			output: 'tailwindcss-extend.js',
			type: 'module'
		})
	]
});
