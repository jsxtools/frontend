import { createElement, useRef, useState } from 'react'
import { act, create } from 'react-test-renderer'
import useResizeObserver from '.'

describe('use-resize-observer', () => {
	beforeEach(() => {
		// @ts-ignore
		global.ResizeObserver = class ResizeObserver {
			constructor(callback) {
				// @ts-ignore
				this._callback = callback
				// @ts-ignore
				this._elements = new Set()
			}
			disconnect() {
				// @ts-ignore
				this._elements = new Set()
			}
			observe(element) {
				const self = this
				// @ts-ignore
				this._elements.add(element)
				const { style } = element
				Object.defineProperty(element, 'style', {
					value: new Proxy(style, {
						set(target, property, value) {
							style[property] = value
							if (
								property === 'width'
								|| property === 'height'
							) {
								// @ts-ignore
								if (typeof self._callback === 'function') {
									// @ts-ignore
									self._callback([{
										contentRect: {
											width: parseFloat(style.width),
											height: parseFloat(style.height)
										}
									}])
								}
							}
							return true
						}
					})
				})
			}
		}
	})

	afterEach(() => {
		// @ts-ignore
		delete global.ResizeObserver
	})

	const rendererSpy = jest.fn()
	let createNodeMock = Function.prototype
	const wrapper = create(null, {
		createNodeMock(element) {
			createNodeMock(element)
		}
	})
	let scopedState: any

	test('exists', () => {
		expect(useResizeObserver).toBe(useResizeObserver)
	})

	test('gets initial metrics', () => {
		act(() => {
			wrapper.update(null)
		})

		expect(rendererSpy).toHaveBeenCalledTimes(0)
		expect(scopedState).not.toBeDefined()
	})

	test('can observe size', () => {
		const element = {
			style: {
				height: `0px`,
				width: `0px`,
			} as CSSStyleDeclaration
		} as HTMLElement

		createNodeMock = () => element

		act(() => {
			wrapper.update(createElement(function () {
				const { ref, width, height } = useResizeObserver()
				rendererSpy()
				scopedState = { width, height }

				return createElement('textarea', {
					ref(current) {
						if (typeof ref === 'function') {
							ref(current === undefined ? element : null)
						}
					},
					style: scopedState,
					onClick(event) {
						event.target.style.width = '9px'
						event.target.style.height = '5px'
					}
				}, `${width}x${height}`)
			}, null))
		})

		expect(rendererSpy).toHaveBeenCalledTimes(1)
		expect(scopedState).toBeDefined()
		expect(scopedState).toEqual({ width: 0, height: 0 })
		expect(wrapper.root.findByType('textarea').props.children).toEqual(`0x0`)

		act(() => {
			wrapper.root.findByType('textarea').props.onClick({
				target: element
			})
		})

		expect(rendererSpy).toHaveBeenCalledTimes(2)
		expect(scopedState).toEqual({ width: 9, height: 5 })
		expect(wrapper.root.findByType('textarea').props.children).toEqual(`9x5`)
	})

	test('works without ResizeOberver (SSR)', () => {
		const element = {
			style: {
				height: `0px`,
				width: `0px`,
			} as CSSStyleDeclaration
		} as HTMLElement

		// @ts-ignore
		delete global.ResizeObserver

		act(() => {
			wrapper.update(createElement(function () {
				const { ref, width, height } = useResizeObserver()
				rendererSpy()
				scopedState = { width, height }

				return createElement('textarea', {
					ref(current) {
						if (typeof ref === 'function') {
							ref(current === undefined ? element : null)
						}
					},
					style: scopedState,
					onClick(event) {
						event.target.style.width = '9px'
						event.target.style.height = '5px'
					}
				}, `${width}x${height}`)
			}, null))
		})

		expect(rendererSpy).toHaveBeenCalledTimes(3)
		expect(scopedState).toBeDefined()
		expect(scopedState).toEqual({ width: 0, height: 0 })
		expect(wrapper.root.findByType('textarea').props.children).toEqual(`0x0`)

		act(() => {
			wrapper.root.findByType('textarea').props.onClick({
				target: element
			})
		})

		expect(rendererSpy).toHaveBeenCalledTimes(3)
		expect(scopedState).toEqual({ width: 0, height: 0 })
		expect(wrapper.root.findByType('textarea').props.children).toEqual(`0x0`)
	})

	test('works without alternative ref', async () => {
		const element = new class HTMLButtonElement {} as HTMLElement
		Object.assign(element, {
			style: {
				height: `0px`,
				width: `0px`,
			} as CSSStyleDeclaration
		})
		const clickEvent = { target: element }
		let promise = Promise.resolve()
		let hasBeenFlushed = false

		createNodeMock = (reactElement) => {
			if (!hasBeenFlushed) {
				hasBeenFlushed = true
				promise = promise.then(() => {
					act(() => {
						reactElement.props.onLoad()
					})
				})
			}
			return element
		}

		act(() => {
			wrapper.update(createElement(function () {
				const ref = useRef(null)
				const [, setToggle] = useState(false)
				const [display, setDisplay] = useState(true)
				const { width, height } = useResizeObserver({ ref })
				rendererSpy()
				scopedState = { width, height }

				return display ? createElement('textarea', {
					ref,
					style: scopedState,
					onClick(event) {
						event.target.style.width = '9px'
						event.target.style.height = '5px'
					},
					onLoad() {
						ref.current = element
						setToggle(true)
					},
					onUnload() {
						setDisplay(false)
					}
				}, `${width}x${height}`) : null
			}, null))
		})

		await promise

		expect(rendererSpy).toHaveBeenCalledTimes(5)
		expect(scopedState).toBeDefined()
		expect(scopedState).toEqual({ width: 0, height: 0 })
		expect(wrapper.root.findByType('textarea').props.children).toEqual(`0x0`)

		act(() => {
			wrapper.root.findByType('textarea').props.onClick(clickEvent)
		})

		expect(rendererSpy).toHaveBeenCalledTimes(6)
		expect(scopedState).toEqual({ width: 9, height: 5 })
		expect(wrapper.root.findByType('textarea').props.children).toEqual(`9x5`)

		act(() => {
			wrapper.root.findByType('textarea').props.onUnload()
		})

		expect(rendererSpy).toHaveBeenCalledTimes(7)
	})
})
