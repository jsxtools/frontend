import { isArray, isBoolean, isNumber, isObject, isString } from '.';

test('is-type: works on booleans, numbers, strings, arrays, and objects', () => {
	expect(isArray([])).toBe(true);
	expect(isArray(true)).toBe(false);
	expect(isBoolean(true)).toBe(true);
	expect(isBoolean([])).toBe(false);
	expect(isNumber(5)).toBe(true);
	expect(isNumber(true)).toBe(false);
	expect(isObject({})).toBe(true);
	expect(isObject(true)).toBe(false);
	expect(isString('true')).toBe(true);
	expect(isString(true)).toBe(false);
});
