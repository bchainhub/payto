<script lang="ts">
	import { join } from '$lib/helpers/join.helper';
	import { getFieldGroupContext } from './fieldgroup.context';

	export let value: string | number | undefined;
	export let placeholder: string;
	export let classValue: string = '';
	export let min: number = 0;
	export let max: number | undefined = undefined;
	export let disabled: boolean = false;
	let _disabled = disabled;
	$: _disabled = disabled;

	const ctx = getFieldGroupContext();
	let computedClass: string = join(
		'[ bs-12 plb-2 pli-3 text-start bg-gray-900 rounded-md border-none caret-teal-500 ]',
		'[ focus:outline-none focus-visible:ring-4 focus-visible:ring-opacity-75 focus-visible:ring-green-800 focus-visible:ring-offset-green-700 focus-visible:ring-offset-2 ]',
		'[ sm:text-sm ]',
		classValue
	);
</script>

<input
	class={computedClass}
	type="number"
	id={ctx.fieldId}
	min={min}
	aria-labelledby={ctx.labelId}
	aria-describedby={ctx.descriptionId}
	{placeholder}
	disabled={_disabled}
	bind:value
	{...$$restProps}
	{...(max !== undefined ? { max } : {})}
/>
