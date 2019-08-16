import { createElement, useState } from 'react';
import useDebouncedStateFactory from '.';
import { act, create } from 'react-test-renderer';

describe('use-debounced-state', () => {
	const useDebounce = useDebouncedStateFactory({ useState });
	const wrapper = create();
	let listenerSpy = jest.fn();
	let rendererSpy = jest.fn();
	let scopedState: any;

	test('initializes state', () => {
		act(() => {
			wrapper.update(createElement(function Component() {
				const [state, setState] = useDebounce(0);

				scopedState = state;

				rendererSpy();

				return createElement('button', { onClick (nextState: any) { setState(nextState); listenerSpy(); } });
			}, null));
		});

		expect(listenerSpy).toHaveBeenCalledTimes(0);
		expect(rendererSpy).toHaveBeenCalledTimes(1);
		expect(scopedState).toBe(0);
	});

	test('debounces state', () => {
		act(() => {
			wrapper.root.findByType('button').props.onClick(1);
		});

		expect(listenerSpy).toHaveBeenCalledTimes(1);
		expect(rendererSpy).toHaveBeenCalledTimes(1);
		expect(scopedState).toBe(0);

		act(() => {
			jest.runAllTimers();
		});
	});

	test('has debounced state', () => {
		expect(listenerSpy).toHaveBeenCalledTimes(1);
		expect(rendererSpy).toHaveBeenCalledTimes(2);
		expect(scopedState).toBe(1);
	});

	test('debounces state with immediate', () => {
		listenerSpy = jest.fn();
		rendererSpy = jest.fn();
		act(() => {
			wrapper.update(createElement(function Component() {
				const [state, setState] = useDebounce(0, 200, true);

				scopedState = state;

				rendererSpy();

				return createElement('button', { onClick (nextState: any) { setState(nextState); listenerSpy(); } });
			}, null));
		});

		expect(listenerSpy).toHaveBeenCalledTimes(0);
		expect(rendererSpy).toHaveBeenCalledTimes(1);
		expect(scopedState).toBeDefined();
		expect(scopedState).toBe(0);
	});

	test('delays debouncing state with immediate', () => {
		act(() => {
			wrapper.root.findByType('button').props.onClick(1);
		});

		expect(listenerSpy).toHaveBeenCalledTimes(1);
		expect(rendererSpy).toHaveBeenCalledTimes(2);
		expect(scopedState).toBe(1);

		act(() => {
			jest.runAllTimers();
		});
	});
});
