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
	import Button from '$components/Button.svelte';
	import Footer from '$components/Footer.svelte';
	import { scenes } from '$lib/scenes';

	export let content: string;

	$: splittedContent = content.split('@@@');
</script>

<main class="max-w-6xl mx-auto p-10 pt-40">
	<article class="prose prose-invert lg:prose-lg">
		{@html splittedContent[0]}

		<div class="my-10" />
		<a href="/scene/0">
			<Button>Start</Button>
		</a>

		<h2>All scenes</h2>
		<ul>
			{#each scenes as scene, i}
				<li>
					<a href="/scene/{i}">
						{scene.title}
					</a>
				</li>
			{/each}
		</ul>

		{@html splittedContent[1]}

		<div class="my-10" />
		<Footer />
	</article>
</main>
