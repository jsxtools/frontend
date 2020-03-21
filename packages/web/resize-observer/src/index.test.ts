import polyfillResizeObserver from '.'

beforeAll(() => {
	jest.useFakeTimers()

	jest.spyOn(window, 'requestAnimationFrame').mockImplementation(requestAnimationFrame)
	jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(cancelAnimationFrame)

	function requestAnimationFrame(callback: Function) {
		return setTimeout(callback, 17)
	}

	function cancelAnimationFrame(requestId: number) {
		return clearTimeout(requestId)
	}
})

afterAll(() => {
	window.requestAnimationFrame.mockRestore()
	window.cancelAnimationFrame.mockRestore()

	jest.useFakeTimers()
})

describe('resize-observer', () => {
	const html = window.document.documentElement
	const body = window.document.body

	const svg = body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))

	let observer1
	let observer2

	function defineStyle(node: HTMLElement | SVGElement, style?: { [key: string]: number }) {
		style = Object(style)

		const border = 'border' in style ? Number(style.border) || 0 : 10
		const padding = 'padding' in style ? Number(style.padding) || 0 : 10
		const width = 'width' in style ? Number(style.width) || 0 : 1000
		const height = 'height' in style ? Number(style.height) || 0 : 500

		node.style.boxSizing = 'border-box'
		node.style.paddingTop = node.style.paddingRight = node.style.paddingBottom = node.style.paddingLeft = `${padding}px`
		node.style.borderTopWidth = node.style.borderRightWidth = node.style.borderBottomWidth = node.style.borderLeftWidth = `${border}px`
		node.style.width = `${width}px`
		node.style.height = `${height}px`

		Object.defineProperty(node, 'offsetHeight', { configurable: true, writable: true, value: width })
		Object.defineProperty(node, 'offsetWidth', { configurable: true, writable: true, value: width })
		Object.defineProperty(node, 'clientHeight', { configurable: true, writable: true, value: width - border * 2 })
		Object.defineProperty(node, 'clientWidth', { configurable: true, writable: true, value: width - border * 2 })

		if (node instanceof SVGElement) {
			Object.defineProperty(node, 'height', { configurable: true, writable: true, value: width })
			Object.defineProperty(node, 'width', { configurable: true, writable: true, value: width })
		}
	}

	test('Polyfills ResizeObserver on Window', () => {
		polyfillResizeObserver(window)

		expect(window.ResizeObserver).toBeInstanceOf(Function)
		expect(window.ResizeObserverEntry).toBeInstanceOf(Function)
		expect(window.DOMRectReadOnly).toBeInstanceOf(Function)
	})

	test('Creates ResizeObservers', () => {
		const callback = () => { }

		observer1 = new window.ResizeObserver(callback)
		observer2 = new window.ResizeObserver(callback)

		expect(observer1).toBeInstanceOf(window.ResizeObserver)
		expect(observer2).toBeInstanceOf(window.ResizeObserver)

		expect(() => ResizeObserver(callback)).toThrow()
	})

	test('Observes and unobserves', () => {
		defineStyle(html)
		defineStyle(body, { width: 980, height: 400 })
		defineStyle(svg, { width: 960, height: 400 })

		observer1.observe(body)

		jest.advanceTimersByTime(67)

		observer1.unobserve(body)

		jest.clearAllTimers()
	})

	test('Observes and unobserves thoroughly', () => {
		observer1.observe(null)
		observer1.observe(body)
		observer1.observe(body)
		observer1.observe(html)
		observer1.observe(svg)
		observer2.observe(body)

		jest.advanceTimersByTime(67)

		defineStyle(body, { width: 860, height: 400 })
		defineStyle(svg, { width: 840, height: 400 })

		jest.advanceTimersByTime(67)

		observer1.unobserve(null)
		observer1.unobserve(body)
		observer1.unobserve(body)
		observer1.unobserve(html)
		observer1.unobserve(svg)
		observer2.unobserve(body)

		jest.clearAllTimers()

		defineStyle(body, { width: 980, height: 400 })
		defineStyle(svg, { width: 960, height: 400 })
	})

	test('DOMRectReadOnly', () => {
		const rect = new DOMRectReadOnly(5, 10, 15, 20)

		expect(rect.x).toBe(5)
		expect(rect.y).toBe(10)
		expect(rect.width).toBe(15)
		expect(rect.height).toBe(20)
	})

	test('DOMRectReadOnly without parameters', () => {
		const rect = new DOMRectReadOnly()

		expect(rect.x).toBe(0)
		expect(rect.y).toBe(0)
		expect(rect.width).toBe(0)
		expect(rect.height).toBe(0)
	})

	test('ResizeObserverEntry', () => {
		expect(() => window.ResizeObserverEntry()).toThrow()
	})
})
