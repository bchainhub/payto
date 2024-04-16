/**
* Export main identifier
* @param {ITransactionState} address - object with potential properties
* @param {ITransitionType} type - string indicating the address type
*/
export const getAddress = (address: ITransactionState, type: ITransitionType): string | undefined => {
	switch (type) {
		case 'ican':
			return address.destination || undefined;
		case 'iban':
			return address.iban || undefined;
		case 'ach':
			return address.accountNumber || undefined;
		case 'upi':
		case 'pix':
			return address.accountAlias || undefined;
		case 'bic':
			return address.bic || undefined;
		case 'void':
			if (address.transport === 'geo') {
				if(address.params.loc.lat && address.params.loc.lon) {
					return address.params.loc.value || undefined;
				} else {
					return undefined;
				}
			} else if (address.transport === 'plus') {
				return address.params.loc.plus || undefined;
			} else if (address.other) {
				return address.other || undefined;
			}
			return undefined;
		default:
			return undefined;
	}
};
