import { TRANSPORT } from '$lib/data/transports.data';
import { createStore } from '$lib/helpers/create-store.helper';
import { generate } from '$lib/helpers/generate.helper';
import { checkValidity } from '$lib/helpers/check-validity.helper';

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
		network: TRANSPORT.iban[0].value,
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
		network: TRANSPORT.upi[0].value,
		accountAlias: '',
		params: {
			currency: { value: undefined },
			amount: { value: undefined },
			receiverName: { value: undefined },
			message: { value: undefined }
		}
	},

	ach: {
		network: TRANSPORT.ach[0].value,
		routingNumber: '',
		accountNumber: '',
		params: {
			currency: { value: undefined },
			amount: { value: undefined },
			receiverName: { value: undefined }
		}
	},

	bic: {
		network: TRANSPORT.bic[0].value,
		bic: '',
		params: {
			currency: { value: undefined },
			amount: { value: undefined }
		}
	},

	void: {
		network: 'void',
		transport: TRANSPORT.void[0].value,
		other: '',
		params: {
			loc: { value: undefined, lang: '', long: '', plus: '', other: '' },
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
				value: props.network === 'other'
				? (checkValidity(props.other)
				? encodeURIComponent(props.other.toLowerCase())
				: '')
				: encodeURIComponent(props.network)
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
		if (
			props.transport === 'geo' &&
			props.params.loc.lang !== '' &&
			props.params.loc.long !== ''
		) {
			props.params.loc.value = `${props.params.loc.lang}:${props.params.loc.long}`;
		}
		if (props.transport === 'plus') {
			props.params.loc.value = props.params.loc.plus.toUpperCase();
		}
		if (props.transport === 'other') {
			props.params.loc.value = props.params.loc.other;
		}

		const payload: IPayload[] = [
			{
				placeholder: '',
				value: props.network
			},
			{
				placeholder: '',
				value: props.transport === 'other'
				? encodeURIComponent(props.other)
				: encodeURIComponent(props.transport)
			}
		];

		return generate('void', props, payload);
	}
};

export const constructor = createStore(INITIAL_STATE, BUILDER);
