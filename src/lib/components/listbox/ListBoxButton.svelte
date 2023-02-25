<script lang="ts">
	import { join } from '$lib/helpers/join.helper';
	import { ListboxButton } from '@rgossiaux/svelte-headlessui';

	export let ariaLabelledBy = '';
	export let id = '';
</script>

<ListboxButton
	class={join(
		'[ inline-flex items-center ]',
		'[ relative is-full bs-12 plb-2 pli-3 pr-10 text-start bg-gray-900 rounded-md cursor-pointer ]',
		'[ focus:outline-none focus-visible:ring-4 focus-visible:ring-opacity-75 focus-visible:ring-green-800 focus-visible:ring-offset-green-700 focus-visible:ring-offset-2 ]',
		'[ sm:text-sm ]'
	)}
>
	<slot />
</ListboxButton>
