<script lang="ts">
	import { join } from '$lib/helpers/join.helper';
	import { setFieldGroupContext } from './fieldgroup.context';

	setFieldGroupContext();

	export let children: typeof import('svelte').SvelteComponent | null = null;

	export let classValue: string = '';
	export let flexType: string = 'flex-col';
	export let itemPosition: string = 'items-stretch';

	$: computedClass = join('[ flex gap-2 ]', itemPosition, flexType, classValue);
</script>

<div class={computedClass}>
	{#if children}
		<svelte:component this={children} />
	{/if}
</div>
