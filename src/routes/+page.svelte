<script lang="ts">
	import toast, { Toaster } from 'svelte-french-toast';

	import { Row, Box, BoxContent, BoxTitle, Page, Tabs, WalletCard, DesignContent } from '$lib/components';

	import {
		AutomatedClearingHouseConstructor,
		InternationalCryptoAccountNumberConstructor,
		BusinessIdentifierCodeConstructor,
		InternationalBankAccountNumberConstructor,
		UnifiedPaymentsInterfaceConstructor,
		PixConstructor,
		VoidPaymentTargetConstructor
	} from './components';

	import { TYPES } from '$lib/data/types.data';
	import { getObjectByType } from '$lib/helpers/get-object-by-type.helper';
	import { join } from '$lib/helpers/join.helper';
	import { Icon } from '$lib/icons';
	import { constructor } from '$lib/store/constructor.store';

	let type: ITransitionType = 'ican';
	let designEnabled: boolean = false;
	$: outputs = constructor.build(type);
	$: currentName = getObjectByType(TYPES, type).label;
	$: currentSentence = '';
	$: currentLink = '';
	$: currentShow = false;
	$: if (currentName) {
		currentSentence = `What is ${currentName}?`;
		currentLink = getObjectByType(TYPES, type)?.link || '';
		currentShow = true;
	}

	const handleOnCopy = async (ev: any) => {
		await window.navigator.clipboard.writeText(ev.currentTarget.dataset.value);

		toast.success('Copied to clipboard', {
			className: '!text-gray-50 !bg-gray-700',
			style: '--color-background: #374151'
		});
	};

	const paymentTypes = {
		ican: {
			label: getObjectByType(TYPES, 'ican')!.label,
			component: InternationalCryptoAccountNumberConstructor
		},
		iban: {
			label: getObjectByType(TYPES, 'iban')!.label,
			component: InternationalBankAccountNumberConstructor
		},
		ach: {
			label: getObjectByType(TYPES, 'ach')!.label,
			component: AutomatedClearingHouseConstructor
		},
		upi: {
			label: getObjectByType(TYPES, 'upi')!.label,
			component: UnifiedPaymentsInterfaceConstructor
		},
		pix: {
			label: getObjectByType(TYPES, 'pix')!.label,
			component: PixConstructor
		},
		bic: {
			label: getObjectByType(TYPES, 'bic')!.label,
			component: BusinessIdentifierCodeConstructor
		},
		void: {
			label: getObjectByType(TYPES, 'void')!.label,
			component: VoidPaymentTargetConstructor
		}
	};
</script>

<Toaster />

