export const META_CONTENT = {
	ican: (props: Record<string, any>) => props.destination || '',
	iban: (props: Record<string, any>) => props.iban || '',
	bic: (props: Record<string, any>) => props.bic || '',
	upi: (props: Record<string, any>) => props.accountAlias || '',
	ach: (props: Record<number, number>) => {
		let account = /^\d+$/.test(props.accountNumber) ? props.accountNumber : '';
		return account;
	},
	void: (props: Record<string, any>) => {
		let content = props.params.loc.other;

		if (
			props.transport === 'geo' &&
			Boolean(props.params.loc.lang) &&
			Boolean(props.params.loc.long)
		) {
			content = `${props.params.loc.lang}:${props.params.loc.long}`;
		}

		if (props.transport === 'plus') {
			content = props.params.loc.plus.toUpperCase();
		}

		return content || '';
	}
};
