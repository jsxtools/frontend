import { createElement, useState } from 'react';
import useEqualStateFactory from '.';
import { act, create } from 'react-test-renderer';

describe('use-equal-state-factory', () => {
	const useEqualState = useEqualStateFactory({ useState });
	const listenerSpy = jest.fn();
	const rendererSpy = jest.fn();
	const same = { a: 1, b: 2, c: 3 };
	const wrapper = create();
	let scopedState: any;

	test('runs without updates', () => {
		act(() => {
			wrapper.update(createElement(function Component() {
				const [state, setState] = useEqualState(same);

				scopedState = state;

				rendererSpy();

				return createElement('button', { onClick (nextState) { setState(nextState); listenerSpy(); } });
			}, null));
		});

		expect(listenerSpy).toHaveBeenCalledTimes(0);
		expect(rendererSpy).toHaveBeenCalledTimes(1);
		expect(scopedState).toBeDefined();
		expect(scopedState).toMatchObject(same);
	});

	test('runs without updates using same object', () => {
		act(() => {
			wrapper.root.findByType('button').props.onClick(same);
		});

		expect(listenerSpy).toHaveBeenCalledTimes(1);
		expect(rendererSpy).toHaveBeenCalledTimes(1);
		expect(scopedState).toMatchObject(same);
	});

	test('runs without updates using matching object', () => {
		act(() => {
			wrapper.root.findByType('button').props.onClick({ a: 1, b: 2, c: 3 });
		});

		expect(listenerSpy).toHaveBeenCalledTimes(2);
		expect(rendererSpy).toHaveBeenCalledTimes(1);
		expect(scopedState).toMatchObject(same);
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
