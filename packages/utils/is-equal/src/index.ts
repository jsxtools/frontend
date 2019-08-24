/**
* Returns whether two values are the same value.
* @param {any} value1 The first value to compare.
* @param {any} value2 The second value to compare.
* @param {Function} [deepEqual] A function that returns whether two values in an object are the same value.
*/
function isEqual (value1: any, value2: any, deepEqual?: Equality): boolean {
	deepEqual = deepEqual || Object.is;

	if (Object.is(value1, value2)) {
		return true;
	}

	if (typeof value1 !== 'object' || value1 === null || typeof value2 !== 'object' || value2 === null) {
		return false;
	}

	const keysA: any[] = Object.keys(value1);
	const keysB: any[] = Object.keys(value2);

	if (keysA.length !== keysB.length) {
		return false;
	}

	return keysA.every(key => Object.hasOwnProperty.call(value2, key) && deepEqual(value1[key], value2[key]));
}

export default isEqual;
