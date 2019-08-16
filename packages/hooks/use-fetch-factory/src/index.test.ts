import { createElement, Fragment, useEffect, useState } from 'react';
import useFetchFactory from '.';
import { act, create } from 'react-test-renderer';
import nodeFetch from 'node-fetch';

describe('use-equal-state-factory', () => {
	let globalFetch: any;
	let globalFetchPromise;
	let globalFetchResolver;

	beforeEach(() => {
		globalFetchPromise = new Promise(_resolve => {
			globalFetchResolver = _resolve;
		});

		globalFetchPromise.response = undefined;
		globalFetchPromise.state = 'pending';

		// @ts-ignore
		global.fetch = function fetch(input, init) {
			return nodeFetch(input, init).then(response => {
				globalFetchPromise.state = 'fulfilled';
				globalFetchPromise.response = response;
				globalFetchResolver();

				return response;
			});
		}
	});

	afterEach(() => {
		// @ts-ignore
		global.fetch = globalFetch;
	});

	const useFetch = useFetchFactory({ useEffect, useState });
	// const useFetchSpy = jest.fn();
	let wrapper = create();

	test('fulfilling component: pending state', async () => {
		act(() => {
			wrapper.update(createElement(function () {
				const [ state ] = useFetch('https://httpbin.org/get');

				return createElement(Fragment, null, state);
			}, null));
		});

		// expect(useFetchSpy).toHaveBeenCalledTimes(1);
		expect(wrapper.root.children).toMatchObject(['pending']);

		await act(async () => await globalFetchPromise);
	});

	test('fulfilling component: fulfilled state', async () => {
		expect(wrapper.root.children).toMatchObject(['fulfilled']);
	});

	test('fulfilling component: pending state', async () => {
		let abort;
		act(() => {
			wrapper.update(createElement(function () {
				const [ state, response, _abort ] = useFetch('https://httpbin.org/get');

				abort = _abort;

				return createElement(Fragment, null, state, JSON.stringify(response));
			}, null));
		});

		// expect(useFetchSpy).toHaveBeenCalledTimes(1);
		expect(wrapper.root.children).toMatchObject(['pending']);

		await act(async () => {
			abort();
		});
	});

	test('fulfilling component: rejected state', async () => {
		expect(wrapper.root.children).toMatchObject(['rejected', '{}']);
	});
});
