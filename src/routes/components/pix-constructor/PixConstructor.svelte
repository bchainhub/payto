<script lang="ts">
	import {
		FieldGroup,
		FieldGroupLabel,
		FieldGroupText,
		FieldGroupNumber,
		FieldGroupRadioWithNumber,
	} from '$lib/components';

	import { constructor } from '$lib/store/constructor.store';
	import { fly } from 'svelte/transition';

	function handleIdChange() {
		if (!$constructor.networks.pix.isId) {
			$constructor.networks.pix.params.id.value = undefined;
		}
	}

	function handleDescChange() {
		if (!$constructor.networks.pix.isDesc) {
			$constructor.networks.pix.params.message.value = undefined;
		}
	}

	function handleRecurringChange() {
		if (!$constructor.networks.pix.isRc) {
			$constructor.networks.pix.params.rc.value = undefined;
		}
	}
</script>

<div class="[ flex flex-col gap-6 ]" in:fly={{ y: 64 }}>
	<FieldGroup>
		<FieldGroupLabel>Account Alias *</FieldGroupLabel>
		<FieldGroupText
			placeholder="e.g. john.doe@gmail.com"
			bind:value={$constructor.networks.pix.accountAlias}
		/>
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Beneficiary Full Name *</FieldGroupLabel>
		<FieldGroupText
			placeholder="e.g. John Doe"
			bind:value={$constructor.networks.pix.params.receiverName.value}
		/>
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Amount *</FieldGroupLabel>
		<FieldGroupNumber
			placeholder="e.g. 3.14"
			bind:value={$constructor.networks.pix.params.amount.value}
		/>
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Fiat currency (BRL default)</FieldGroupLabel>
		<FieldGroupText
			placeholder="e.g. CHF; EUR; USD; …"
			classValue="uppercase"
			bind:value={$constructor.networks.pix.params.currency.value}
		/>
	</FieldGroup>

	<div class="flex items-center">
		<input
			type="checkbox"
			bind:checked={$constructor.networks.pix.isId}
			id="idCheckbox"
			on:change={handleIdChange}
		/>
		<label for="idCheckbox" class="ml-2">Transaction ID</label>
	</div>
	{#if $constructor.networks.pix.isId}
		<FieldGroup>
			<FieldGroupLabel>Transaction ID</FieldGroupLabel>
			<FieldGroupText
				placeholder="e.g. ID001"
				bind:value={$constructor.networks.pix.params.id.value}
			/>
		</FieldGroup>
	{/if}

	<div class="flex items-center">
		<input
			type="checkbox"
			bind:checked={$constructor.networks.pix.isDesc}
			id="descCheckbox"
			on:change={handleDescChange}
		/>
		<label for="descCheckbox" class="ml-2">Description</label>
	</div>
	{#if $constructor.networks.pix.isDesc}
		<FieldGroup>
			<FieldGroupLabel>Description</FieldGroupLabel>
			<FieldGroupText
				placeholder="e.g. Payment for services"
				bind:value={$constructor.networks.pix.params.message.value}
			/>
		</FieldGroup>
	{/if}

	<FieldGroup>
		<div class="flex items-center">
			<input
				type="checkbox"
				bind:checked={$constructor.networks.pix.isRc}
				id="recurringCheckbox"
				on:change={handleRecurringChange}
			/>
			<label for="recurringCheckbox" class="ml-2">Recurring payments</label>
		</div>
	</FieldGroup>

	{#if $constructor.networks.pix.isRc}
		<FieldGroupRadioWithNumber
			options={[
				{ name: 'Yearly', value: 'y' },
				{ name: 'Monthly', value: 'm' },
				{ name: 'Weekly', value: 'w' },
				{ name: 'Daily', value: 'd', hasNumberInput: true }
			]}
			defaultChecked={$constructor.networks.pix.params.rc.value}
			bind:outputValue={$constructor.networks.pix.params.rc.value} />
	{/if}
</div>
