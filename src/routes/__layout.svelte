<script lang="ts">
	import { navigating } from '$app/stores';
	import Header from '$components/Header.svelte';

	import '../app.css';
</script>

<div class="h-screen w-screen bg-black text-white flex flex-col">
	<Header />
	<div class="w-full h-full overflow-auto">
		{#if !$navigating}
			<slot />
		{/if}
	</div>
</div>
