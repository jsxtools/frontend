import isEqual from '@jsxtools/is-equal';

/**
* Returns a `useState` hook with a equality-checked `setState` function.
* @param {Object} hooks An object containing hooks.
* @param {Function} hooks.useState A function that returns a stateful `state` value and `setState` function to update it.
*/
function useEqualStateFactory (hooks: HookList) {
	/**
	* Returns a stateful `state` value and `setState` function to update it.
	* @param {any} initialState The initial `state` value.
	* @param {Function} [deepEqual] A function that returns whether two values in an object are the same value.
	*/
	return function useEqualState<S = any> (initialState: S, deepEqual?: Equality): UseStateTuple<S> {
		const tuple = hooks.useState(initialState);

		function setEqualState<S> (nextState: S) {
			if (!isEqual(tuple[0], nextState, deepEqual)) {
				tuple[1].call(this, nextState);
			}
		}

		return [tuple[0], setEqualState];
	}
}

export default useEqualStateFactory;
