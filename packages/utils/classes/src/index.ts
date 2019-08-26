declare interface ClassArray extends Array<ClassValue> { }
declare interface ClassObject { [key: string]: any; }
declare type Classes = (...args: ClassValue[]) => string;
declare type ClassValue = string | ClassArray | ClassObject;

/**
* Returns a normalized string of class names from strings, arrays, or objects.
* @param [args] strings, arrays, or objects of class names.
*/
const classes:Classes = function classes () {
	const hash = {};

	Array.prototype.forEach.call(arguments, push);

	return Object.keys(hash).join(' ');

	function push(item: ClassValue) {
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
