<script lang="ts" context="module">
	export const load: Load = async ({ params, url }) => {
		const sceneInfo: SceneInfo = scenes[params.i];
		if (!sceneInfo) return;

		const getHtml = async () => {
			if (!sceneInfo.content) return null;
			const response = await fetch(url.origin + sceneInfo.content);
			const markdown = await response.text();
			return snarkdown(markdown);
		};

		return {
			props: {
				...sceneInfo,
				html: await getHtml()
			}
		};
	};
</script>

<script lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { Scene } from '$types/Scene';
	import snarkdown from 'snarkdown';
	import { SceneInfo, scenes } from '$lib/scenes';
	import SceneRenderer from '$components/SceneRenderer.svelte';
	import Button from '$components/Button.svelte';
	import Footer from '$components/Footer.svelte';

	export let title: string;
	export let scene: Scene;
	export let html: string;
	export let randomized: boolean;
</script>

<SceneRenderer {scene} />

<div
	class="bg-black bg-opacity-50 transform backdrop-blur-2xl lg:fixed right-0 bottom-0 w-full max-w-3xl p-10 pb-0 lg:rounded-tl-lg border-white border-t lg:border-l"
>
	<article class="prose prose-invert lg:prose-lg pb-10">
		<h1>{title}</h1>
		{@html html}

		{#if randomized}
			<div on:click={() => location.reload()} class="pt-10">
				<Button secondary>Randomize</Button>
			</div>
		{/if}
	</article>

	<Button secondary>Previous scene</Button>
	<Button>Next scene</Button>

	<Footer />
</div>
