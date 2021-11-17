<script lang="ts">
	import type { Scene } from '$types/scene';
	import { onMount } from 'svelte';
	import { CanvasSpace } from 'pts';

	export let backgroundColor: string = '#333';
	export let scene: Scene;

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const space = new CanvasSpace(canvas);
		space.setup({ bgcolor: backgroundColor, resize: true });
		scene(space);

		() => space.dispose();
	});
</script>

<canvas bind:this={canvas} />
