declare type UseStateDispatch<S> = (state: S) => void;
declare type UseStateAction<S> = S | ((prevState: S) => S);
declare type UseStateTuple<S> = [S, UseStateDispatch<UseStateAction<S>>];
declare type UseState = <S> (initialState: S | (() => S)) => UseStateTuple<S>;

declare type UseEffectDependencyList = ReadonlyArray<any>;
declare type UseEffectCallback = () => (void | (() => void | undefined));
declare type UseEffect = (effect: UseEffectCallback, deps: UseEffectDependencyList) => void;

declare type Hooks = {
	useEffect: UseEffect,
	useState: UseState
};

declare type Fulfill<R> = UseStateDispatch<UseStateAction<R>>;
declare type Reject = UseStateDispatch<UseStateAction<Error>>;
declare type Settled<R> = (R | Error);

declare type PromiseOrPromiseCallback<R> = Promise<R> | (() => Promise<R>);
declare type State = 'pending' | 'fulfilled' | 'rejected';
declare type UsePromiseTuple<R> = [ State, Settled<R> | undefined, Reject, Fulfill<R> ];

/**
* Returns a hook with a promise `state` and its `settled` value.
* @param {Object} hooks An object containing hooks.
* @param {Function} hooks.useEffect A function that accepts a function containing imperative, possibly effectful code.
* @param {Function} hooks.useState A function that returns a stateful `state` value and `setState` function to update it.
*/
function usePromiseFactory (hooks: Hooks) {
	/**
	* Returns a stateful Promise and its settled value.
	* @param promise A `Promise` or callback returning a `Promise` to fulfill the state
	*/
	return function usePromise<R = any> (promise: PromiseOrPromiseCallback<R>, deps?: UseEffectDependencyList): UsePromiseTuple<R> {
		const tuple = hooks.useState(() => {
			let fulfill: Fulfill<R>;
			let reject: Reject;

			new Promise((_fulfill, _reject: Reject) => {
				fulfill = _fulfill;
				reject = _reject;
			}).then(
				(fulfilledValue: R) => {
					tuple[1]([
						'fulfilled',
						fulfilledValue,
						reject,
						fulfill
					]);
				},
				(reason: Error) => {
					tuple[1]([
						'rejected',
						reason,
						reject,
						fulfill
					]);
				}
			);

			const initialValue: UsePromiseTuple<R> = [
				'pending',
				undefined,
				reject,
				fulfill
			];

			return initialValue;
		});

		hooks.useEffect(() => {
			try {
				while (typeof promise === 'function') {
					promise = promise();
				}
			} catch (error) {
				tuple[0][2](error);
			}

			Promise.resolve(promise as Promise<R>).then(tuple[0][3], tuple[0][2]);

			return () => {
				tuple[0][2](new Error('useEffect'));
			};
		}, [promise].concat(deps || []));

		return tuple[0];
	}
}

export default usePromiseFactory;
