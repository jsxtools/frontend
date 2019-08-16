declare type Item = string | ItemArray | ItemObject;
declare interface ItemArray extends Array<Item> { }
declare interface ItemObject { [key: string]: any; }

declare type classes = (...args: Item[]) => string;

/**
* Returns a normalized string of class names from strings, arrays, or objects.
* @param [args] strings, arrays, or objects of class names.
*/
const classes:classes = function classes () { // eslint-disable-line no-unused-vars
	const hash = {};

	Array.prototype.forEach.call(arguments, push);

	return Object.keys(hash).join(' ');

	function push(item: Item) {
		if (Array.isArray(item)) {
			Array.prototype.forEach.call(item, push);
		} else if (item === Object(item)) {
			Object.keys(item).forEach(name => {
				if (item[name]) {
					push(name);
				}
			});
		} else {
			String(item)
				.trim()
				.split(/\s+/)
				.forEach(name => {
					hash[name] = true;
				});
		}
	}
}

export default classes;
