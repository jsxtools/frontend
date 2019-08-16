import uid from '.';
import crypto from 'crypto';

const hasCrypto = 'crypto' in window;

beforeAll(() => {
	if (!hasCrypto) {
		Object.defineProperty(window, 'crypto', {
			configurable: true,
			value: {
				getRandomValues (array: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView) {
					return crypto.randomFillSync(array);
				}
			},
			writable: true,
		});
	}
});

afterAll(() => {
	if (!hasCrypto) {
		delete window.crypto;
	}
});

test('is-type: works on booleans, numbers, strings, arrays, and objects', () => {
	const uid5a = uid(5);
	const uid5b = uid(5);
	const uid5c = uid(5);

	expect(uid5a).toHaveLength(5);
	expect(uid5b).toHaveLength(5);
	expect(uid5c).toHaveLength(5);
	expect(uid5a).not.toBe(uid5b);
	expect(uid5a).not.toBe(uid5c);
	expect(uid5b).not.toBe(uid5c);
	expect(uid5b).not.toBe(uid5a);
	expect(uid5c).not.toBe(uid5a);
	expect(uid5c).not.toBe(uid5b);
});
