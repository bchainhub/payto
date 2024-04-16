<script lang="ts">
	import {
		FieldGroup,
		FieldGroupLabel,
		FieldGroupText,
		FieldGroupNumber,
		FieldGroupAppendix,
	} from '$lib/components';
	import { constructor } from '$lib/store/constructor.store';
	import { fly } from 'svelte/transition';
</script>

<div class="[ flex flex-col gap-6 ]" in:fly={{ y: 64 }}>

	<FieldGroup>
		<FieldGroupLabel>BIC / SWIFT / ORIC *</FieldGroupLabel>
		<FieldGroupText
			placeholder="e.g. DABADKKK"
			bind:value={$constructor.networks.bic.bic}
		/>
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Amount *</FieldGroupLabel>
		<FieldGroupNumber
			placeholder="e.g. 3.14"
			bind:value={$constructor.networks.bic.params.amount.value}
		/>
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Fiat currency *</FieldGroupLabel>
		<FieldGroupText
			placeholder="e.g. CHF; EUR; USD"
			classValue="uppercase"
			bind:value={$constructor.networks.bic.params.currency.value}
		/>
		<FieldGroupAppendix>Empty value uses the default network currency.</FieldGroupAppendix>
	</FieldGroup>

</div>
