import classes from '.';

test('classes: works on strings, arrays, and objects', () => {
	expect(classes('this', 'that', 'this')).toBe('this that');
	expect(classes(['this', 'that', 'this'])).toBe('this that');
	expect(classes({ 'this': true, 'that': true, 'else': false })).toBe('this that');
});
