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
		<FieldGroupText placeholder="e.g. DE75512108001245126199" bind:value={$constructor.iban.iban} />
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>BIC-SWIFT</FieldGroupLabel>
		<FieldGroupText placeholder="e.g. DE75512108001245126199" bind:value={$constructor.iban.bic} />
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Receiver Name</FieldGroupLabel>
		<FieldGroupText
			placeholder="e.g. Julia"
			bind:value={$constructor.iban.params.receiverName.value}
		/>
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Message</FieldGroupLabel>
		<FieldGroupText
			placeholder="e.g. Hi from PAYTO"
			bind:value={$constructor.iban.params.message.value}
		/>
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Amount</FieldGroupLabel>
		<FieldGroupNumber placeholder="e.g. 7.10" bind:value={$constructor.ican.params.amount.value} />
		<FieldGroupAppendix>Empty value uses the network currency</FieldGroupAppendix>
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Currency</FieldGroupLabel>
		<FieldGroupText placeholder="e.g. XCB" bind:value={$constructor.ican.params.currency.value} />
	</FieldGroup>
</div>
