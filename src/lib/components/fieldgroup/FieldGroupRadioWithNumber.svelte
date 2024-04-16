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
	export let outputValue: string | null = '';

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
		'[ w-1/4 sm:text-sm mr-2 ]'
	);
</script>

<div>
	<div class="flex flex-wrap mb-2">
		{#each options as option}
			<label class="flex-grow flex items-center">
				<input
					type="radio"
					name="recurrencePattern"
					value={option.value}
					bind:group={checkedValue}
					on:change={() => internalCheckedValue.set(option.value)}
					disabled={option.disabled || _disabled} />
				<span class="ml-1">{option.name}</span>
			</label>
		{/each}
	</div>
	{#each options as option}
		<div class="flex items-center">
			{#if option.hasNumberInput && checkedValue === option.value}
				<label for="input-{option.name}" class="mr-2">{option.name}:</label>
				<input
					id="input-{option.name}"
					class={computedClass}
					type="number"
					bind:value={numberValue}
					min={numberMin}
					max={numberMax}
					placeholder={option.name}
					disabled={checkedValue !== option.value || _disabled} />
			{/if}
		</div>
	{/each}
</div>
