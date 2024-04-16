/**
 * Retrieves the network value based on the provided networks object and transition type.
 * @param {ITransactionState} networks - The networks object containing network information.
 * @param {ITransitionType} type - The transition type.
 * @param {boolean} emptyNetworks - Whether to return an empty string if the network is not found.
 * @returns The network value.
 */
export const getNetwork = (networks: ITransactionState, type: ITransitionType | undefined, emptyNetworks: boolean = false): string | undefined => {
	if (!networks) return undefined;

	if(type === 'ican' && networks.network === 'other') {
		return networks.other;
	} else if (type === 'ican') {
		return networks.network;
	} else if (type === 'void' && networks.network === 'other') {
		return networks.other;
	} else if (type === 'void') {
		return networks.transport;
	} else {
		return emptyNetworks ? undefined : networks.network;
	}
}
