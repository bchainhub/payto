<script lang="ts">
	import type { Component } from 'svelte';
	import { join } from '$lib/helpers/join.helper';

	export let children: Component | null = null;
</script>

<section
	class={join(
		'[ flex flex-col gap-6 ]',
		'[ grow rounded-sm ]',
		'[ p-4 text-gray-100 bg-gray-800/75 rounded-lg ]',
		'[ lg:!p-8 lg:gap-8 lg:is-1/2 ]'
	)}
>
	{#if children}
		<svelte:component this={children} />
	{/if}
</section>
