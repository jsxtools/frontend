declare type UseFetchTuple = [
	'pending' | 'fulfilled' | 'rejected',
	undefined | Response | Error,
	Reject
];

function useFetchFactory(hooks: HookList) {
	function useFetch(input: RequestInfo, options?: RequestInit, deps?: DependencyList): UseFetchTuple {
		// create a tuple of [ state, settledValue, abort ]
		const tuple = hooks.useState((): UseFetchTuple => {
			const controller = new AbortController();
			const init = Object.assign({}, options, { signal: controller.signal });
			const abort: Reject = (): void => {
				controller.abort();
				reject(new Error('Aborted'));
			};
			let fulfill: Fulfill<Response>;
			let reject: Reject;

			new Promise((_fulfill: Fulfill<Response>, _reject: Reject) => {
				fulfill = _fulfill;
				reject = _reject;

				fetch(input, init).then(response => {
					fulfill(response);
				}, reject);
			}).then(response => {
				tuple[1]([
					'fulfilled',
					response,
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
