/** Accepts any number of arguments and returns nothing */
declare type VoidReturningFunction<A> = (...args: A[]) => void;

/**
* Returns a debounced function that delays invoking `func` until `wait` milliseconds have elapsed since `func` was last invoked.
* @param {Function} func The function to debounce.
* @param {number} [wait] The number of milliseconds to delay.
* @param {boolean} [immediate] Whether to invoke `func` immediately the first time.
*/
function debounce<A, F extends VoidReturningFunction<A>> (func: F, wait?: number, immediate?: boolean): F {
	let timeout: number | NodeJS.Timeout;

	return function (): void {
		const self = this;
		const args = arguments;
		const call = immediate && !timeout;

		clearTimeout(timeout as number);

		timeout = setTimeout(() => {
			timeout = null;

			if (!immediate) {
				func.apply(self, args);
			}
		}, wait || 0);

		if (call) {
			func.apply(self, args);
		}
	} as F;
}

export default debounce;
