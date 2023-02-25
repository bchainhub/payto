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
		<FieldGroupLabel>Account Alias *</FieldGroupLabel>
		<FieldGroupText
			placeholder="e.g. julia@example.com"
			bind:value={$constructor.upi.accountAlias}
		/>
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Receiver Name *</FieldGroupLabel>
		<FieldGroupText
			placeholder="e.g. Julia"
			bind:value={$constructor.upi.params.receiverName.value}
		/>
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Message</FieldGroupLabel>
		<FieldGroupText
			placeholder="e.g. Hi from PAYTO"
			bind:value={$constructor.upi.params.message.value}
		/>
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Amount</FieldGroupLabel>
		<FieldGroupNumber placeholder="e.g. 7.10" bind:value={$constructor.upi.params.amount.value} />
		<FieldGroupAppendix>Empty value uses the network currency</FieldGroupAppendix>
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Currency</FieldGroupLabel>
		<FieldGroupText placeholder="e.g. XCB" bind:value={$constructor.upi.params.currency.value} />
	</FieldGroup>
</div>
