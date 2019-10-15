import { createElement, useState } from 'react';
import createContextState from '.';
import { act, create } from 'react-test-renderer';

describe('create-context-state', () => {
	const rendererSpy = jest.fn();
	const wrapper = create(null);
	let scopedState: any;

	test('gets initial metrics', () => {
		act(() => {
			wrapper.update(null);
		});

		expect(rendererSpy).toHaveBeenCalledTimes(0);
		expect(scopedState).not.toBeDefined();
	});

	const listenerSpy = jest.fn();
	const [useState1, Provider1] = createContextState(0);

	test('gets initial metrics', () => {
		act(() => {
			wrapper.update(
				createElement(Provider1, null,
					createElement(function () {
						let [state, setState] = useState1();

						scopedState = state;

						rendererSpy();

						return createElement('button', {
							onClick(nextState: typeof state) {
								setState(nextState);
								listenerSpy();
							}
						}, state);
					})
				)
			)
		});

		expect(rendererSpy).toHaveBeenCalledTimes(1);
		expect(scopedState).toBeDefined();
		expect(scopedState).toBe(0);
	});

	test('sets context state', () => {
		act(() => {
			wrapper.root.findByType('button').props.onClick(1);
		});

		expect(scopedState).toBe(1);
		expect(listenerSpy).toHaveBeenCalledTimes(1);
		expect(rendererSpy).toHaveBeenCalledTimes(2);
	});

	const [useState2, Provider2] = createContextState(0, initialValue => {
		const useStateTuple = useState(initialValue);
		const useStateSetter = nextState => useStateTuple[1](nextState * 10);

		return [useStateTuple[0], useStateSetter];
	});

	test('sets context state again', () => {
		act(() => {
			wrapper.update(
				createElement(Provider2, null,
					createElement(function () {
						let [state, setState] = useState2();

						scopedState = state;

						rendererSpy();

						return createElement('button', {
							onClick(nextState: typeof state) {
								setState(nextState);
								listenerSpy();
							}
						}, state);
					})
				)
			)
		});

		expect(scopedState).toBe(0);
		expect(listenerSpy).toHaveBeenCalledTimes(1);
		expect(rendererSpy).toHaveBeenCalledTimes(3);
	});

	test('sets context state again', () => {
		act(() => {
			wrapper.root.findByType('button').props.onClick(1);
		});

		expect(scopedState).toBe(10);
		expect(listenerSpy).toHaveBeenCalledTimes(2);
		expect(rendererSpy).toHaveBeenCalledTimes(4);
	});
});
