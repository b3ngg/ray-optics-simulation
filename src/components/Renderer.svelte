<script lang="ts">
	import type { Scene } from '$types/Scene';
	import { onMount } from 'svelte';
	import { CanvasSpace } from 'pts';
	import { COLORS } from '$lib/const';

	export let backgroundColor: string = COLORS.BG;
	export let scene: Scene;

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const space = new CanvasSpace(canvas);
		space.setup({ bgcolor: backgroundColor, offscreen: false, retina: true, resize: true });
		scene(space);

		() => space.dispose();
	});
</script>

<div class="h-[80vh] lg:h-screen">
	<canvas bind:this={canvas} />
</div>
