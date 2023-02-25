/**
 * It takes a list of strings and returns a single string with all the strings joined together with a
 * space in between
 * @param {string[]} classes - string[]
 */
export const join = (...classes: string[]) => {
	return classes.filter(Boolean).join(' ');
};
