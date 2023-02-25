export const META_CONTENT = {
	ican: (props: Record<string, any>) => props.destination || '<destination>',
	iban: (props: Record<string, any>) => props.iban || '<iban>',
	bic: (props: Record<string, any>) => props.bic || '<bic>',
	upi: (props: Record<string, any>) => props.receiverAlias || '<receiver-alias>',
	void: (props: Record<string, any>) => {
		let content = props.exchangePoint.other;

		if (
			props.network === 'geodd' &&
			Boolean(props.exchangePoint.lang) &&
			Boolean(props.exchangePoint.long)
		) {
			content = `${props.exchangePoint.lang}:${props.exchangePoint.long}`;
		}

		if (props.network === 'plus') {
			content = props.exchangePoint.plus;
		}

		return content || '<exchange-point>';
	}
};
