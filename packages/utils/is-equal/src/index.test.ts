import isEqual from '.';

test('is-equal: works on booleans, numbers, strings, arrays, and objects', () => {
	const same = { a: 1, b: 2, c: 3 };

	expect(isEqual(true, true)).toBe(true);
	expect(isEqual(true, false)).toBe(false);
	expect(isEqual(5, 5)).toBe(true);
	expect(isEqual(5, 4)).toBe(false);
	expect(isEqual('true', 'true')).toBe(true);
	expect(isEqual('true', 'false')).toBe(false);
	expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
	expect(isEqual([1, 2, 3], [4, 5, 6])).toBe(false);
	expect(isEqual(same, same)).toBe(true);
	expect(isEqual(same, true)).toBe(false);
	expect(isEqual(same, { a: 1, b: 2, c: 3 })).toBe(true);
	expect(isEqual(same, { a: 4, b: 5, c: 6 })).toBe(false);
	expect(isEqual(same, { a: 1, b: 2 })).toBe(false);
});
