/**
* Returns data from an HTML form element
* @param {Element} form An HTML form element
* @returns {Object} The current values of an HTML form element
*/
function getFormData(form: HTMLFormElement | any): FormLikeData {
	const each = Array.prototype.forEach;
	const data: FormLikeData = {};

	/** Sets form data from an HTML form control element and a value */
	function set(element: HTMLInFormElementsPropertyElement, value: FormDataValue): void {
		data[element.name] = Object.prototype.hasOwnProperty.call(data, element.name) ? [].concat(data[element.name], value) : value;
	}

	// for each form control element
	each.call(form.elements, (element: HTMLInFormElementsPropertyElement) => {
		if (!element.name || (element as HTMLHasDisabledPropertyElement).disabled || element.type === 'submit' || element.type === 'button') {
			// do nothing with unusable form control elements and continue
		} else if (element.type === 'file') {
			// set data from form control file elements
			each.call((element as HTMLInputElement).files, (file: File) => {
				set(element, file);
			});
		} else if (element.type === 'select-one' || element.type === 'select-multiple') {
			// set data from form control select elements
			each.call((element as HTMLSelectElement).options, (option: HTMLOptionElement) => {
				if (!option.disabled && option.selected) {
					set(element, option.value);
				}
			});
		} else if (element.type === 'checkbox' || element.type === 'radio') {
			// set data from form control toggle elements
			if ((element as HTMLInputElement).checked) {
				set(element, (element as HTMLInputElement).value);
			}
		} else {
			// set data from all other form control toggle elements
			set(element, (element as HTMLInputElement).value.replace(/\r\n?|\n/g, '\r\n'));
		}
	});

	return data;
}

export default getFormData;
