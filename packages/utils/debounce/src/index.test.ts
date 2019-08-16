import debounce from '.';

describe('debounce', () => {
	test('debounce: works outside the main thread', () => {
		const debounceSpy = jest.fn();
		const debounced = debounce(() => debounceSpy(isDebounced = true));
		const debouncedImmediately = debounce(() => debounceSpy(isDebounced = true), 200, true);

		let isDebounced = false;

		expect(debounceSpy).toHaveBeenCalledTimes(0);
		expect(isDebounced).toBe(false);

		debounced();
		expect(debounceSpy).toHaveBeenCalledTimes(0);
		expect(isDebounced).toBe(false);
		debounced();
		expect(debounceSpy).toHaveBeenCalledTimes(0);
		expect(isDebounced).toBe(false);

		jest.runAllTimers();
		expect(debounceSpy).toHaveBeenCalledTimes(1);
		expect(isDebounced).toBe(true);

		isDebounced = false;
		expect(isDebounced).toBe(false);

		debouncedImmediately();
		expect(debounceSpy).toHaveBeenCalledTimes(2);
		expect(isDebounced).toBe(true);

		debouncedImmediately();
		expect(debounceSpy).toHaveBeenCalledTimes(2);
		expect(isDebounced).toBe(true);

		jest.runAllTimers();
		expect(debounceSpy).toHaveBeenCalledTimes(2);
		expect(isDebounced).toBe(true);
	});
});
