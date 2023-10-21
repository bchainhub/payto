<script lang="ts">
	import { join } from '$lib/helpers/join.helper';
	import { getFieldGroupContext } from './fieldgroup.context';

	export let value: string | number | undefined;
	export let min: string;
	export let classValue: string = '';
	export let unixTimestamp: number | undefined;

	$: if (typeof value === 'string' && value) {
		const date = new Date(value);
		unixTimestamp = Math.floor(date.getTime() / 1000);
	} else {
		unixTimestamp = undefined;
	}

	const ctx = getFieldGroupContext();
	let computedClass: string = join(
		'[ is-full bs-12 plb-2 pli-3 text-start bg-gray-900 rounded-md border-none caret-teal-500 ]',
		'[ focus:outline-none focus-visible:ring-4 focus-visible:ring-opacity-75 focus-visible:ring-green-800 focus-visible:ring-offset-green-700 focus-visible:ring-offset-2 ]',
		'[ sm:text-sm ]',
		classValue
	);
</script>

<input
	class={computedClass}
	type="datetime-local"
	id={ctx.fieldId}
	aria-labelledby={ctx.labelId}
	aria-describedby={ctx.descriptionId}
	{min}
	bind:value
	{...$$restProps}
/>
