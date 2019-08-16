declare type ReturningFunction<A> = (...args: A[]) => any;

/**
* Returns a function that invokes `preventDefault` on any `event` passed into it.
* @param {Function} func The function to invoke `preventDefault` upon its arguments.
*/
function preventDefault<A, F extends ReturningFunction<A>> (func: F): F {
	return function () {
		return func.apply(this, Array.prototype.map.call(arguments, (arg: any) => {
			if (typeof Object(arg).preventDefault === 'function') {
				arg.preventDefault();
			}

			return arg;
		}));
	} as F;
}

export default preventDefault;
