<script lang="ts">
	import {
		FieldGroup,
		FieldGroupAppendix,
		FieldGroupLabel,
		FieldGroupNumber,
		FieldGroupDateTime,
		FieldGroupText,
		FieldGroupRadioWithNumber,
		Listbox
	} from '$lib/components';

	import { TRANSPORT } from '$lib/data/transports.data';
	import { join } from '$lib/helpers/join.helper';
	import { constructor } from '$lib/store/constructor.store';
	import { fade, fly } from 'svelte/transition';

	let timeDateValue = '';
	$: classUpperValue =
		$constructor.networks.ican.params?.currency?.value && typeof $constructor.networks.ican.params.currency.value === 'string'
			? (!$constructor.networks.ican.params.currency.value.toLowerCase().startsWith('0x') ? 'uppercase' : '')
			: '';
	$: tokens = TRANSPORT.ican.find((item) => item.value === $constructor.networks.ican.network)?.tokens;

	function getCurrentDateTime() {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');
		return `${year}-${month}-${day}T${hours}:${minutes}`;
	}

	function handleFiatChange() {
		if (!$constructor.networks.ican.isFiat) {
			$constructor.networks.ican.params.fiat.value = undefined;
		}
	}

	function handleSplitChange() {
		if (!$constructor.networks.ican.isSplit) {
			$constructor.networks.ican.params.split.isPercent = undefined;
			$constructor.networks.ican.params.split.value = undefined;
			$constructor.networks.ican.params.split.address = undefined;
		}
	}

	function handleExpirationChange() {
		if (!$constructor.networks.ican.isDl) {
			timeDateValue = '';
			$constructor.networks.ican.params.dl.value = undefined;
		}
	}

	function handleRecurringChange() {
		if (!$constructor.networks.ican.isRc) {
			$constructor.networks.ican.params.rc.value = undefined;
		}
	}
</script>

