<script lang="ts">
	export let secondary: boolean = false;
</script>

<button
	class="p-6 mr-2 my-2 py-3 font-bold rounded-lg cursor-pointer border-white text-sm border transition hover:opacity-60 
    {secondary ? 'text-white' : 'text-black bg-white'}"
>
	<slot />
</button>
