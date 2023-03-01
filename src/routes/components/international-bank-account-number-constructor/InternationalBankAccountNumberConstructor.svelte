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
		<FieldGroupLabel>IBAN *</FieldGroupLabel>
		<FieldGroupText placeholder="e.g. IE12BOFI90000112345678" bind:value={$constructor.iban.iban} />
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>BIC / SWIFT</FieldGroupLabel>
		<FieldGroupText placeholder="e.g. DABADKKK" bind:value={$constructor.iban.bic} />
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Beneficiary Full Name</FieldGroupLabel>
		<FieldGroupText
			placeholder="e.g. John Doe"
			bind:value={$constructor.iban.params.receiverName.value}
		/>
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Message for Beneficiary</FieldGroupLabel>
		<FieldGroupText
			placeholder="e.g. ID001"
			bind:value={$constructor.iban.params.message.value}
		/>
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Amount</FieldGroupLabel>
		<FieldGroupNumber placeholder="e.g. 3.14" bind:value={$constructor.iban.params.amount.value} />
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>FIAT Currency</FieldGroupLabel>
		<FieldGroupText placeholder="e.g. USD; EUR" bind:value={$constructor.iban.params.currency.value} />
		<FieldGroupAppendix>Empty value uses the default network currency.</FieldGroupAppendix>
	</FieldGroup>
</div>
