<script lang="ts">
	export let children: typeof import('svelte').SvelteComponent | null = null;
</script>

{#if children}
	<svelte:component this={children} />
{/if}
