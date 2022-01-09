<script lang="ts" context="module">
	export const load: Load = async ({ params }) => {
		return {
			props: {
				sceneIndex: params.i
			}
		};
	};
</script>

<script lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { scenes } from '$lib/scenes';
	import Renderer from '$components/Renderer.svelte';

	export let sceneIndex: number;
	const scene = Object.values(scenes)[sceneIndex];
</script>

<Renderer {scene} />
