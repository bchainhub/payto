<script lang="ts">
	import ExchNumberFormat from 'exchange-rounding';
	import { constructor } from '$lib/store/constructor.store';
	import { getAddress } from '$lib/helpers/get-address.helper';
	import { getCurrency } from '$lib/helpers/get-currency.helper';
	import { getNetwork } from '$lib/helpers/get-network.helper';

	export let type: ITransitionType = 'ican';

	const iconLogoSize: string = 'h-10 w-10';
	const nfcLogoColor: string = '#FFFFFF';
	const rtl: boolean = false;

	$: amount = $constructor.networks[type].params.amount.value ?? undefined;
	$: address = $constructor.networks && $constructor.networks[type] ? getAddress($constructor.networks[type], type) : undefined;

	$: colorB = $constructor.design.colorB ? $constructor.design.colorB : '#77bc65';
	$: colorF = $constructor.design.colorF ? $constructor.design.colorF : '#192a14';
	$: org = $constructor.design.org;
	$: orgImg = ""; // TODO: NFT of the requestor's wallet
	$: item = $constructor.design.item;
	$: barcode = $constructor.design.barcode ? $constructor.design.barcode : 'qr';
	$: isRecurring = $constructor.networks[type].isRc ? true : false;
	$: recurring = ($constructor.networks[type].params.rc.value as string | undefined) ?? '';
	$: other = $constructor.networks[type].other ?? undefined;
	$: paymentNetwork = getNetwork($constructor.networks[type], type, true);

	let locVal: string | undefined = undefined;
	$: if (type === 'void' && (paymentNetwork === 'geo' || paymentNetwork === 'plus')) {
		if (paymentNetwork === 'geo') {
			if ($constructor.networks[type].params.loc.lat && $constructor.networks[type].params.loc.lon) {
				locVal = 'geo:' + $constructor.networks[type].params.loc.value.replace(":", ",");
			} else {
				locVal = undefined;
			}
		} else if (paymentNetwork === 'plus') {
			if ($constructor.networks[type].params.loc.plus) {
				locVal = 'comgooglemaps://?q=' + $constructor.networks[type].params.loc.value;
			} else {
				locVal = undefined;
			}
		}
	}

	$: formatter = new ExchNumberFormat(undefined, {
		style: 'currency',
		currency: getCurrency($constructor.networks[type], type),
		currencyDisplay: 'symbol'
	});

	$: formattedAmount = formatter.format(amount as number);

	$: barcodeValue = paymentNetwork ?
		(other ?
			`${type.toUpperCase()}:${other.toUpperCase()}${formatAdr(address)}` :
			`${type.toUpperCase()}:${paymentNetwork.toUpperCase()}${formatAdr(address)}`) :
		`${type.toUpperCase()}${formatAdr(address)}`;

	function formatAdr(str: string | undefined) {
		if (str) {
			let formattedStr = str.length > 8
			? str.substring(0, 4) + '…' + str.substring(str.length - 4)
			: str;
			return '/' + formattedStr.toUpperCase();
		} else {
			return '';
		}
	}
</script>

