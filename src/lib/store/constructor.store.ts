import { TRANSPORT } from '$lib/data/transports.data';
import { createStore } from '$lib/helpers/create-store.helper';
import { generate } from '$lib/helpers/generate.helper';

const INITIAL_STATE = {
	ican: {
		network: TRANSPORT.ican[0].value,
		other: '',
		destination: '',
		chain: '',
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

	upi: {
		network: 'upi',
		accountAlias: '',
		params: {
			currency: { value: undefined },
			amount: { value: undefined },
			receiverName: { value: undefined },
			message: { value: undefined }
		}
	},

	ach: {
		network: 'ach',
		routingNumber: '',
		accountNumber: '',
		params: {
			currency: { value: undefined },
			amount: { value: undefined },
			receiverName: { value: undefined }
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
				placeholder: '',
				value: encodeURIComponent(props.network === 'other' ? props.other : props.network)
			},
			{
				placeholder: '',
				value: props.destination && props.chain && (props.network === 'eth' || props.network === 'other') > 0
				? encodeURIComponent(props.destination) + '@' + encodeURIComponent(props.chain)
				: encodeURIComponent(props.destination)
			}
		];

		return generate('ican', props, payload);
	},

	iban: (props: typeof INITIAL_STATE.iban) => {
		const payload: IPayload[] = [
			{
				placeholder: '',
				value: encodeURIComponent(props.network)
			},
			{
				placeholder: '',
				value: props.bic ? encodeURIComponent(props.bic) : undefined
			},
			{
				placeholder: '',
				value: encodeURIComponent(props.iban)
			}
		];

		return generate('iban', props, payload);
	},

	upi: (props: typeof INITIAL_STATE.upi) => {
		const payload: IPayload[] = [
			{
				placeholder: '',
				value: encodeURIComponent(props.network)
			},
			{
				placeholder: '',
				value: encodeURI(props.accountAlias)
			}
		];

		return generate('upi', props, payload);
	},

	ach: (props: typeof INITIAL_STATE.ach) => {
		const payload: IPayload[] = [
			{
				placeholder: '',
				value: encodeURIComponent(props.network)
			},
			{
				placeholder: '',
				value: /^\d+$/.test(props.routingNumber) ? props.routingNumber : undefined
			},
			{
				placeholder: '',
				value: /^\d+$/.test(props.accountNumber) ? props.accountNumber : undefined
			}
		];

		return generate('ach', props, payload);
	},

	bic: (props: typeof INITIAL_STATE.bic) => {
		const payload: IPayload[] = [
			{
				placeholder: '',
				value: encodeURIComponent(props.network)
			},
			{
				placeholder: '',
				value: encodeURIComponent(props.bic)
			}
		];

		return generate('bic', props, payload);
	},

	void: (props: typeof INITIAL_STATE.void) => {
		let point = '';

		if (
			props.network === 'geo' &&
			props.exchangePoint.lang !== '' &&
			props.exchangePoint.long !== ''
		) {
			point = `${props.exchangePoint.lang}:${props.exchangePoint.long}`;
		}
		if (props.network === 'plus') {
			point = props.exchangePoint.plus.toUpperCase();
		}
		if (props.network === 'other') {
			point = props.exchangePoint.other;
		}

		const payload: IPayload[] = [
			{
				placeholder: '',
				value: encodeURIComponent(props.network === 'other' ? props.other : props.network)
			},
			{
				placeholder: '',
				value: encodeURI(point)
			}
		];

		return generate('void', props, payload);
	}
};

export const constructor = createStore(INITIAL_STATE, BUILDER);
