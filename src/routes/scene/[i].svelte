<script lang="ts">
	import { page } from '$app/stores';

	import Renderer from '$components/Renderer.svelte';
	import { scenes } from '$lib/scenes';

	const scene = Object.values(scenes)[$page.params['i']];
</script>

<Renderer {scene} />
