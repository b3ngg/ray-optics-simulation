<script lang="ts">
	import { page } from '$app/stores';
	import { scenes } from '$lib/scenes';
</script>

<header class="fixed left-0 top-0 right-0 w-full backdrop-blur-2xl bg-black bg-opacity-60">
	<div class="mx-auto max-w-6xl">
		<menu class="flex items-center justify-between p-4 px-10">
			<a href="/" class="font-medium hover:underline {!$page.params['i'] && 'underline'}"> Home </a>
			{#each scenes as scene, i}
				<a
					href="/scene/{i}"
					class="font-medium hover:underline {$page.params['i'] === '' + i && 'underline'}"
				>
					{scene.title}
				</a>
			{/each}
		</menu>
	</div>
</header>
