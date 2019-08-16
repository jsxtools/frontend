declare type Fulfill = (value: Response) => void;
declare type Reject = (reason: Error) => void;

declare type UseEffectDependencyList = ReadonlyArray<any>;
declare type UseEffectCallback = () => Reject;
declare type UseEffect = (effect: UseEffectCallback, deps: UseEffectDependencyList) => void;

declare type UseFetchState = 'pending' | 'fulfilled' | 'rejected';
declare type UseFetchTuple = [ UseFetchState, undefined | Response | Error, Reject, Reject? ];

declare type UseStateDispatch<S> = (state: S) => void;
declare type UseStateAction<S> = S | ((prevState: S) => S);
declare type UseStateTuple = [ UseFetchTuple, UseStateDispatch<UseStateAction<UseFetchTuple>> ];
declare type UseState = <S> (initialState: S | (() => S)) => UseStateTuple;

declare type HookList = {
	useEffect: UseEffect,
	useState: UseState
};

function useFetchFactory(hooks: HookList) {
	function useFetch(input: RequestInfo, options?: RequestInit, deps?: UseEffectDependencyList): UseFetchTuple {
		// create a tuple of [ state, settledValue, abort ]
		const tuple = hooks.useState(() => {
			const controller = new AbortController();
			const init = Object.assign({}, options, { signal: controller.signal });
			const abort: Reject = (): void => {
				controller.abort();
				reject(new Error('Aborted'));
			};
			let fulfill: Fulfill;
			let reject: Reject;

			new Promise((_fulfill: Fulfill, _reject: Reject) => {
				fulfill = _fulfill;
				reject = _reject;

				fetch(input, init).then(response => {
					fulfill(response);
				}, reject);
			}).then(response => {
				tuple[1]([
					'fulfilled',
					response as Response,
					abort
				]);
			}, reason => {
				tuple[1]([
					'rejected',
					reason,
					abort
				]);
			});

			return ['pending', undefined, abort];
		});

		hooks.useEffect(
			() => tuple[0][2],
			[input, options].concat(deps || [])
		);

		return tuple[0];
	}

	return useFetch;
}

export default useFetchFactory;
