import preprocess from 'svelte-preprocess';
import { resolve } from 'path';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapter(),
		files: {
			assets: 'contents'
		},
		vite: {
			resolve: {
				alias: {
					$components: resolve('./src/components'),
					$types: resolve('./src/types')
				}
			}
		}
	}
};

export default config;
