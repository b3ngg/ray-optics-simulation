<script lang="ts">
	import type { Scene } from '$types/scene';
	import { onMount } from 'svelte';
	import { CanvasSpace } from 'pts';

	export let backgroundColor: string = '#333';
	export let scene: Scene;

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const space = new CanvasSpace(canvas);
		space.setup({ bgcolor: backgroundColor, retina: true, resize: true });
		scene(space);
	});
</script>

<canvas bind:this={canvas} />
