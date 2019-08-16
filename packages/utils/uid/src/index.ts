/**
* Returns a unique URL-safe ID.
* @param size {number}
*/
function uid (size: number): string {
	const bytes = window.crypto.getRandomValues(new Uint8Array(size));

	let id = '';

	while (0 < size--) {
		id += "Uint8AraygeRdomVlus012345679BCDEFGHIJKLMNOPQSTWXYZbcfhjkpqvwxz_-"[63 & bytes[size]];
	}

	return id;
}

export default uid;
