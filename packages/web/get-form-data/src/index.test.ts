import getFormData from '.';

const formOuterHTML = `<form id="form">
<input type="text" name="someText" value="Chris" />
<input type="file" name="someFile" />
<input type="file" name="someFiles" multiple />
<input type="checkbox" name="someCheckbox" value="Dog" checked />
<input type="checkbox" name="someCheckbox" value="Cat" checked />
<input type="checkbox" name="someCheckboxAgain" checked />
<input type="radio" name="someRadio" value="Dog" checked />
<input type="radio" name="someRadio" value="Cat" />
<select name="someSelectOne">
	<option selected>First</option>
	<option>Second</option>
	<option>Third</option>
</select>
<select name="someSelectMultiple" multiple>
	<option>First</option>
	<option selected>Second</option>
	<option selected>Third</option>
</select>
<textarea name="someTextarea">A place for everything.
And everything in its place.</textarea>
<input type="hidden" name="someHidden" value="something hidden" />
<button type="submit">Submit</button>
</form>`;

describe('get-form-data', () => {
	let body: HTMLBodyElement;
	let form: HTMLFontElement;
	let inputFile: HTMLInputElement;

	test('set body innerhtml with form', () => {
		body = document.body as HTMLBodyElement;
		expect(body.localName).toBe('body');

		body.innerHTML = formOuterHTML;
		form = body.firstChild as HTMLFontElement;
		expect(form.localName).toBe('form');
	});

	test('set input[type="file"] with files', () => {
		inputFile = form.querySelector('[type="file"]') as HTMLInputElement;
		expect(inputFile.localName).toBe('input');
		expect(inputFile.type).toBe('file');
		const file = new File([], '', { type: 'application/octet-stream' });
		expect(file).toBeInstanceOf(File);
		const files = Object.create(FileList.prototype, { 0: { value: file }, length: { value: 1 } } );
		expect(files).toBeInstanceOf(FileList);
		Object.defineProperty(inputFile, 'files', {
			configurable: true,
			value: files,
			writable: true,
		});
	});

	test('get form data', () => {
		const data = getFormData(form);

		expect(data).toBeInstanceOf(Object);
		expect(data).toMatchSnapshot();
	});
});
