<script lang="ts">
	import type { Scene } from '$types/Scene';
	import { onMount } from 'svelte';
	import { CanvasSpace } from 'pts';
	import { COLORS } from '$lib/const';
	import { createWorld } from '$lib/world';

	export let backgroundColor: string = COLORS.BG;
	export let scene: Scene;

	let paused: boolean = false;
	let canvas: HTMLCanvasElement;
	let space: CanvasSpace;
	onMount(() => {
		space = new CanvasSpace(canvas);
		space.setup({ bgcolor: backgroundColor, offscreen: false, retina: true, resize: true });

		let sceneCallback: ReturnType<Scene>;
		const form = space.getForm();
		const world = createWorld();
		space.add({
			start: (bounds) => {
				const scale = space.innerBound.bottomRight.magnitude();
				sceneCallback = scene({
					space,
					form,
					center: space.center,
					bounds,
					world,
					screen: space.innerBound.bottomRight,
					scale
				});
			},
			animate: (t) => {
				if (typeof sceneCallback === 'function') sceneCallback(t, space.pointer);
				world.update();
				world.draw(form);
			}
		});

		space.bindMouse().bindTouch().play();
		return () => space.dispose();
	});

	const onKey = (e: KeyboardEvent) => {
		if (e.code === 'Space') {
			space.pause(true);
			paused = !paused;
		}
	};
</script>

<svelte:window on:keypress={onKey} />
<div class="h-[80vh] xl:h-screen">
	{#if paused}
		<div class="fixed left-0 top-0 w-full h-full flex items-center justify-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="icon icon-tabler icon-tabler-player-pause scale-[10] opacity-40"
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
		</div>
	{/if}
	<canvas bind:this={canvas} />
</div>
