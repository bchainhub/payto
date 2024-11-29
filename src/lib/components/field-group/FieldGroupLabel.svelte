<script lang="ts">
	import { getFieldGroupContext } from './fieldgroup.context';

	const ctx = getFieldGroupContext();
	export let classValue: string = '';
	export let children: typeof import('svelte').SvelteComponent | null = null;
</script>

<label class={classValue} id={ctx.labelId} for={ctx.fieldId}>
	{#if children}
		<svelte:component this={children} />
	{/if}
</label>
