import isEqual from '@jsxtools/is-equal';

declare type UseFetchTuple = [
	/** State of the fetch; "pending", "fulfilled", or "rejected" */
	PromiseState,
	/** Outcome of the fetch, either by successfully being fulfilled or by being rejected */
	undefined | Response | Error,
	/** Aborts the fetch before it has completed */
	AbortController['abort'],
];

declare interface RequestInitLike extends RequestInit {
	/** Defines the number of milliseconds a fetch can take before automatically being aborted. */
	timeout?: number,
	/** Response resolved with the result of parsing the body text as response type. */
	type?: 'json' | 'text',
}

function useFetchFactory(hooks: HookList) {
	function useFetch(input: RequestInfo, init?: RequestInitLike, deps?: DependencyList): UseFetchTuple {
		// create a tuple of [ state, settledValue, abort ]
		const tuple = hooks.useState((): UseFetchTuple => {
			init = Object(init);

			const controller: AbortController = new AbortController();
			const abort: AbortController['abort'] = controller.abort.bind(controller);
			const timeout: number | NodeJS.Timeout = init.timeout ? setTimeout(abort, init.timeout) : null;

			init.signal = controller.signal;

			fetch(input, init).then(response => {
				clearTimeout(timeout);

				if (typeof response[init.type] === 'function') {
					Promise.resolve(response[init.type]()).then(typeValue => {
						tuple[1]([
							'fulfilled',
							typeValue,
							abort
						]);
					});
				} else {
					tuple[1]([
						'fulfilled',
						response,
						abort
					]);
				}
			}, reason => {
				tuple[1]([
					'rejected',
					reason,
					abort
				]);
			});

			return ['pending', undefined, abort];
		});

		const ref = hooks.useRef();

		// abort the fetch when the component is removed
		hooks.useEffect(
			Object.bind(Object, tuple[0][2]),
			[
				input,
				isEqual(init, ref.current, isEqual)
					? ref.current
				: (ref.current = init)
			].concat(deps || [])
		);

		return tuple[0];
	}

	return useFetch;
}

export default useFetchFactory;
