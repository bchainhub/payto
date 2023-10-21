<script lang="ts">
	import {
		FieldGroup,
		FieldGroupAppendix,
		FieldGroupLabel,
		FieldGroupNumber,
		FieldGroupDateTime,
		FieldGroupText,
		FieldGroupRadioWithNumber,
		ListBox,
		ListBoxButton,
		ListBoxMenu,
		ListBoxOption
	} from '$lib/components';

	import { TRANSPORT } from '$lib/data/transports.data';
	import { join } from '$lib/helpers/join.helper';
	import { constructor } from '$lib/store/constructor.store';
	import { fade, fly } from 'svelte/transition';

	let timeDateValue = '';

	function getCurrentDateTime() {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');
		return `${year}-${month}-${day}T${hours}:${minutes}`;
	}

	function handleExpirationChange() {
		if (!$constructor.ican.isDl) {
			timeDateValue = '';
			$constructor.ican.params.dl.value = undefined;
		}
	}

	function handleRecurringChange() {
		if (!$constructor.ican.isRc) {
			$constructor.ican.params.rc.value = undefined;
		}
	}
</script>

<div class="[ flex flex-col gap-6 ]" in:fly={{ y: 64 }}>
	<div class={join('[ flex flex-col items-stretch gap-2 ]')}>
		<label id="transport-network-label" for="transport-network">Transport Network *</label>
		<div class="[ flex flex-col items-stetch gap-4 ]">
			{#if $constructor.ican.network !== 'other'}
				<div in:fade>
					<ListBox
						className="[ grow ]"
						bind:value={$constructor.ican.network}
					>
						<ListBoxButton id="transport-network">
							<span class="[ inline-block truncate uppercase ]">{$constructor.ican.network}</span>
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
						</ListBoxButton>

						<ListBoxMenu items={TRANSPORT.ican} let:item>
							<ListBoxOption value={item.value} let:selected>
								<div class={join('[ inline-flex items-center gap-2 transition-all duration-200 ]')}>
									<span class="[ truncate font-medium ]">{item.label}</span>
									<span class="[ truncate font-medium text-gray-400 ]">{item.symbol}</span>
								</div>

								{#if selected}
									<span
										class="[ absolute inset-y-0 left-0 flex items-center pli-3 text-green-500 ]"
									>
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
							</ListBoxOption>
						</ListBoxMenu>
					</ListBox>
				</div>
			{/if}

			{#if $constructor.ican.network === 'other'}
				<div class={join('[ flex items-center ]', '[ relative ]')} in:fade>
					<button
						class={join(
							'[ flex items-center justify-between ]',
							'[ absolute inline-start-0 mli-3 p-2 text-gray-50 bg-gray-700 rounded-full outline-none transition-all duration-200 ]',
							'[ focus-within:bg-green-900 focus-within:text-green-50 active:scale-95 ]'
						)}
						type="button"
						title="Back to network menu options"
						on:pointerdown={() => ($constructor.ican.network = 'xcb')}
					>
						<svg
							class={join('[ bs-4 is-4 ]')}
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
							/>
						</svg>
					</button>

					<input
						class={join(
							'[ is-full bs-12 plb-2 pis-14 pie-3 text-start bg-gray-900 rounded-md border-none caret-teal-500 ]',
							'[ focus:outline-none focus-visible:ring-4 focus-visible:ring-opacity-75 focus-visible:ring-green-800 focus-visible:ring-offset-green-700 focus-visible:ring-offset-2 ]',
							'[ sm:text-sm ]'
						)}
						type="text"
						id="transport-network"
						placeholder="Other network"
						autocomplete="off"
						aria-labelledby="transport-network-label"
						style="text-transform: uppercase"
						bind:value={$constructor.ican.other}
					/>
				</div>
			{/if}
		</div>
	</div>

	<FieldGroup>
		<FieldGroupLabel>Address / NS *</FieldGroupLabel>
		<FieldGroupText
			placeholder={
				$constructor.ican.network === 'btc' ? 'e.g. 1BvBEx…' :
				$constructor.ican.network === 'eth' ? 'e.g. 0x1abc…; name.eth' :
				$constructor.ican.network === 'ltc' ? 'e.g. LbYvAb…' :
				$constructor.ican.network === 'xmr' ? 'e.g. 4A3BcD…' :
				'e.g. cb57bb…; name.tld'
			}
			bind:value={$constructor.ican.destination} />
	</FieldGroup>

	<FieldGroup>
		<div class="flex items-center">
			<input type="checkbox" bind:checked={$constructor.ican.isFiat} id="fiatCheckbox" />
			<label for="fiatCheckbox" class="ml-2">Fiat currency (government-issued money)</label>
		</div>
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>{$constructor.ican.isFiat ? 'Fiat currency' : 'Token code / Token address'}</FieldGroupLabel>
		<FieldGroupText placeholder={$constructor.ican.isFiat ? 'e.g. CHF; EUR; USD; …' : 'e.g. CTN; 0x1ab…'} bind:value={$constructor.ican.params.currency.value} />
		<FieldGroupAppendix>If left empty, the default is the network currency or local fiat.</FieldGroupAppendix>
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Amount</FieldGroupLabel>
		<FieldGroupNumber placeholder="e.g. 3.14" bind:value={$constructor.ican.params.amount.value} />
	</FieldGroup>

	{#if $constructor.ican.network === 'eth' || $constructor.ican.network === 'other'}
		<FieldGroup>
			<FieldGroupLabel>Chain ID</FieldGroupLabel>
			<FieldGroupText placeholder="e.g. 61" bind:value={$constructor.ican.chain} />
			<FieldGroupAppendix>If left empty, the default is the default network chain.</FieldGroupAppendix>
		</FieldGroup>
	{/if}

	<FieldGroup>
		<div class="flex items-center">
			<input type="checkbox" bind:checked={$constructor.ican.isDl} id="expirationCheckbox" on:change={handleExpirationChange} />
			<label for="expirationCheckbox" class="ml-2">Expiration (deadline)</label>
		</div>
	</FieldGroup>

	{#if $constructor.ican.isDl}
		<FieldGroup>
			<FieldGroupLabel>Expiration Date</FieldGroupLabel>
			<FieldGroupDateTime id="expirationInput" min={getCurrentDateTime()} bind:value={timeDateValue} bind:unixTimestamp={$constructor.ican.params.dl.value} />
			<FieldGroupAppendix>Value is in the local timezone. The defined breakpoint is excluded.</FieldGroupAppendix>
		</FieldGroup>
	{/if}

	<FieldGroup>
		<div class="flex items-center">
			<input type="checkbox" bind:checked={$constructor.ican.isRc} id="recurringCheckbox" on:change={handleRecurringChange} />
			<label for="recurringCheckbox" class="ml-2">Recurring payments</label>
		</div>
	</FieldGroup>

	{#if $constructor.ican.isRc}
		<FieldGroupRadioWithNumber
			options={[
				{ name: 'Yearly', value: 'y' },
				{ name: 'Monthly', value: 'm' },
				{ name: 'Weekly', value: 'w' },
				{ name: 'Daily', value: 'd', hasNumberInput: true }
			]}
			defaultChecked={$constructor.ican.params.rc.value}
			bind:outputValue={$constructor.ican.params.rc.value} />
	{/if}
</div>