<div>

	<div class="card rounded-lg shadow-md font-medium" style="background-color: {colorB}; color: {colorF};">
		{#if rtl}
			<div class="flex items-center p-4">
				<div class="flex-grow flex justify-between items-center">
					<div class="text-left">
							<div class="text-sm uppercase">Payment</div>
							<div class="font-semibold">{isRecurring ? recurring + ' / Recurring' : 'One‑time'}</div>
					</div>
					<span class="text-l font-medium" style="color: {colorF};">
						{#if org}
							{org}
						{:else}
							Acme Corporation
						{/if}
					</span>
				</div>
				{#if orgImg}
					<img src={orgImg} alt={org} class="ml-4" style="max-width: 32px; max-height: 32px;" />
				{/if}
			</div>
		{:else}
			<div class="flex items-center p-4">
				{#if orgImg}
					<img src={orgImg} alt={org} class="mr-4" style="max-width: 32px; max-height: 32px;" />
				{/if}
				<div class="flex-grow flex justify-between items-center">
					<span class="text-l font-medium" style="color: {colorF};">
						{#if org}
							{org}
						{:else}
							Acme Corporation
						{/if}
					</span>
					<div class="text-right">
						<div class="text-sm uppercase">Payment</div>
						<div class="font-semibold">{isRecurring ? 'Recurring / ' + recurring : 'One‑time'}</div>
					</div>
				</div>
			</div>
		{/if}

		<div class="flex items-center mb-7 pt-12 pb-12 justify-center" style="background-color: {colorF}; color: {colorB}; width: 100%;">
			<div class="flex items-center ml-12 mr-12">
				<div class="text-2xl font-medium text-wrap" style="color: {colorB};">
					{#if amount && Number(amount)>0}
						{formattedAmount}
					{:else}
						Custom Amount
					{/if}
				</div>
			</div>
		</div>

		<div class="m-4">
			<div class="flex justify-between items-center mb-2">
				<div class={`${rtl ? 'text-right' : 'text-left'} w-full`}>
					<div class="text-sm">Payment type</div>
					<div class="text-xl font-semibold">{(type === 'void' ? 'CASH' : type.toUpperCase()) + (paymentNetwork ? ': ' + paymentNetwork.toUpperCase() : '')}</div>
				</div>
			</div>
			{#if item}
				<div class="flex justify-between items-center mb-2">
					<div class={`${rtl ? 'text-right' : 'text-left'} w-full`}>
						<div class="text-sm">Item</div>
						<div class="text-xl font-semibold break-words">
							{item}
						</div>
					</div>
				</div>
			{/if}
			{#if type === 'void' && (paymentNetwork === 'geo' || paymentNetwork === 'plus')}
				<div class="flex justify-between items-center mb-2">
					<div class={`${rtl ? 'text-right' : 'text-left'} w-full`}>
						<div class="text-sm">Navigate</div>
						<div class="text-xl font-semibold break-words">
							<a
								class={`[ transition-all duration-200 ] [ visited:text-gray-200 hover:text-gray-300 ] [ ${locVal ? 'cursor-pointer' : 'cursor-not-allowed' } ]`}
								style="color: {colorF};"
								href={locVal}
								target="_blank"
								rel="noreferrer"
							>Open the navigation</a>
						</div>
					</div>
				</div>
			{/if}
		</div>


		<div class="flex justify-center items-center m-4 mt-5">
			<div class="p-4 rounded-lg inline-flex justify-center items-center" style="background-color: white;">
				<div class="text-center">
					{#if barcode === 'qr'}
						<img alt={barcode} class="block mx-auto" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAIAAAAiOjnJAAAEtGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgdGlmZjpJbWFnZUxlbmd0aD0iMjAwIgogICB0aWZmOkltYWdlV2lkdGg9IjIwMCIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iNzIvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iNzIvMSIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjIwMCIKICAgZXhpZjpQaXhlbFlEaW1lbnNpb249IjIwMCIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIgogICBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiCiAgIHhtcDpNb2RpZnlEYXRlPSIyMDI0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" />
					{:else if barcode === 'pdf417'}
						<img alt={barcode} class="block mx-auto" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABMCAIAAACnG28HAAAEsmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgdGlmZjpJbWFnZUxlbmd0aD0iNzYiCiAgIHRpZmY6SW1hZ2VXaWR0aD0iMjAwIgogICB0aWZmOlJlc29sdXRpb25Vbml0PSIyIgogICB0aWZmOlhSZXNvbHV0aW9uPSI5Ni8xIgogICB0aWZmOllSZXNvbHV0aW9uPSI5Ni8xIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMjAwIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iNzYiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB4bXA6TW9kaWZ5RGF0ZT0iMjAyNC0w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" />
					{:else if barcode === 'aztec'}
						<img alt={barcode} class="block mx-auto" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8CAIAAAAkfEPpAAAEtGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgdGlmZjpJbWFnZUxlbmd0aD0iMTI0IgogICB0aWZmOkltYWdlV2lkdGg9IjEyNCIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iOTYvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iOTYvMSIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjEyNCIKICAgZXhpZjpQaXhlbFlEaW1lbnNpb249IjEyNCIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIgogICBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiCiAgIHhtcDpNb2RpZnlEYXRlPSIyMDI0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" />
					{/if}
					<div class="text-sm mt-2 text-black">{barcodeValue}</div>
				</div>
			</div>
		</div>

		<div class={`flex ${rtl ? 'flex-row-reverse justify-between' : 'justify-between'} items-center p-4`}>
			<div class={`${iconLogoSize} h-10 w-10 rounded-lg flex justify-center items-center`} style="background-color: {colorF}; color: {colorB}; cursor: not-allowed;">
				POS
			</div>
			<svg viewBox="0 0 36 40" xmlns="http://www.w3.org/2000/svg" style="fill-rule:evenodd; clip-rule:evenodd; stroke-linejoin:round; stroke-miterlimit:2; width:38px; height:40px; fill:{colorF}; cursor: not-allowed;">
				<path d="M29.608,0.832c4.694,9.378 4.407,18.245 4.37,19.181c0.037,0.815 0.324,9.694 -4.37,19.072c-0,0 -1.223,1.407 -3.04,0.563c-1.816,-0.844 -1.188,-3.093 -1.188,-3.093c0,0 3.804,-7.388 3.704,-16.462l0.001,-0.141c0.099,-9.075 -3.705,-16.59 -3.705,-16.59c0,0 -0.628,-2.249 1.188,-3.093c1.817,-0.843 3.04,0.563 3.04,0.563Zm-9.105,4.217c3.829,7.03 3.569,14.028 3.532,14.964c0.037,0.815 0.297,7.531 -3.527,15.129c0,0 -1.222,1.406 -3.039,0.563c-1.817,-0.844 -1.188,-3.093 -1.188,-3.093c0,-0 2.461,-3.522 2.86,-12.519l0.002,-0.141c-0.261,-8.998 -2.867,-12.372 -2.867,-12.372c0,0 -0.629,-2.249 1.188,-3.093c1.816,-0.844 3.039,0.562 3.039,0.562Zm-12.743,9.073c3.202,0 5.802,2.615 5.802,5.837c-0,3.221 -2.6,5.837 -5.802,5.837c-3.202,-0 -5.802,-2.616 -5.802,-5.837c-0,-3.222 2.6,-5.837 5.802,-5.837Z" style="fill-rule:nonzero;"/>
			</svg>
		</div>
	</div>

	<div class="mt-3"><small class="[ -mb-1 text-gray-400 ]">Note: This is a preview of the design for Payto transfers, compatible with Apple Wallet layout guidelines. The barcode is a static example.</small></div>

</div>
