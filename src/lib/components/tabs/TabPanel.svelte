<script>
	import { join } from '$lib/helpers/join.helper';
	import { TabPanel } from '@rgossiaux/svelte-headlessui';
</script>

<TabPanel
	class={join(
		'[ outline-none ]',
		'[ focus:outline-none focus-visible:ring-1 focus-visible:ring-opacity-75 focus-visible:ring-green-800 focus-visible:ring-offset-green-700 focus-visible:ring-offset-2 ]'
	)}
>
	<slot />
</TabPanel>
