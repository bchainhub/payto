<script lang="ts">
	import {
		FieldGroup,
		FieldGroupColorPicker,
		FieldGroupLabel,
		FieldGroupText,
		Listbox
	} from '$lib/components';

	import { constructor } from '$lib/store/constructor.store';
	import { calculateColorDistance } from '$lib/helpers/euclidean-distance.helper';
	import { join } from '$lib/helpers/join.helper';

	const barcodeTypes = [
		{ label: 'QR Code', value: 'qr', ticker: 'QR' },
		{ label: 'PDF 417', value: 'pdf417', ticker: 'PDF' },
		{ label: 'Aztec', value: 'aztec', ticker: 'Aztec' }
	];

	$: distance = Math.floor(calculateColorDistance($constructor.design.colorF || '#192a14', $constructor.design.colorB || '#77bc65'));
</script>

<div class="[ flex flex-col gap-6 ]">
	<FieldGroup>
		<FieldGroupLabel>Company Name</FieldGroupLabel>
		<FieldGroupText
			placeholder="Acme Corporation"
			bind:value={$constructor.design.org}
			maxlength="25"
		/>
	</FieldGroup>

	<FieldGroup>
		<FieldGroupLabel>Item Name</FieldGroupLabel>
		<FieldGroupText
			placeholder="Payment for…"
			bind:value={$constructor.design.item}
			maxlength="40"
		/>
	</FieldGroup>

	<div class="[ flex flex-col gap-6 ]">Theme setup:</div>

	<div>Current Color Euclidean distance: <span class:text-red-500={distance < 100}>{distance}</span></div>

	<FieldGroup flexType="row" itemPosition="items-center">
		<FieldGroupColorPicker
			label="Foreground Color"
			bind:value={$constructor.design.colorF}
		/>
	</FieldGroup>

	<FieldGroup flexType="row" itemPosition="items-center">
		<FieldGroupColorPicker
			label="Background Color"
			bind:value={$constructor.design.colorB}
		/>
	</FieldGroup>

	<div class="[ flex flex-col ]"><small class="[ -mb-1 text-gray-400 ]">Note: Similar Colors will not be accepted - the minimum Euclidean distance is 100.</small></div>

	<FieldGroup>
		<FieldGroupLabel>Barcode type (QR code as default)</FieldGroupLabel>
		<Listbox bind:value={$constructor.design.barcode} items={barcodeTypes} />
	</FieldGroup>

	<button
		class={join(
			'[ is-full bs-12 mbs-auto plb-2 pli-3 text-center text-white border border-gray-700 bg-gray-700 rounded-md transition-all duration-200 outline-none ]',
			'[ focus-visible:ring-4 focus-visible:ring-opacity-75 focus-visible:ring-green-800 focus-visible:ring-offset-green-700 focus-visible:ring-offset-2 ]',
			'[ active:scale-[.99] ]',
			'[ sm:text-sm ]'
		)}
		type="button"
		on:pointerdown={() => constructor.resetDesign()}
	>
		Clear
	</button>

</div>
