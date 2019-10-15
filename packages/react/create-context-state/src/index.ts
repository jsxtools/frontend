import { createContext, createElement, useContext, useState } from 'react';

declare type ContextState<S> = [
	() => UseStateTuple<S>,
	React.FunctionComponent<{ children?: React.ReactNode }>,
];

/**
* Returns a new provider and stateful tuple.
* @param {any} initialState Initial `state` value.
* @param {Function} useStateHook Custom `useState` hook.
*/
export default function createContextState<S = any>(initialState: S, useStateHook?: UseState<S>): ContextState<S> {
	const context = createContext(initialState);

	return [
		useContext.bind(useContext, context),
		function Provider(props: { children?: React.ReactNode }) {
			return createElement(context.Provider, {
				value: (typeof useStateHook === 'function' ? useStateHook : useState)(initialState) as any
			}, props.children);
		}
	];
}
