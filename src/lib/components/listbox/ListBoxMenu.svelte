<script lang="ts">
	import { join } from '$lib/helpers/join.helper';
	import { ListboxOptions } from '@rgossiaux/svelte-headlessui';

	type T = $$Generic;
	export let items: Readonly<T[]>;
</script>

<ListboxOptions
	class={join(
		'[ absolute w-full py-1 mt-1 overflow-auto text-base bg-gray-900 rounded-sm shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 ]',
		'[ focus:outline-none ]',
		'[ sm:text-sm ]'
	)}
>
	{#each items as item (item)}
		<slot {item} />
	{/each}
</ListboxOptions>
