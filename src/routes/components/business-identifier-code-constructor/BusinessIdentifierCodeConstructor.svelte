<script lang="ts">
	import { join } from '$lib/helpers/join.helper';
	import { constructor } from '$lib/store/constructor.store';
	import { fly } from 'svelte/transition';
</script>

<div class="[ flex flex-col gap-6 ]" in:fly={{ y: 64 }}>
	<div class={join('[ flex flex-col items-stretch gap-2 ]')}>
		<label id="bic-label" for="bic">BIC / SWIFT</label>
		<input
			class={join(
				'[ is-full bs-12 plb-2 pli-3 text-start bg-gray-900 rounded-md border-none caret-teal-500 ]',
				'[ focus:outline-none focus-visible:ring-4 focus-visible:ring-opacity-75 focus-visible:ring-green-800 focus-visible:ring-offset-green-700 focus-visible:ring-offset-2 ]',
				'[ sm:text-sm ]'
			)}
			type="text"
			id="bic"
			placeholder="e.g. DABADKKK"
			autocomplete="off"
			aria-labelledby="bic-label"
			bind:value={$constructor.bic.bic}
		/>
	</div>

	<div class={join('[ flex flex-col items-stretch gap-2 ]')}>
		<label id="amount-label" for="amount">Amount</label>
		<input
			class={join(
				'[ is-full bs-12 plb-2 pli-3 text-start bg-gray-900 rounded-md border-none caret-teal-500 ]',
				'[ focus:outline-none focus-visible:ring-4 focus-visible:ring-opacity-75 focus-visible:ring-green-800 focus-visible:ring-offset-green-700 focus-visible:ring-offset-2 ]',
				'[ sm:text-sm ]'
			)}
			type="text"
			id="amount"
			placeholder="e.g. 3.14"
			aria-labelledby="amount-label"
			bind:value={$constructor.bic.params.amount.value}
		/>
	</div>

	<div class={join('[ flex flex-col items-stretch gap-2 ]')}>
		<label id="currency-label" for="currency">FIAT Currency</label>
		<input
			class={join(
				'[ is-full bs-12 plb-2 pli-3 text-start bg-gray-900 rounded-md border-none caret-teal-500 ]',
				'[ focus:outline-none focus-visible:ring-4 focus-visible:ring-opacity-75 focus-visible:ring-green-800 focus-visible:ring-offset-green-700 focus-visible:ring-offset-2 ]',
				'[ sm:text-sm ]'
			)}
			type="text"
			id="currency"
			placeholder="e.g. USD; EUR"
			autocomplete="off"
			aria-labelledby="currency-label"
			bind:value={$constructor.bic.params.currency.value}
		/>
		<small class="[ -mbs-1 text-gray-400 ]">Empty value uses the default network currency.</small>
	</div>
</div>
