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
		let content = props.exchangePoint.other;

		if (
			props.network === 'geo' &&
			Boolean(props.exchangePoint.lang) &&
			Boolean(props.exchangePoint.long)
		) {
			content = `${props.exchangePoint.lang}:${props.exchangePoint.long}`;
		}

		if (props.network === 'plus') {
			content = props.exchangePoint.plus.toLowerCase();
		}

		return content || '';
	}
};
