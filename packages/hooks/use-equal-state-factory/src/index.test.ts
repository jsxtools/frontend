import { createElement, useState } from 'react';
import useEqualStateFactory from '.';
import { act, create } from 'react-test-renderer';

describe('use-equal-state-factory', () => {
	const useEqualState = useEqualStateFactory({ useState });
	const listenerSpy = jest.fn();
	const rendererSpy = jest.fn();
	const originalState = { a: 1, b: 2, c: 3 };
	const wrapper = create(null);
	let scopedState: any;

	test('runs without updates', () => {
		act(() => {
			wrapper.update(createElement(function Component() {
				const [state, setState] = useEqualState(originalState);

				scopedState = state;

				rendererSpy();

				return createElement('button', { onClick(nextState) { setState(nextState); listenerSpy(); } });
			}, null));
		});

		expect(listenerSpy).toHaveBeenCalledTimes(0);
		expect(rendererSpy).toHaveBeenCalledTimes(1);
		expect(scopedState).toBeDefined();
		expect(scopedState).toMatchObject(originalState);
	});

	test('runs without updates when setting with the same object', () => {
		act(() => {
			wrapper.root.findByType('button').props.onClick(originalState);
		});

		expect(listenerSpy).toHaveBeenCalledTimes(1);
		expect(rendererSpy).toHaveBeenCalledTimes(1);
		expect(scopedState).toMatchObject(originalState);
	});

	test('runs without updates when setting with a matching object', () => {
		act(() => {
			wrapper.root.findByType('button').props.onClick({ a: 1, b: 2, c: 3 });
		});

		expect(listenerSpy).toHaveBeenCalledTimes(2);
		expect(rendererSpy).toHaveBeenCalledTimes(1);
		expect(scopedState).toMatchObject(originalState);
	});

	test('runs with updates using non-matching object', () => {
		act(() => {
			wrapper.root.findByType('button').props.onClick({ foo: false, bar: false });
		});

		expect(listenerSpy).toHaveBeenCalledTimes(3);
		expect(rendererSpy).toHaveBeenCalledTimes(2);
		expect(scopedState).toMatchObject({ foo: false, bar: false });
	});

	test('runs with updates using non-object', () => {
		act(() => {
			wrapper.root.findByType('button').props.onClick(null);
		});

		expect(listenerSpy).toHaveBeenCalledTimes(4);
		expect(rendererSpy).toHaveBeenCalledTimes(3);
		expect(scopedState).toBe(null);
	});
});
