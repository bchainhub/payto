<script lang="ts">
	import {
		FieldGroup,
		FieldGroupAppendix,
		FieldGroupLabel,
		FieldGroupNumber,
		FieldGroupText
	} from '$lib/components';

	import { constructor } from '$lib/store/constructor.store';
	import { fly } from 'svelte/transition';
</script>

<div class="[ flex flex-col gap-6 ]" in:fly={{ y: 64 }}>
	<FieldGroup>
		<FieldGroupLabel>Account Number *</FieldGroupLabel>
		<FieldGroupText
			placeholder="e.g. 000123456789"
			bind:value={$constructor.ach.accountNumber}
		/>
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Routing Number *</FieldGroupLabel>
		<FieldGroupText
			placeholder="e.g. 110000000"
			bind:value={$constructor.ach.routingNumber}
		/>
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Beneficiary Full Name</FieldGroupLabel>
		<FieldGroupText
			placeholder="e.g. John Doe"
			bind:value={$constructor.ach.params.receiverName.value}
		/>
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Amount</FieldGroupLabel>
		<FieldGroupNumber placeholder="e.g. 3.14" bind:value={$constructor.ach.params.amount.value} />
		<FieldGroupAppendix>Value in main currency and fractional part (cents).</FieldGroupAppendix>
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Fiat currency</FieldGroupLabel>
		<FieldGroupText placeholder="e.g. USD" bind:value={$constructor.ach.params.currency.value} />
		<FieldGroupAppendix>Empty value uses the default network currency.</FieldGroupAppendix>
	</FieldGroup>
</div>
