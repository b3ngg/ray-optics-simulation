<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import snarkdown from 'snarkdown';

	export const load: Load = async ({ fetch }) => {
		const response = await fetch('/home.md');
		const markdown = await response.text();
		const html = snarkdown(markdown);

		return {
			props: {
				content: html
			}
		};
	};
</script>

<script lang="ts">
	import Footer from '$components/Footer.svelte';

	export let content: string;
</script>

<main class="max-w-6xl mx-auto p-10 pt-40">
	<article class="prose prose-invert lg:prose-lg">
		{@html content}

		<div class="my-10" />
		<Footer />
	</article>
</main>
