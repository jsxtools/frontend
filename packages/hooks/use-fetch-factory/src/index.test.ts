import { createElement, Fragment, useEffect, useRef, useState } from 'react';
import useFetchFactory from '.';
import { act, create } from 'react-test-renderer';

declare interface RequestInitLike extends RequestInit {
	signal?: AbortSignal,
	timeout?: number,
	type?: 'json' | 'text',
}

describe('use-equal-state-factory', () => {
	let definedFetch: any;
	let definedAbortController: any;
	let definedAbortSignal: any;

	let PROMISES = Promise.resolve();

	const createPromise = () => {
		const rrp = [], push = rrp.push.bind(rrp);
		push(new Promise(push));
		PROMISES = PROMISES.then(rrp[2])
		return rrp;
	};
	const defineGlobal = (name: string, value: any) => {
		const isGlobal = Object.hasOwnProperty.call(global, name);
		const preserve = global[name];

		Reflect.set(global, name, value);

		return () => isGlobal
			? Reflect.set(global, name, preserve)
			: Reflect.deleteProperty(global, name);
	};
	const Weakref = new WeakMap();

	beforeEach(() => {
		definedAbortController = defineGlobal('AbortController', class AbortController {
			abort() {
				Weakref.get(this).rejecter(new Error('AbortError: Fetch is aborted'));
			}

			constructor() {
				const signal = new AbortSignal();

				Reflect.set(this, 'signal', signal);
				Weakref.set(signal, { controller: this });
			}
		});
		definedAbortSignal = defineGlobal('AbortSignal', class AbortSignal { });
		definedFetch = defineGlobal('fetch', function fetch(input: string, init: Partial<RequestInitLike>) {
			const [resolver, rejecter, promiser] = createPromise();

			Weakref.set(Weakref.get(init.signal).controller, { rejecter });

			return Promise.resolve().then(() => {
				resolver({
					async json() {
						return { isJSON: true };
					},
					async text() {
						return 'isTEXT'
					},
				});

				return promiser;
			});
		});
	});

	afterEach(() => {
		definedFetch();
		definedAbortController();
		definedAbortSignal();
	});

	const useFetch = useFetchFactory({ useEffect, useRef, useState });
	let wrapper = create(null);

	test('fulfilling fetch: pending and fulfilled state', async () => {
		act(() => {
			wrapper.update(createElement(function () {
				const [state] = useFetch('https://httpbin.org/get');

				return createElement(Fragment, null, state);
			}, null));
		});

		expect(wrapper.root.children).toMatchObject(['pending']);

		await act(async () => {
			await PROMISES;
		});

		expect(wrapper.root.children).toMatchObject(['fulfilled']);
	});

	test('fulfilling fetch: updating the second argument', async () => {
		act(() => {
			let hasRun = false;

			wrapper.update(createElement(function () {
				const [headers, setHeaders] = useState({ 'Content-Type': 'application/json' });
				const [state] = useFetch('https://httpbin.org/get', { headers });

				if (!hasRun) {
					hasRun = true;

					setHeaders({ ...headers });
				}

				return createElement(Fragment, null, state);
			}, null));
		});

		expect(wrapper.root.children).toMatchObject(['pending']);

		await act(async () => {
			await PROMISES;
		});

		expect(wrapper.root.children).toMatchObject(['fulfilled']);
	});

	test('fulfilling fetch with type: pending and fulfilled state', async () => {
		act(() => {
			wrapper.update(createElement(function () {
				const [state, settled] = useFetch('https://httpbin.org/get', { type: 'text' });

				return createElement(Fragment, null, state, JSON.stringify(settled));
			}, null));
		});

		expect(wrapper.root.children).toMatchObject(['pending']);

		await act(async () => {
			await PROMISES;
		});

		expect(wrapper.root.children).toMatchObject(['fulfilled', '"isTEXT"']);
	});

	test('aborting fetch: pending and rejected state', async () => {
		let ABORT: AbortController['abort'];

		act(() => {
			wrapper.update(createElement(function () {
				// eslint-disable-next-line no-unused-vars
				const [state, settled, abort] = useFetch('https://httpbin.org/get');

				ABORT = abort;

				return createElement(Fragment, null, state);
			}, null));
		});

		expect(wrapper.root.children).toMatchObject(['pending']);

		act(ABORT);

		await act(async () => {
			await PROMISES;
		});

		expect(wrapper.root.children).toMatchObject(['rejected']);
	});

	test('timing out component: pending and rejected state', async () => {
		act(() => {
			wrapper.update(createElement(function () {
				const [state] = useFetch('https://httpbin.org/get', {
					timeout: 600
				});

				return createElement(Fragment, null, state);
			}, null));
		});

		expect(wrapper.root.children).toMatchObject(['pending']);

		await act(async () => {
			jest.runAllTimers();

			await PROMISES;
		});

		expect(wrapper.root.children).toMatchObject(['rejected']);
	});
});
