/**
 * Check the validity of the network type
 * @param {string[]} classes - string[]
 */
export const checkValidity = (str: string) => {
	if (str === 'ican' || str === 'iban' || str === 'upi' || str === 'ach' || str === 'bic' || str === 'void' || str === 'ilp') {
		return false;
	} else {
		return true;
	}
};
