import preventDefault from '.';

test('is-type: works on booleans, numbers, strings, arrays, and objects', () => {
	const preventDefaultSpy = jest.fn();
	const listenerSpy = jest.fn();
	const event = { preventDefault: preventDefaultSpy };
	const listener = preventDefault(event => {
		listenerSpy();

		return event;
	});

	expect(preventDefaultSpy).toHaveBeenCalledTimes(0);
	expect(listenerSpy).toHaveBeenCalledTimes(0);

	expect(listener(event)).toBe(event);
	expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
	expect(listenerSpy).toHaveBeenCalledTimes(1);

	expect(listener(null)).toBe(null);
	expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
	expect(listenerSpy).toHaveBeenCalledTimes(2);
});
