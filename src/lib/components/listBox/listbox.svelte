<script lang="ts">
	import { createListbox } from 'svelte-headlessui';
	import { join } from '$lib/helpers/join.helper';
	import Transition from 'svelte-transition';

	export let items: {
		value: string;
		label: string;
		symbol: string;
	}[] = [];
	export let value: string;

	const listbox = createListbox({ selected: items.find((i) => i.value === value) });

	function onSelect(e: Event) {
		value = (e as CustomEvent).detail.selected.value;
	}
</script>

<div class="flex w-full flex-col items-center justify-center">
	<div class="w-full">
		<div class="relative">
			<button
				use:listbox.button
				on:select={onSelect}
				class={join(
					'full-width',
					'[ inline-flex items-center ]',
					'[ relative is-full bs-12 plb-2 pli-3 pr-10 text-start bg-gray-900 rounded-md cursor-pointer ]',
					'[ focus:outline-none focus-visible:ring-4 focus-visible:ring-opacity-75 focus-visible:ring-green-800 focus-visible:ring-offset-green-700 focus-visible:ring-offset-2 ]',
					'[ sm:text-sm ]'
				)}
			>
				<span class="[ inline-block truncate uppercase ]">{value}</span>
				<span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
						class="w-5 h-5 text-gray-400"
					>
						<path
							fill-rule="evenodd"
							d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/>
					</svg>
				</span>
			</button>

			<Transition
				show={$listbox.expanded}
				leave="transition ease-in duration-100"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<ul
					use:listbox.items
					class={join(
						'[ absolute w-full py-1 mt-1 overflow-auto text-base bg-gray-900 rounded-sm shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 z-10 ]',
						'[ focus:outline-none ]',
						'[ sm:text-sm ]'
					)}
				>
					{#each items as value, i}
						{@const active = $listbox.active === value}
						{@const selected = $listbox.selected === value}
						<li
							class={join(
								'[ flex items-center justify-start ]',
								'[ bs-12 cursor-default select-none relative plb-2 pl-10 pr-4 ]',
								'[ data-[active=true]:text-green-100 data-[active=true]:bg-green-900/20 ]'
							)}
							data-active={active}
							use:listbox.item={{ value }}
						>
							<div class={join('[ inline-flex items-center gap-2 transition-all duration-200 ]')}>
								<span class="[ truncate font-medium ]">{value.label}</span>
								<span class="[ truncate font-medium text-gray-400 ]">{value.symbol}</span>
							</div>

							{#if selected}
								<span class="[ absolute inset-y-0 left-0 flex items-center pli-3 text-green-500 ]">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
										class="w-5 h-5"
									>
										<path
											fill-rule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clip-rule="evenodd"
										/>
									</svg>
								</span>
							{/if}
						</li>
					{/each}
				</ul>
			</Transition>
		</div>
	</div>
</div>
