/**
* Returns a function with the ability to bind arguments.
* @param {Function} func - Function to add the ability to bind arguments.
*/
export default function defineArgs<F = Function>(func: F): FunctionArgable<F> {
	return Object.defineProperty(func, 'args', {
		configurable: true,
		enumerable: false,
		/**
		* Returns a bound function with the same body as the original, along with the bound arguments.
		* @param {...any} arguments - Arguments to bind to the function.
		*/
		value: function args() {
			if (typeof this !== 'function') {
				throw new TypeError('args must be called on a function');
			}

			const func: FunctionArgable<F> = Function('f', 'a', 'return function(' + Array.apply(
				null,
				Array(
					Math.max(
						0,
						this.length - arguments.length
					)
				)
			).map(
				String
			) + '){return f.apply(this,a.concat.apply(a,arguments))}')(
				this,
				Array.prototype.slice.call(arguments)
			);

			function Noop() { }
			Noop.prototype = Object.create(this.prototype);
			func.prototype = new Noop();
			Noop.prototype = null;

			return func;
		}
	});
}

/** Creates a new function. */
export declare interface FunctionArgable<F> extends Function {
	/** Creates a new function.
	* @param args A list of arguments the function accepts. */
	new(...args: any[]): FunctionArgable<F>;
	(...args: any[]): FunctionArgable<F>;

	/**
	* Creates a bound function with the same body as the original, along with the initial arguments.
	* @param args A list of arguments to be bound to the function.
	*/
	args<A extends any[], R>(this: (this: F, ...args: A) => R, ...args: A): R;
	args<A0, A extends any[], R>(this: (this: F, arg0: A0, ...args: A) => R, arg0: A0): (...args: A) => R;
	args<A0, A1, A extends any[], R>(this: (this: F, arg0: A0, arg1: A1, ...args: A) => R, arg0: A0, arg1: A1): (...args: A) => R;
	args<A0, A1, A2, A extends any[], R>(this: (this: F, arg0: A0, arg1: A1, arg2: A2, ...args: A) => R, arg0: A0, arg1: A1, arg2: A2): (...args: A) => R;
	args<A0, A1, A2, A3, A extends any[], R>(this: (this: F, arg0: A0, arg1: A1, arg2: A2, arg3: A3, ...args: A) => R, arg0: A0, arg1: A1, arg2: A2, arg3: A3): (...args: A) => R;
	args<AX, R>(this: (this: F, ...args: AX[]) => R, ...args: AX[]): (...args: AX[]) => R;
}
