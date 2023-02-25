<script lang="ts">
	import { join } from '$lib/helpers/join.helper';
	import { Listbox } from '@rgossiaux/svelte-headlessui';

	export let value: string | undefined;
</script>

<Listbox class={join('[ relative mt-1 ]', $$props.class)} {value} on:change>
	<slot />
</Listbox>
