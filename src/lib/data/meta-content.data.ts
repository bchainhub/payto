export const META_CONTENT = {
	ican: (props: Record<string, any>) => props.destination || '',
	iban: (props: Record<string, any>) => props.iban || '',
	bic: (props: Record<string, any>) => props.bic || '',
	upi: (props: Record<string, any>) => props.accountAlias || '',
	pix: (props: Record<string, any>) => props.accountAlias || '',
	ach: (props: { accountNumber?: string }) => {
		let account = /^\d+$/.test(props.accountNumber || '') ? props.accountNumber : '';
		return account;
	},
	void: (props: Record<string, any>) => {
		let content = props.params.loc.other;

		if (
			props.transport === 'geo' &&
			Boolean(props.params.loc.lat) &&
			Boolean(props.params.loc.lon)
		) {
			content = `${props.params.loc.lat}:${props.params.loc.lon}`;
		}

		if (props.transport === 'plus') {
			content = props.params.loc.plus;
		}

		return content || '';
	}
};
