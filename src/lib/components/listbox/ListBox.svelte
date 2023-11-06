<script lang="ts">
	import { join } from '$lib/helpers/join.helper';
	import { Listbox } from '@rgossiaux/svelte-headlessui';

	export let value: string | undefined;
	export let classValue: string = '';
	let computedClass: string = join('[ relative mt-1 listbox ]', classValue);
</script>

<Listbox bind:value class={computedClass} on:change {...$$restProps}>
	<slot />
</Listbox>
