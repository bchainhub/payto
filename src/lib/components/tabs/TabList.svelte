<script>
	import { join } from '$lib/helpers/join.helper';
	import { TabList } from '@rgossiaux/svelte-headlessui';
</script>

<TabList
	class={join(
		'[ flex items-start justify-between ]',
		'[ border-be border-be-gray-700 overflow-hidden ]',
		'[ aria-[selected=true]:border-be-gray-300 ]'
	)}
>
	<slot />
</TabList>
