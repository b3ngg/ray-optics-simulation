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
				i: params.i,
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

	export let i: number;
	export let title: string;
	export let scene: Scene;
	export let html: string;
	export let randomized: boolean;
	export let inputBased: boolean;
</script>

<SceneRenderer {scene} />

<div
	class="bg-black bg-opacity-50 transform backdrop-blur-xl lg:fixed right-0 bottom-0 w-full max-w-3xl p-10 pb-0 lg:rounded-tl-lg border-white border-t lg:border-l"
>
	<article class="prose prose-invert lg:prose-lg">
		<h1>{title}</h1>
		{@html html}
	</article>

	<div class="flex flex-col py-8 space-y-2">
		{#if inputBased}
			<div class="flex items-center space-x-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="scale-105"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<rect x="6" y="3" width="12" height="18" rx="4" />
					<line x1="12" y1="7" x2="12" y2="11" />
				</svg>
				<p class="text-gray-400">Use your mouse (touch your screen) to manipulate the scene.</p>
			</div>
		{/if}
		{#if randomized}
			<div class="flex items-center space-x-3 cursor-pointer" on:click={() => location.reload()}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="scale-105"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
					<path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
				</svg>
				<p class="text-gray-400">Reload the page to get a different result.</p>
			</div>
		{/if}

		<div class="flex items-center space-x-3 cursor-pointer" on:click={() => location.reload()}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="scale-105"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<rect x="6" y="5" width="4" height="14" rx="1" />
				<rect x="14" y="5" width="4" height="14" rx="1" />
			</svg>

			<p class="text-gray-400">Press Space to pause the scene.</p>
		</div>
	</div>

	{#if i > 0}
		<a href="/scene/{+i - 1}">
			<Button secondary>Previous scene</Button>
		</a>
	{/if}
	{#if i < scenes.length - 1}
		<a href="/scene/{+i + 1}">
			<Button>Next scene</Button>
		</a>
	{/if}

	<Footer />
</div>
