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
	import { constructor } from '$lib/store/constructor.store';
	import { fade, fly } from 'svelte/transition';

	let timeDateValue = '';
	let classUpperValue = $constructor.networks.ican.params?.currency?.value?.toLowerCase()?.startsWith('0x') ? '' : 'uppercase';
	let tokens = TRANSPORT.ican.find(item => item.value === $constructor.networks.ican.network)?.tokens;

	function getCurrentDateTime() {
		const now = new Date();
		return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
	}

	function handleFiatChange() {
		if (!$constructor.networks.ican.isFiat) {
			$constructor.networks.ican.params.fiat.value = undefined;
		}
	}

	function handleSwapChange() {
		if (!$constructor.networks.ican.isSwap) {
			$constructor.networks.ican.params.swap.value = undefined;
		}
	}

	function handleSplitChange() {
		if (!$constructor.networks.ican.isSplit) {
			Object.assign($constructor.networks.ican.params.split, { isPercent: undefined, value: undefined, address: undefined });
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

	function getPlaceholder(network: string): string {
		switch (network) {
			case 'btc': return 'e.g. 1BvBEx…';
			case 'eth': return 'e.g. 0x1abc…; name.eth';
			case 'ltc': return 'e.g. LbYvAb…';
			case 'xmr': return 'e.g. 4A3BcD…';
			default: return 'e.g. cb57bb…; name.tld';
		}
	}
</script>

<div class="[ flex flex-col gap-6 ]" in:fly={{ y: 64 }}>
	<div class="[ flex flex-col items-stretch gap-2 ]">
		<label id="transport-network-label" for="transport-network">Transport Network *</label>
		<div class="[ flex flex-col items-stretch gap-4 ]">
			{#if $constructor.networks.ican.network !== 'other'}
				<div in:fade>
					<Listbox id="transport-network" bind:value={$constructor.networks.ican.network} items={TRANSPORT.ican} />
				</div>
			{:else}
				<div class="[ flex items-center relative ]" in:fade>
					<button
						class="[ absolute mli-3 p-2 text-gray-50 bg-gray-700 rounded-full outline-none transition-all ]"
						title="Back to network menu options"
						on:pointerdown={() => ($constructor.networks.ican.network = 'xcb')}
					>
						<svg class="[ bs-4 is-4 ]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
						</svg>
					</button>
					<input
						class="[ is-full bs-12 plb-2 pis-14 pie-3 text-start bg-gray-900 rounded-md border-none caret-teal-500 ]"
						type="text"
						id="transport-network"
						placeholder="Other network"
						bind:value={$constructor.networks.ican.other}
					/>
				</div>
			{/if}
		</div>
	</div>

	<FieldGroup>
		<FieldGroupLabel>Address / <abbr title="Name Service">NS</abbr> *</FieldGroupLabel>
		<FieldGroupText
			placeholder={getPlaceholder($constructor.networks.ican.network)}
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
		<FieldGroupNumber placeholder="e.g. 3.14" bind:value={$constructor.networks.ican.params.amount.value} />
	</FieldGroup>

	{#if ['eth', 'other'].includes($constructor.networks.ican.network)}
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
			<label for="fiatCheckbox" class="ml-2">Convert Fiat to Digital Assets</label>
		</div>
	</FieldGroup>

	{#if $constructor.networks.ican.isFiat}
		<FieldGroup>
			<FieldGroupLabel>Fiat Currency</FieldGroupLabel>
			<FieldGroupText
				placeholder="e.g. USD"
				classValue="uppercase"
				bind:value={$constructor.networks.ican.params.fiat.value}
			/>
		</FieldGroup>
	{/if}

	<FieldGroup>
		<div class="flex items-center">
			<input
				type="checkbox"
				bind:checked={$constructor.networks.ican.isSwap}
				id="swapCheckbox"
				on:change={handleSwapChange}
			/>
			<label for="swapCheckbox" class="ml-2">Swap</label>
		</div>
	</FieldGroup>

	{#if $constructor.networks.ican.isSwap}
		<FieldGroup>
			<FieldGroupLabel>Asset to receive</FieldGroupLabel>
			<FieldGroupText
				placeholder="e.g. USDC"
				classValue="uppercase"
				bind:value={$constructor.networks.ican.params.swap.value}
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
			<label for="expirationCheckbox" class="ml-2">Expiration</label>
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
			<label for="recurringCheckbox" class="ml-2">Recurring Payments</label>
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
			<label for="splitCheckbox" class="ml-2">Transaction Split</label>
		</div>
	</FieldGroup>

	{#if $constructor.networks.ican.isSplit}
		<FieldGroup>
			<FieldGroupLabel>Split Address / <abbr title="Name Service">NS</abbr></FieldGroupLabel>
			<FieldGroupText
				placeholder={getPlaceholder($constructor.networks.ican.network)}
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