<div class="[ flex flex-col gap-6 ]" in:fly={{ y: 64 }}>
	<div class={join('[ flex flex-col items-stretch gap-2 ]')}>
		<label id="transport-network-label" for="transport-network">Transport Network *</label>
		<div class="[ flex flex-col items-stetch gap-4 ]">
			{#if $constructor.networks.ican.network !== 'other'}
				<div in:fade>
					<Listbox bind:value={$constructor.networks.ican.network} items={TRANSPORT.ican} />
				</div>
			{/if}

			{#if $constructor.networks.ican.network === 'other'}
				<div class={join('[ flex items-center ]', '[ relative ]')} in:fade>
					<button
						class={join(
							'[ flex items-center justify-between ]',
							'[ absolute inline-start-0 mli-3 p-2 text-gray-50 bg-gray-700 rounded-full outline-none transition-all duration-200 ]',
							'[ focus-within:bg-green-900 focus-within:text-green-50 active:scale-95 ]'
						)}
						type="button"
						title="Back to network menu options"
						on:pointerdown={() => ($constructor.networks.ican.network = 'xcb')}
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
						bind:value={$constructor.networks.ican.other}
					/>
				</div>
			{/if}
		</div>
	</div>

	<FieldGroup>
		<FieldGroupLabel>Address / <abbr title="Name Service">NS</abbr> *</FieldGroupLabel>
		<FieldGroupText
			placeholder={$constructor.networks.ican.network === 'btc'
				? 'e.g. 1BvBEx…'
				: $constructor.networks.ican.network === 'eth'
				? 'e.g. 0x1abc…; name.eth'
				: $constructor.networks.ican.network === 'ltc'
				? 'e.g. LbYvAb…'
				: $constructor.networks.ican.network === 'xmr'
				? 'e.g. 4A3BcD…'
				: 'e.g. cb57bb…; name.tld'}
			bind:value={$constructor.networks.ican.destination}
		/>
	</FieldGroup>

	{#if tokens}
		<FieldGroup>
			<FieldGroupLabel>Token code / Token address</FieldGroupLabel>
			<FieldGroupText
				placeholder="e.g. CTN; 0x1ab…"
				bind:value={$constructor.networks.ican.params.currency.value}
				classValue={classUpperValue}
			/>
			<FieldGroupAppendix>If left empty, the default is the network currency or local fiat.</FieldGroupAppendix>
		</FieldGroup>
	{/if}

	<FieldGroup>
		<FieldGroupLabel>{($constructor.networks.ican.isFiat ? 'Fiat Amount' : 'Amount')}</FieldGroupLabel>
		<FieldGroupNumber
			placeholder="e.g. 3.14"
			bind:value={$constructor.networks.ican.params.amount.value}
		/>
	</FieldGroup>

	{#if $constructor.networks.ican.network === 'eth' || $constructor.networks.ican.network === 'other'}
		<FieldGroup>
			<FieldGroupLabel>Chain ID</FieldGroupLabel>
			<FieldGroupText
				placeholder="e.g. 61"
				bind:value={$constructor.networks.ican.chain}
			/>
			<FieldGroupAppendix>If left empty, the default network chain will be used.</FieldGroupAppendix>
		</FieldGroup>
	{/if}

	<FieldGroup>
		<div class="flex items-center">
			<input
				type="checkbox"
				bind:checked={$constructor.networks.ican.isFiat}
				id="fiatCheckbox"
				on:change={handleFiatChange}
			/>
			<label for="fiatCheckbox" class="ml-2">Converting Fiat Currency to Digital Assets</label>
		</div>
	</FieldGroup>

	{#if $constructor.networks.ican.isFiat}
		<FieldGroup>
			<FieldGroupLabel>Fiat currency (government-issued money)</FieldGroupLabel>
			<FieldGroupText
				placeholder="e.g. CHF; EUR; USD; …"
				classValue="uppercase"
				bind:value={$constructor.networks.ican.params.fiat.value}
			/>
		</FieldGroup>
	{/if}

	<FieldGroup>
		<div class="flex items-center">
			<input
				type="checkbox"
				bind:checked={$constructor.networks.ican.isDl}
				id="expirationCheckbox"
				on:change={handleExpirationChange}
			/>
			<label for="expirationCheckbox" class="ml-2">Expiration (Deadline)</label>
		</div>
	</FieldGroup>

	{#if $constructor.networks.ican.isDl}
		<FieldGroup>
			<FieldGroupLabel>Expiration Date</FieldGroupLabel>
			<FieldGroupDateTime
				id="expirationInput"
				min={getCurrentDateTime()}
				bind:value={timeDateValue}
				bind:unixTimestamp={$constructor.networks.ican.params.dl.value}
			/>
			<FieldGroupAppendix>Value is in the local timezone. The defined breakpoint is excluded.</FieldGroupAppendix>
		</FieldGroup>
	{/if}

	<FieldGroup>
		<div class="flex items-center">
			<input
				type="checkbox"
				bind:checked={$constructor.networks.ican.isRc}
				id="recurringCheckbox"
				on:change={handleRecurringChange}
			/>
			<label for="recurringCheckbox" class="ml-2">Recurring payments</label>
		</div>
	</FieldGroup>

	{#if $constructor.networks.ican.isRc}
		<FieldGroupRadioWithNumber
			options={[
				{ name: 'Yearly', value: 'y' },
				{ name: 'Monthly', value: 'm' },
				{ name: 'Weekly', value: 'w' },
				{ name: 'Daily', value: 'd', hasNumberInput: true }
			]}
			defaultChecked={$constructor.networks.ican.params.rc.value}
			bind:outputValue={$constructor.networks.ican.params.rc.value}
		/>
	{/if}

	<FieldGroup>
		<div class="flex items-center">
			<input
				type="checkbox"
				bind:checked={$constructor.networks.ican.isSplit}
				id="splitCheckbox"
				on:change={handleSplitChange}
			/>
			<label for="splitCheckbox" class="ml-2">Transaction split</label>
		</div>
	</FieldGroup>

	{#if $constructor.networks.ican.isSplit}
		<FieldGroup>
			<FieldGroupLabel>Address / <abbr title="Name Service">NS</abbr></FieldGroupLabel>
			<FieldGroupText
			placeholder={$constructor.networks.ican.network === 'btc'
				? 'e.g. 1BvBEx…'
				: $constructor.networks.ican.network === 'eth'
				? 'e.g. 0x1abc…; name.eth'
				: $constructor.networks.ican.network === 'ltc'
				? 'e.g. LbYvAb…'
				: $constructor.networks.ican.network === 'xmr'
				? 'e.g. 4A3BcD…'
				: 'e.g. cb57bb…; name.tld'}
				bind:value={$constructor.networks.ican.params.split.address}
			/>
			<FieldGroupAppendix>The amount will be splitted and two transactions will be transmitted.</FieldGroupAppendix>
		</FieldGroup>

		<FieldGroup>
			<FieldGroupLabel>
				<div class="flex items-center">
					<span class="mr-3">Amount ({$constructor.networks.ican.params.split.isPercent ? 'Percentage' : 'Value'})</span>
					<input
						type="checkbox"
						bind:checked={$constructor.networks.ican.params.split.isPercent}
						id="splitPCheckbox"
					/>
					<label for="splitPCheckbox" class="ml-2">Percentage</label>
				</div>
			</FieldGroupLabel>

			<FieldGroupNumber
				placeholder={$constructor.networks.ican.params.split.isPercent ? 'e.g. 10%' : 'e.g. 3.14'}
				bind:value={$constructor.networks.ican.params.split.value}
				type="number"
				min={0}
				max={$constructor.networks.ican.params.split.isPercent ? 100 : undefined}
			/>
			{#if !$constructor.networks.ican.params.split.isPercent}<FieldGroupAppendix>Amount must be lower than requested amount.</FieldGroupAppendix>{/if}
		</FieldGroup>
	{/if}
</div>
