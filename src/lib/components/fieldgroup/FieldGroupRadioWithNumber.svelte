<script lang="ts">
	import { writable } from 'svelte/store';
	import { join } from '$lib/helpers/join.helper';
	import { getFieldGroupContext } from './fieldgroup.context';

	export let options: { name: string, value: string, hasNumberInput?: boolean, disabled?: boolean }[] = [];
	export let defaultChecked: string | null = null;
	export let numberValue: number = 1;
	export let numberMin: number = 1;
	export let numberMax: number = 365;
	export let disabled: boolean = false;
	export let outputValue: string = '';

	let _disabled = disabled;
	$: _disabled = disabled;

	let internalCheckedValue = writable(defaultChecked || options[0]?.value);
	let checkedValue: string;
	internalCheckedValue.subscribe(val => checkedValue = val);

	$: {
		if(checkedValue === 'd' && numberValue > 1) {
			outputValue = `${numberValue}d`;
		} else {
			outputValue = checkedValue;
		}
	}

	const ctx = getFieldGroupContext();
	let computedClass: string = join(
		'[ plb-2 pli-3 text-start bg-gray-900 rounded-md border-none caret-teal-500 ]',
		'[ focus:outline-none focus-visible:ring-4 focus-visible:ring-opacity-75 focus-visible:ring-green-800 focus-visible:ring-offset-green-700 focus-visible:ring-offset-2 ]',
		'[ sm:text-sm ]'
	);
</script>

<div class="flex items-center gap-4">
	{#each options as option}
		<label>
			<input
				type="radio"
				name="recurrencePattern"
				value={option.value}
				bind:group={checkedValue}
				on:change={() => internalCheckedValue.set(option.value)}
				disabled={option.disabled || _disabled} />
			{option.name}
		</label>
		{#if option.hasNumberInput && checkedValue === option.value}
			<input
				class={computedClass}
				type="number"
				bind:value={numberValue}
				min={numberMin}
				max={numberMax}
				placeholder={option.name}
				disabled={checkedValue !== option.value || _disabled} />
		{/if}
	{/each}
</div>
