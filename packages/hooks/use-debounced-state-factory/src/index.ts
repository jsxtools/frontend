import debounce from '@jsxtools/debounce';

/**
* Returns a `useState` hook with a debounced `setState` function.
* @param {Object} hooks An object containing hooks.
* @param {Function} hooks.useState A function that returns a stateful `state` value and `setState` function to update it.
*/
function useDebouncedStateFactory (hooks: HookList) {
	/**
	* Returns a stateful `state` value and `setState` function to update it.
	* @param {any} initialState The initial `state` value.
	* @param {number} [wait] The number of milliseconds to delay `setState`.
	* @param {boolean} [immediate] Whether to invoke `setState` before the `wait` delay.
	*/
	return function useDebouncedState<S> (initialState: S, wait?: number, immediate?: boolean): UseStateTuple<S> {
		const tuple = hooks.useState(initialState);

		return [tuple[0], debounce(tuple[1], wait, immediate)];
	}
}

export default useDebouncedStateFactory;
