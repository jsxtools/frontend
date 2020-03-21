/* eslint-disable no-unused-vars */

/** Interface reporting changes to the content or border box dimensions of an Element, or the bounding box of an SVGElement. */
declare class ResizeObserver {
	constructor(callback: Function);
	observe(target: HTMLElement | SVGElement): void;
	unobserve(target: HTMLElement | SVGElement): void;
}

/** Object passed to the ResizeObserver() constructor's callback function. */
declare class ResizeObserverEntry {
	target: HTMLElement | SVGElement;
	contentRect: DOMRectReadOnly;
}

/* eslint-enable no-unused-vars */

/** Function called whenever an observed resize occurs. */
declare type ResizeObserverCallback = (
	entries: ResizeObserverEntry[],
	observer: ResizeObserver,
) => void

/** Method to polyfill the specified Window. */
function polyfillResizeObserver(window) {
	const __CallbackMap: WeakMap<
		ResizeObserver,
		ResizeObserverCallback
	> = new WeakMap()
	const __SizeMap: WeakMap<HTMLElement | SVGElement, [number, number]> = new WeakMap()
	const __StyleMap: WeakMap<HTMLElement | SVGElement, CSSStyleDeclaration> = new WeakMap()
	const __TargetMap: WeakMap<HTMLElement | SVGElement, Set<ResizeObserver>> = new WeakMap()
	const __TargetSet: Set<HTMLElement | SVGElement> = new Set()

	let __RequestId: number

	/** Interface reporting changes to the content or border box dimensions of an Element, or the bounding box of an SVGElement. */
	function ResizeObserver(
		this: ResizeObserver,
		callback: ResizeObserverCallback
	): void {
		if (this instanceof ResizeObserver) {
			__CallbackMap.set(this, callback)
		} else {
			throw new TypeError("Constructor requires 'new' operator")
		}
	}

	/** Method to start observing the specified Element or SVGElement. @memberof ResizeObserver */
	ResizeObserver.prototype.observe = function observe(target: HTMLElement | SVGElement) {
		if (target instanceof window.Element) {
			if (!__TargetMap.has(target)) {
				__TargetMap.set(target, new Set())
				__TargetSet.add(target)
				__StyleMap.set(target, window.getComputedStyle(target))
			}

			var __ObserverSet: Set<ResizeObserver> = __TargetMap.get(target)

			if (!__ObserverSet.has(this)) {
				__ObserverSet.add(this)
			}

			cancelAnimationFrame(__RequestId)

			__RequestId = requestAnimationFrame(loop)
		}
	}

	/** Method to stop observing the specified Element or SVGElement. @memberof ResizeObserver */
	ResizeObserver.prototype.unobserve = function observe(target: HTMLElement | SVGElement) {
		if (
			target instanceof window.Element &&
			__TargetMap.has(target)
		) {
			var __ObserverSet: Set<ResizeObserver> = __TargetMap.get(target)

			if (__ObserverSet.has(this)) {
				__ObserverSet.delete(this)

				if (!__ObserverSet.size) {
					__TargetMap.delete(target)
					__TargetSet.delete(target)
				}
			}

			if (!__ObserverSet.size) {
				__TargetMap.delete(target)
			}

			if (!__TargetSet.size) {
				cancelAnimationFrame(__RequestId)
			}
		}
	}

	/** Object passed to the ResizeObserver() constructor's callback function. @class */
	function ResizeObserverEntry() {
		throw new TypeError('Function is not a constructor')
	}

	/** Immutable Rectangle. @class */
	function DOMRectReadOnly(x?: number, y?: number, width?: number, height?: number) {
		x = 0 in arguments ? Number(arguments[0]) : 0
		y = 1 in arguments ? Number(arguments[1]) : 0
		width = 2 in arguments ? Number(arguments[2]) : 0
		height = 3 in arguments ? Number(arguments[3]) : 0

		this.right = (this.x = this.left = x) + (this.width = width)
		this.bottom = (this.y = this.top = y) + (this.height = height)

		Object.freeze(this)
	}

	function loop() {
		__RequestId = requestAnimationFrame(loop)

		var __ObserverMap: WeakMap<ResizeObserver, (ResizeObserverEntry)[]> = new WeakMap()
		var __ObserverSet: Set<ResizeObserver> = new Set()

		__TargetSet.forEach(function (target) {
			__TargetMap.get(target).forEach(function (observer) {
				var isSVG = target instanceof window.SVGElement

				var style = __StyleMap.get(target)

				var paddingTop = isSVG ? 0 : parseFloat(style.paddingTop)
				var paddingRight = isSVG ? 0 : parseFloat(style.paddingRight)
				var paddingBottom = isSVG ? 0 : parseFloat(style.paddingBottom)
				var paddingLeft = isSVG ? 0 : parseFloat(style.paddingLeft)
				var borderTop = isSVG ? 0 : parseFloat(style.borderTopWidth)
				var borderRight = isSVG ? 0 : parseFloat(style.borderRightWidth)
				var borderBottom = isSVG ? 0 : parseFloat(style.borderBottomWidth)
				var borderLeft = isSVG ? 0 : parseFloat(style.borderLeftWidth)
				var horizontalPadding = paddingLeft + paddingRight
				var verticalPadding = paddingTop + paddingBottom
				var horizontalBorderArea = borderLeft + borderRight
				var verticalBorderArea = borderTop + borderBottom
				var horizontalScrollbarThickness = isSVG ? 0 :
					(target as HTMLElement).offsetHeight - verticalBorderArea - target.clientHeight
				var verticalScrollbarThickness = isSVG ? 0 :
					(target as HTMLElement).offsetWidth - horizontalBorderArea - target.clientWidth
				var widthReduction = horizontalPadding + horizontalBorderArea
				var heightReduction = verticalPadding + verticalBorderArea
				var contentWidth = isSVG
					? (target as SVGElement & { width: number }).width
					: parseFloat(style.width) -
					widthReduction -
					verticalScrollbarThickness
				var contentHeight = isSVG
					? (target as SVGElement & { height: number }).height
					: parseFloat(style.height) -
					heightReduction -
					horizontalScrollbarThickness

				if (__SizeMap.has(target)) {
					var last = __SizeMap.get(target)

					if (last[0] === contentWidth && last[1] === contentHeight) {
						return
					}
				}

				__SizeMap.set(target, [contentWidth, contentHeight])

				/** Interface reporting changes to the content or border box dimensions of an Element, or the bounding box of an SVGElement. */
				var resizeObserverEntry: ResizeObserverEntry = Object.create(ResizeObserverEntry.prototype)

				resizeObserverEntry.target = target
				resizeObserverEntry.contentRect = new DOMRectReadOnly(
					paddingLeft,
					paddingTop,
					contentWidth,
					contentHeight
				)

				if (!__ObserverMap.has(observer)) {
					__ObserverMap.set(observer, [])
					__ObserverSet.add(observer)
				}

				__ObserverMap.get(observer).push(resizeObserverEntry)
			})
		})

		__ObserverSet.forEach(function (observer) {
			__CallbackMap
				.get(observer)
				.call(observer, __ObserverMap.get(observer), observer)
		})
	}

	window.DOMRectReadOnly = DOMRectReadOnly
	window.ResizeObserver = ResizeObserver
	window.ResizeObserverEntry = ResizeObserverEntry

	return window
}


export default polyfillResizeObserver
