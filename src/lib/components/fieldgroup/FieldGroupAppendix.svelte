<script lang="ts">
	import { getFieldGroupContext } from './fieldgroup.context';

	export let children: typeof import('svelte').SvelteComponent | null = null;

	const ctx = getFieldGroupContext();
</script>

<small class="[ -mb-1 text-gray-400 ]" id={ctx.descriptionId}>
	{#if children}
		<svelte:component this={children} />
	{/if}
</small>
