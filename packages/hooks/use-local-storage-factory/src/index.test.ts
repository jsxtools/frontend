import { createElement, useState } from 'react';
import useLocalStorageFactory from '.';
import { act, create } from 'react-test-renderer';

describe('use-local-storage', () => {
	beforeEach(() => {
		jest.spyOn(console, 'error');

		// @ts-ignore
		global.console.error.mockImplementation(() => { });
	});

	afterEach(() => {
		// @ts-ignore
		global.console.error.mockRestore();
	});

	const useLocalStorage = useLocalStorageFactory({ useState });
	const listenerSpy = jest.fn();
	const rendererSpy = jest.fn();
	const wrapper = create(null);
	let scopedState: any;

	test('sets local storage', () => {
		act(() => {
			wrapper.update(createElement(function () {
				const [state, setState] = useLocalStorage('key', 0);

				scopedState = state;

				rendererSpy();

				return createElement('button', { onClick(nextState) { setState(nextState); listenerSpy(); } });
			}, null));
		});
		expect(listenerSpy).toHaveBeenCalledTimes(0);
		expect(rendererSpy).toHaveBeenCalledTimes(1);
		expect(scopedState).toBeDefined();
		expect(scopedState).toBe(0);
	});

	test('updates local storage', () => {
		act(() => {
			wrapper.root.findByType('button').props.onClick(1);
		});
		expect(listenerSpy).toHaveBeenCalledTimes(1);
		expect(rendererSpy).toHaveBeenCalledTimes(2);
		expect(scopedState).toBe(1);

		act(() => {
			wrapper.root.findByType('button').props.onClick(2);
		});
		expect(listenerSpy).toHaveBeenCalledTimes(2);
		expect(rendererSpy).toHaveBeenCalledTimes(3);
		expect(scopedState).toBe(2);
	});

	test('console.errors on unparsable key', () => {
		window.localStorage.setItem('key', 'fail');
		act(() => {
			wrapper.update(createElement(function Component() {
				const [state, setState] = useLocalStorage('key', function () { });

				scopedState = state;

				rendererSpy();

				return createElement('button', { onClick(nextState) { setState(nextState); listenerSpy(); } });
			}, null));
		});
		expect(console.error).toHaveBeenCalled();
	});

	test('console.errors on unstringifiable key', () => {
		act(() => {
			wrapper.root.findByType('button').props.onClick(window);
		});
		expect(listenerSpy).toHaveBeenCalledTimes(3);
		expect(rendererSpy).toHaveBeenCalledTimes(5);
		expect(scopedState).toBe(window);
	});
});
