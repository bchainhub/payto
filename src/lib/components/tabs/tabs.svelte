<script lang="ts">
	import { createTabs } from 'svelte-headlessui';
	import { join } from '$lib/helpers/join.helper';

	export let config: {
		[key: string]: {
			label: string;
			component: any;
		};
	} = {};
	const keys = Object.keys(config);
	export let selectedTab: string = 'ican';
	const tabs = createTabs({ selected: selectedTab });
	function onSelect(e: Event) {
		selectedTab = (e as CustomEvent).detail.selected;
	}
</script>

<div class="flex w-full flex-col">
	<div
		use:tabs.list
		on:select={onSelect}
		class={join(
			'[flex-1 mb-4 text-gray-100 font-medium uppercase tracking-wide whitespace-nowrap outline-none ]',
			'[ aria-[selected=true]:border-be-2 aria-[selected=true]:border-be-green-500 ]',
			'[ focus-visible:bg-green-800/20 ]',
			'[ lg:pli-4] flex'
		)}
	>
		{#each keys as value}
			<button
				use:tabs.tab={{ value }}
				class={join(
					'[ flex-1 p-2 text-gray-100 font-medium uppercase tracking-wide whitespace-nowrap outline-none ]',
					'[ aria-[selected=true]:border-be-2 aria-[selected=true]:border-be-green-500 aria-[selected=false]:border-be-2 aria-[selected=false]:border-be-gray-700 ]',
					'[ focus-visible:bg-green-800/20 ]',
					'[ lg:pli-4 ]'
				)}>{config[value].label}</button
			>
		{/each}
	</div>
	<div class="mt-4">
		{#each keys as value}
			{@const selected = $tabs.selected === value}
			<div
				use:tabs.panel
				class={join(
					'[ outline-none ]',
					'[ focus:outline-none focus-visible:ring-1 focus-visible:ring-opacity-75 focus-visible:ring-green-800 focus-visible:ring-offset-green-700 focus-visible:ring-offset-2 ]'
				)}
			>
				{#if selected}
					{@const Component = config[$tabs.selected].component}
					<Component />
				{/if}
			</div>
		{/each}
	</div>
</div>
