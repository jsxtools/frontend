import * as React from 'react';
import usePromiseFactory from '.';
import { act, create } from 'react-test-renderer';

describe('use-equal-state-factory', () => {
	const usePromise = usePromiseFactory({ useEffect: React.useEffect, useState: React.useState });
	const usePromiseSpy = jest.fn();
	let wrapper = create(null);

	test('fulfilling component: pending state', async () => {
		act(() => {
			wrapper.update(React.createElement(function () {
				const [ state, settled ] = usePromise(async () => {
					usePromiseSpy();

					return 'success';
				});

				return React.createElement(React.Fragment, null, state, <React.ReactNode>settled);
			}, null));
		});

		expect(usePromiseSpy).toHaveBeenCalledTimes(1);
		expect(wrapper.root.children).toMatchObject(['pending']);

		await act(async () => {});
	});

	test('fulfilling component: fulfilled state', async () => {
		expect(usePromiseSpy).toHaveBeenCalledTimes(2);
		expect(wrapper.root.children).toMatchObject(['fulfilled', 'success']);
	});

	test('rejecting component: pending state', async () => {
		wrapper.update(React.createElement(function () {
			const [ state, settled ] = usePromise(async () => {
				usePromiseSpy();

				throw 'failure';
			});

			return React.createElement(React.Fragment, null, state, <React.ReactNode>settled);
		}, null));

		act(() => {});

		expect(usePromiseSpy).toHaveBeenCalledTimes(3);
		expect(wrapper.root.children).toMatchObject(['pending']);

		await act(async () => {});
	});

	test('rejecting component: rejected state', async () => {
		expect(usePromiseSpy).toHaveBeenCalledTimes(4);
		expect(wrapper.root.children).toMatchObject(['rejected', 'failure']);
	});

	test('rejecting callback component: pending state', async () => {
		wrapper.update(React.createElement(function () {
			const [ state, settled ] = usePromise(() => {
				usePromiseSpy();

				throw 'failure';
			});

			return React.createElement(React.Fragment, null, state, settled);
		}));

		act(() => {});

		expect(usePromiseSpy).toHaveBeenCalledTimes(5);
		expect(wrapper.root.children).toMatchObject(['pending']);

		await act(async () => {});
	});

	test('rejecting callback component: rejected state', async () => {
		expect(usePromiseSpy).toHaveBeenCalledTimes(6);
		expect(wrapper.root.children).toMatchObject(['rejected', 'failure']);
	});
});
