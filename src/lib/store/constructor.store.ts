import { TRANSPORT } from '$lib/data/transports.data';
import { createStore } from '$lib/helpers/create-store.helper';
import { generate } from '$lib/helpers/generate.helper';

const INITIAL_STATE = {
	ican: {
		network: TRANSPORT.ican[0].value,
		other: '',
		destination: '',
		params: {
			currency: { value: undefined },
			amount: { value: undefined }
		}
	},

	iban: {
		network: 'iban',
		iban: '',
		bic: '',
		params: {
			currency: { value: undefined },
			amount: { value: undefined },
			receiverName: { value: undefined },
			message: { value: undefined }
		}
	},

	bic: {
		network: 'bic',
		bic: '',
		params: {
			currency: { value: undefined },
			amount: { value: undefined }
		}
	},

	upi: {
		network: 'upi',
		accountAlias: '',
		params: {
			currency: { value: undefined },
			amount: { value: undefined, mandatory: true },
			receiverName: { value: undefined, mandatory: true },
			message: { value: undefined }
		}
	},

	void: {
		network: TRANSPORT.void[0].value,
		exchangePoint: { lang: '', long: '', plus: '', other: '' },
		other: '',
		params: {
			currency: { value: undefined },
			amount: { value: undefined },
			receiverName: { value: undefined },
			message: { value: undefined }
		}
	}
};

const BUILDER = {
	ican: (props: typeof INITIAL_STATE.ican) => {
		const payload: IPayload[] = [
			{
				placeholder: '<network>',
				value: encodeURIComponent(props.network === 'other' ? props.other : props.network)
			},
			{
				placeholder: '<destination>',
				value: encodeURIComponent(props.destination)
			}
		];

		return generate('ican', props, payload);
	},

	iban: (props: typeof INITIAL_STATE.iban) => {
		const payload: IPayload[] = [
			{
				placeholder: '<network>',
				value: encodeURIComponent(props.network)
			},
			{
				placeholder: '<bic-swift>',
				value: props.bic ? encodeURIComponent(props.bic) : undefined
			},
			{
				placeholder: '<iban>',
				value: encodeURIComponent(props.iban)
			}
		];

		return generate('iban', props, payload);
	},

	bic: (props: typeof INITIAL_STATE.bic) => {
		const payload: IPayload[] = [
			{
				placeholder: '<network>',
				value: encodeURIComponent(props.network)
			},
			{
				placeholder: '<bic>',
				value: encodeURIComponent(props.bic)
			}
		];

		return generate('bic', props, payload);
	},

	upi: (props: typeof INITIAL_STATE.upi) => {
		const payload: IPayload[] = [
			{
				placeholder: '<network>',
				value: encodeURIComponent(props.network)
			},
			{
				placeholder: '<account-alias>',
				value: encodeURIComponent(props.accountAlias)
			}
		];

		return generate('upi', props, payload);
	},

	void: (props: typeof INITIAL_STATE.void) => {
		let point = '';

		if (
			props.network === 'geodd' &&
			props.exchangePoint.lang !== '' &&
			props.exchangePoint.long !== ''
		) {
			point = `${props.exchangePoint.lang}:${props.exchangePoint.long}`;
		}
		if (props.network === 'plus') {
			point = props.exchangePoint.plus;
		}
		if (props.network === 'other') {
			point = props.exchangePoint.other;
		}

		const payload: IPayload[] = [
			{
				placeholder: '<network>',
				value: encodeURIComponent(props.network === 'other' ? props.other : props.network)
			},
			{
				placeholder: '<exchange-point>',
				value: encodeURIComponent(point)
			}
		];

		return generate('void', props, payload);
	}
};

export const constructor = createStore(INITIAL_STATE, BUILDER);