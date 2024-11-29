<script lang="ts">
	import {
		FieldGroup,
		FieldGroupAppendix,
		FieldGroupLabel,
		FieldGroupNumber,
		FieldGroupText,
		FieldGroupRadioWithNumber,
	} from '$lib/components';

	import { constructor } from '$lib/store/constructor.store';
	import { fly } from 'svelte/transition';

	function handleRecurringChange() {
		if (!$constructor.networks.ach.isRc) {
			$constructor.networks.ach.params.rc.value = undefined;
		}
	}
</script>

<div class="[ flex flex-col gap-6 ]" in:fly={{ y: 64 }}>
	<FieldGroup>
		<FieldGroupLabel>Account Number *</FieldGroupLabel>
		<FieldGroupText
			placeholder="e.g. 000123456789"
			bind:value={$constructor.networks.ach.accountNumber}
		/>
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Routing Number *</FieldGroupLabel>
		<FieldGroupText
			placeholder="e.g. 110000000"
			bind:value={$constructor.networks.ach.routingNumber}
		/>
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Beneficiary Full Name</FieldGroupLabel>
		<FieldGroupText
			placeholder="e.g. John Doe"
			bind:value={$constructor.networks.ach.params.receiverName.value}
		/>
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Amount</FieldGroupLabel>
		<FieldGroupNumber
			placeholder="e.g. 3.14"
			bind:value={$constructor.networks.ach.params.amount.value}
		/>
		<FieldGroupAppendix>Value in main currency and fractional part (cents).</FieldGroupAppendix>
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Fiat currency</FieldGroupLabel>
		<FieldGroupText
			placeholder="e.g. USD"
			classValue="uppercase"
			bind:value={$constructor.networks.ach.params.currency.value}
		/>
		<FieldGroupAppendix>Empty value uses the default network currency.</FieldGroupAppendix>
	</FieldGroup>

	<FieldGroup>
		<div class="flex items-center">
			<input
				type="checkbox"
				bind:checked={$constructor.networks.ach.isRc}
				id="recurringCheckbox"
				on:change={handleRecurringChange}
			/>
			<label for="recurringCheckbox" class="ml-2">Recurring payments</label>
		</div>
	</FieldGroup>

	{#if $constructor.networks.ach.isRc}
		<FieldGroupRadioWithNumber
			options={[
				{ name: 'Yearly', value: 'y' },
				{ name: 'Monthly', value: 'm' },
				{ name: 'Weekly', value: 'w' },
				{ name: 'Daily', value: 'd', hasNumberInput: true }
			]}
			defaultChecked={$constructor.networks.ach.params.rc.value}
			bind:outputValue={$constructor.networks.ach.params.rc.value}
		/>
	{/if}
</div>
