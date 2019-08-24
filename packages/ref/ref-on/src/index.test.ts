import on from '../src';
import { createElement, Fragment, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

describe('ref-on', () => {
	const fragment = document.createDocumentFragment();
	const fragmentRoot = fragment.appendChild(document.createElement('div'));
	const root = document.body.appendChild(document.createElement('div'));

	test('delegates "click" events that rewrite refs', async () => {
		const onButton1Click = jest.fn();
		const onButton2Click = jest.fn();
		const onRef = jest.fn();

		act(() => {
			ReactDOM.render(
				createElement(function () {
					const [state, setState] = useState(true);
					const ref = useRef(null);

					return createElement(Fragment, null,
						createElement('button', {
							id: 'button1',
							ref: on({
								click: () => {
									onButton1Click();
									setState(!state);
								}
							}, onRef)
						}),
						state ? createElement('button', {
							id: 'button2',
							ref: on({
								click: onButton2Click
							}, ref)
						}) : null
					)
				}),
				root
			);
		});

		expect(onRef).toHaveBeenCalledTimes(1);
		expect(onButton1Click).toHaveBeenCalledTimes(0);
		expect(onButton2Click).toHaveBeenCalledTimes(0);

		act(() => {
			document.getElementById('button1').dispatchEvent(new CustomEvent('click'));
		});

		expect(onRef).toHaveBeenCalledTimes(3);
		expect(onButton1Click).toHaveBeenCalledTimes(1);
		expect(onButton2Click).toHaveBeenCalledTimes(0);
	});

	test('delegates "click" events on different documents', async () => {
		const onButton1Click = jest.fn();
		const onButton2Click = jest.fn();

		act(() => {
			ReactDOM.render(
				createElement('button', {
					id: 'button1',
					ref: on({
						click: onButton1Click
					})
				}),
				root
			);

			ReactDOM.render(
				createElement('button', {
					id: 'button2',
					ref: on({
						click: onButton2Click
					})
				}),
				fragmentRoot
			);
		});

		expect(onButton1Click).toHaveBeenCalledTimes(0);
		expect(onButton2Click).toHaveBeenCalledTimes(0);

		act(() => {
			document.getElementById('button1').dispatchEvent(new CustomEvent('click'));
		});

		expect(onButton1Click).toHaveBeenCalledTimes(1);
		expect(onButton2Click).toHaveBeenCalledTimes(0);

		act(() => {
			fragment.getElementById('button2').dispatchEvent(new CustomEvent('click'));
		});

		expect(onButton1Click).toHaveBeenCalledTimes(1);
		expect(onButton2Click).toHaveBeenCalledTimes(1);
	});
});

