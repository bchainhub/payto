interface IRGB {
	r: number;
	g: number;
	b: number;
}

/**
 * Converts a HEX color string to an RGB object.
 * @param {string} hex - HEX color string.
 * @returns {IRGB} RGB color object.
 */
function hexToRgb(hex: string): IRGB {
	hex = hex.replace(/^#/, '');
	const r = parseInt(hex.slice(0, 2), 16);
	const g = parseInt(hex.slice(2, 4), 16);
	const b = parseInt(hex.slice(4, 6), 16);
	return { r, g, b };
}

/**
 * Calculates the Euclidean distance between two HEX color values.
 * @param {string} color1 - First HEX color string.
 * @param {string} color2 - Second HEX color string.
 * @returns {number} The Euclidean distance between the two colors.
 */
export const calculateColorDistance = (color1: string, color2: string): number => {
	const rgb1 = hexToRgb(color1);
	const rgb2 = hexToRgb(color2);

	return Math.sqrt(
		Math.pow(rgb1.r - rgb2.r, 2) +
		Math.pow(rgb1.g - rgb2.g, 2) +
		Math.pow(rgb1.b - rgb2.b, 2)
	);
}
