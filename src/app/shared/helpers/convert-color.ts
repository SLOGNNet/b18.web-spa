/**
 * Returns color in rgb format as an array.
 * @param {any} hex
 */

export function hexToRgb(hex) {
	if (typeof hex !== 'string') {
		throw new TypeError('Expected a string');
	}

	hex = hex.replace(/^#/, '');

	if (hex.length === 3) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}

	let num = parseInt(hex, 16);

	return [num >> 16, num >> 8 & 255, num & 255];
}

/**
 * Returns color in rgb format as a string.
 * @param {array} colors
 */
export function getRGBString(colors) {
	return 'rgb(' + colors[0] + ', ' + colors[1] + ', ' + colors[2] + ')';
}
