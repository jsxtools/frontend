import { Ref } from 'react' // eslint-disable-line no-unused-vars
import { useMemo, useState } from 'react'

function useResizeObserver<T extends HTMLElement>(opts?: {
	ref?: Ref<T>
	width?: number
	height?: number
}) {
	opts = Object(opts)
	const [[width, height], setSize] = useState(() => [
		Number(opts.width) || 0,
		Number(opts.height) || 0,
	])
	const [observer] = useState(
		() => (
			typeof ResizeObserver === 'function'
				? new ResizeObserver(([{ contentRect: { width, height } }]) => setSize([width, height]))
				: { disconnect() { }, observe() { } }
		)
	)
	const ref = useMemo(
		() => {
			let ref = Object(opts.ref)
			if ('current' in ref) {
				if (ref.current) observer.observe(ref.current)
				else observer.disconnect()
			} else {
				ref = (current: T) => (
					current ? observer.observe(current) : observer.disconnect()
				)
				ref.current = null
			}
			return ref
		},
		[Object(opts.ref).current || null, observer]
	)
	return { ref, width, height }
}

export default useResizeObserver