<Page>
	<Row>
		<Box>
			<BoxTitle>Payment Constructor</BoxTitle>

			<BoxContent>
				<Tabs
					bind:selectedTab={type}
					config={paymentTypes}
				/>
				<button
					class={join(
						'[ is-full bs-12 mbs-auto plb-2 pli-3 text-center text-white border border-gray-700 bg-gray-700 rounded-md transition-all duration-200 outline-none ]',
						'[ focus-visible:ring-4 focus-visible:ring-opacity-75 focus-visible:ring-green-800 focus-visible:ring-offset-green-700 focus-visible:ring-offset-2 ]',
						'[ active:scale-[.99] ]',
						'[ sm:text-sm ]'
					)}
					type="button"
					on:pointerdown={() => constructor.reset(type)}
				>
					Clear
				</button>
			</BoxContent>
		</Box>

		<Icon.Convert
			class="[ bs-10 is-10 self-center text-green-500 rotate-90 ] [ lg:block lg:rotate-0 ]"
		/>

		<Box>
			<BoxTitle>Integrations</BoxTitle>

			<BoxContent>
				<div class="[ flex flex-col gap-6 ]">
					{#each $outputs as output, index}
						<div class="[ flex flex-col items-stretch gap-2 ]">
							<label for={'value of ' + index}>{output.label}</label>
							<div
								class={join(
									'[ flex items-center justify-between ]',
									'[ relative is-full bs-12 text-start bg-gray-900 rounded-md border-none ]',
									'[ sm:text-sm ]'
								)}
							>
								<input
									class={join(
										'[ appearance-none bg-transparent border-0 is-full pie-14 ]',
										'[ focus-visible:ring-0 ]'
									)}
									type="text"
									value={output.value}
									readonly
									id={'value of ' + index}
								/>
								<button
									class={join(
										'[ flex items-center justify-between ]',
										'[ absolute inline-end-0 mli-3 p-2 text-gray-50 bg-gray-700 rounded-full outline-none transition-all duration-200 ]',
										'[ focus-visible:bg-green-900 focus-visible:text-green-50 active:scale-95 ]'
									)}
									type="button"
									title="Copy to clipboard"
									data-value={output.value}
									on:pointerdown={handleOnCopy}
								>
									<svg
										class={join('[ bs-5 is-5 ]')}
										fill="none"
										stroke="currentColor"
										stroke-width="1.5"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
										/>
									</svg>
								</button>
							</div>

							{#if output.previewable}
								<div class="[ flex flex-col items-stretch gap-3 mb-1 ]">
									<label class="[ text-gray-300 text-sm ]" for={'previewOf' + index}>
										Preview
									</label>
									<output id={'previewOf' + index}>{@html output.value}</output>
								</div>
							{/if}

							{#if output.note}
								<div class="[ flex flex-col items-stretch gap-3 mb-3 ]">
									<small class="[ -mb-1 text-gray-400 ]" id={'noteOf' + index}>
										{output.note}
									</small>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</BoxContent>
		</Box>
	</Row>
	<Row>
		<Box>
			<BoxTitle>
				<label for="designCheckbox" class="mr-2">Design</label>
				<input
					type="checkbox"
					bind:checked={designEnabled}
					id="designCheckbox"
				/>
			</BoxTitle>
			{#if designEnabled}
			<BoxContent>
				<div class="flex flex-col gap-x-6 gap-y-4 md:flex-row">
					<div class="w-full md:w-1/2">
						<WalletCard
							bind:type={type}
						/>
					</div>
					<div class="w-full md:flex-grow">
						<DesignContent />
					</div>
				</div>
			</BoxContent>
			{/if}
		</Box>
	</Row>
	<Row>
		<Box>
			<BoxTitle>Information</BoxTitle>
			<BoxContent>
				<div class="[ flex flex-col gap-2 ]">
					<div>Expanded on the specification
						<a
							class="[ transition-all duration-200 ] [ visited:text-gray-200 hover:text-gray-300 ]"
							href="https://datatracker.ietf.org/doc/html/rfc8905"
							target="_blank"
							rel="noreferrer"
						>RFC 8905</a>.
						<a
							class="[ transition-all duration-200 ] [ visited:text-gray-200 hover:text-gray-300 ]"
							href="https://github.com/bchainhub/payto/blob/master/docs/schema.md"
							target="_blank"
							rel="noreferrer"
						>Documentation</a>.
					</div>
					{#if currentShow}
						<div>
							<span class="mr-1">{currentSentence}</span>
							<span>Read more
								<a
									class="[ transition-all duration-200 ] [ visited:text-gray-200 hover:text-gray-300 ]"
									href={currentLink}
									target="_blank"
									rel="noreferrer"
								>here</a>.
							</span>
						</div>
					{/if}
					<div>
						Compatibility: Desktop - Chromium from version 121 & enabled flags (Experimental Web Platform Features); Opera; Safari. Mobile - All major browsers.
					</div>
					<div>
						Source code is located at
						<a
							class="[ transition-all duration-200 ] [ visited:text-gray-200 hover:text-gray-300 ]"
							href="https://github.com/bchainhub/Payto"
							target="_blank"
							rel="noreferrer"
						>GitHub</a>.
						Licensed under the
						<a
							class="[ transition-all duration-200 ] [ visited:text-gray-200 hover:text-gray-300 ]"
							href="https://github.com/bchainhub/core-license/blob/master/LICENSE"
							target="_blank"
							rel="noreferrer"
						>CORE License</a>.
					</div>
				</div>
			</BoxContent>
		</Box>
	</Row>
</Page>
