<script lang="ts">
	import type { Scene } from '$types/Scene';
	import { onMount } from 'svelte';
	import { CanvasSpace } from 'pts';
	import { COLORS } from '$lib/const';
	import { createWorld } from '$lib/world';

	export let backgroundColor: string = COLORS.BG;
	export let scene: Scene;

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
				sceneCallback(t);
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
		}
	};
</script>

<svelte:window on:keypress={onKey} />
<div class="h-[90vh] lg:h-screen">
	<canvas bind:this={canvas} />
</div>
