<script>
	import { join } from '$lib/helpers/join.helper';
	import { Tab } from '@rgossiaux/svelte-headlessui';
</script>

<Tab
	class={join(
		'[ flex-1 p-2 text-gray-100 font-medium uppercase tracking-wide whitespace-nowrap outline-none ]',
		'[ aria-[selected=true]:border-be-2 aria-[selected=true]:border-be-green-500 ]',
		'[ focus-visible:bg-green-800/20 ]',
		'[ lg:pli-4 ]'
	)}
>
	<slot />
</Tab>
