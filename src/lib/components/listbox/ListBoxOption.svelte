<script lang="ts">
	import { join } from '$lib/helpers/join.helper';
	import { ListboxOption } from '@rgossiaux/svelte-headlessui';

	export let value: string;
</script>

<ListboxOption {value} let:selected let:active>
	<div
		class={join(
			'[ flex items-center justify-start ]',
			'[ bs-12 cursor-default select-none relative plb-2 pl-10 pr-4 ]',
			'[ data-[active=true]:text-green-100 data-[active=true]:bg-green-900/20 ]'
		)}
		data-active={active}
	>
		<slot {selected} {active} />
	</div>
</ListboxOption>
