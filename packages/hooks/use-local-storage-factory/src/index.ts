/**
*
* @param {Object} hooks An object containing hooks.
* @param {Function} hooks.useState A function that returns a stateful `state` value and `setState` function to update it.
*/
function useLocalStorageFactory(hooks: HookList) {
	/**
	* Returns a stateful `state` value and `setState` function to update it.
	* @param {string} key The local storage key where the `state` value should be stored.
	* @param {any} initialState The initial `state` value.
	*/
	return function useLocalStorage<S = any>(key: string, initialState: S): UseStateTuple<S> {
		const tuple = hooks.useState(() => {
			try {
				const localStorageState = window.localStorage.getItem(key);

				if (typeof localStorageState === 'string') {
					return JSON.parse(localStorageState);
				} else {
					window.localStorage.setItem(key, JSON.stringify(initialState));
				}
			} catch (error) {
				console.error(error);
			}

			return initialState;
		});

		function setLocalStorageState<S>(nextState: S) {
			try {
				window.localStorage.setItem(key, JSON.stringify(nextState));
			} catch (error) {
				console.error(error);
			}

			tuple[1](nextState);
		}

		return [tuple[0], setLocalStorageState];
	}
}

export default useLocalStorageFactory;
