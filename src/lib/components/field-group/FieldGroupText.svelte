<script lang="ts">
	import { join } from '$lib/helpers/join.helper';
	import { getFieldGroupContext } from './fieldgroup.context';

	interface Props {
		value?: string | number;
		placeholder: string;
		classValue?: string;
	}

	export let value: string | number | undefined;
	export let placeholder: string;
	export let classValue: string = '';

	const ctx = getFieldGroupContext();

	$: computedClass = join(
		'[ is-full bs-12 plb-2 pli-3 text-start bg-gray-900 rounded-md border-none caret-teal-500 ]',
		'[ focus:outline-none focus-visible:ring-4 focus-visible:ring-opacity-75 focus-visible:ring-green-800 focus-visible:ring-offset-green-700 focus-visible:ring-offset-2 ]',
		'[ sm:text-sm ]',
		classValue
	);
</script>

<input
	class={computedClass}
	type="text"
	autocomplete="off"
	id={ctx.fieldId}
	aria-labelledby={ctx.labelId}
	aria-describedby={ctx.descriptionId}
	placeholder={placeholder}
	bind:value
	{...$$restProps}
/>
