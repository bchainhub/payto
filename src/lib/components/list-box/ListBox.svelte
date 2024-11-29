<script lang="ts">
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { join } from '$lib/helpers/join.helper';

	export let items: { value: string; label: string; ticker?: string }[] = [];
	export let value: string | undefined;
	export let id: string = '';

	const expanded = writable(false);

	let dropdownElement: HTMLDivElement | null = null;

	function toggle() {
		expanded.update((e) => !e);
	}

	function select(item: { value: string; label: string; ticker?: string }) {
		value = item.value;
		expanded.set(false);
	}

	function handleOutsideClick(event: MouseEvent) {
		if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
			expanded.set(false);
		}
	}
</script>

<div class="relative w-full dropdown" bind:this={dropdownElement}>
	<button
		id={id}
		on:click={toggle}
		class={join(
			'[ inline-flex items-center justify-between ]',
			'[ w-full px-3 py-2 bg-gray-900 text-white rounded-md cursor-pointer ]',
			'[ focus:outline-none focus-visible:ring-4 focus-visible:ring-opacity-75 focus-visible:ring-green-800 ]'
		)}
	>
		<span class="truncate">
			{items.find((item) => item.value === value)?.label || 'Select an option'}
		</span>
		<span class="ml-2">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15l3.75 3.75L15.75 15m-7.5-6l3.75-3.75L15.75 9" />
			</svg>
		</span>
	</button>

	{#if $expanded}
		<ul
			class={join(
				'[ absolute mt-1 max-h-60 w-full overflow-auto bg-gray-900 text-white rounded-md shadow-lg z-10 ]',
				'[ ring-1 ring-black ring-opacity-5 focus:outline-none ]'
			)}
			tabindex="-1"
			in:fade
			out:fade
		>
			{#each items as item}
				<li>
					<button
						type="button"
						on:click={() => select(item)}
						on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && select(item)}
						class="flex items-center w-full px-3 py-2 hover:bg-gray-700"
					>
						{#if value === item.value}
							<span class="text-green-500 mr-2">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
									<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
								</svg>
							</span>
						{:else}
							<span class="w-5 h-5 mr-2"></span>
						{/if}
						<span class="flex-1 text-left">{item.label}</span>
						{#if item.ticker}
							<span class="text-gray-400 text-sm">{item.ticker}</span>
						{/if}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<svelte:window on:click={handleOutsideClick} />
