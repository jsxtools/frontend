/** A Ref function that accepts an Node or null. */
interface Ref {
	(node: Node | null): void
}

/** A tuple of the root, its events by type, and node tuples. */
declare interface RootTuple {
	0: Node;
	1: RootEvents;
	2: NodeTuple[];
}

/** An object of the number of listeners attached to a root by event type. */
declare interface RootEvents {
	[name: string]: number
}

/** A tuple of a node and its events by type. */
declare interface NodeTuple {
	0: Node;
	1: Events;
}

/** A collection of event listeners. */
declare interface Events extends Object {
	[name: string]: Function
}

function on(events: Events, ref?: Function | { current: Node | null }): Ref {
	let node: Node, rootTuple: RootTuple;

	return function (nextNode: Node): void {
		if (node) {
			// if a cached node exists, the ref is being rewritten

			// remove all events from the cached node and cached root tuple by type
			Object.keys(events).forEach(function (type, index, types) {
				// remove the number of events from the cached root tuple
				rootTuple[1][type] -= types.length;

				if (!rootTuple[1][type]) {
					// if all events of this type have been removed, remove the listener
					rootTuple[0].removeEventListener(type, rootListener, true);

					// and remove the reference to this event
					delete rootTuple[1][type];
				}
			});

			rootTuple[2] = rootTuple[2].filter(function (nodeTuple) {
				// nodeTuple = [ node, nodeEvents ]
				return nodeTuple[0] !== node
			});

			// remove the cached node and cached root tuple from memory
			node = rootTuple = void 0;
		}

		if (nextNode) {
			// if a node is being passed, a new ref is being written
			node = nextNode;

			// retrieve any existing tuple of the root node, its events, and its node tuples
			rootTuple = find(rootTuples, function (possibleRootTuple: RootTuple) {
				return getRootNode(node) === possibleRootTuple[0];
			});

			if (!rootTuple) {
				// otherwise, create a new tuple of the root node, its events, and its node tuples
				rootTuples.push(rootTuple = [ getRootNode(node), {}, [] ]);
			}

			// add any unattached events to the root node
			Object.keys(events).forEach(function (type, index, types) {
				if (rootTuple[1].hasOwnProperty(type)) {
					// if events of this type have been added, add the number of events being added
					rootTuple[1][type] += types.length;
				} else {
					// otherwise, if events of this type have not been added, add the listener
					rootTuple[0].addEventListener(type, rootListener, true);

					// add a reference to this event with the number of events being added by this type
					rootTuple[1][type] = types.length;
				}
			});

			// add the node tuple of the node and its events
			rootTuple[2].push([ node, events ]);
		}

		if (ref === Object(ref)) {
			if (typeof ref === 'function') {
				// allow ref functions
				ref(nextNode);
			} else {
				// allow ref objects
				ref.current = nextNode;
			}
		}
	};
}

// rootListener
function rootListener(event: Event) {
	// rootTuple = [ root, rootEvents, nodeTuples ]
	const rootTuple = find(rootTuples, function (possibleRootTuple: RootTuple) {
		return getRootNode((<Node>event.target)) === possibleRootTuple[0];
	});

	// nodeTuple = [ node, nodeEvents ]
	rootTuple[2].slice(0).forEach(function (nodeTuple: NodeTuple) {
		if (
			nodeTuple[1].hasOwnProperty(event.type) &&
			nodeTuple[0].contains(<Node>event.target)
		) {
			nodeTuple[1][event.type].call(nodeTuple[0], event);
		}
	});
}

// find
function find(array: Array<any>, callback: Function) {
	let returnValue = null;

	array.some(function (item) {
		if (callback.call(array, item)) {
			returnValue = item;

			return true;
		}
	});

	return returnValue;
}

function getRootNode(node: Node) {
	while (node.parentNode) node = node.parentNode;
	return node;
}

// rootTuples
const rootTuples = [];

export default on;
