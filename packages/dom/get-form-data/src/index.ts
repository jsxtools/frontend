/** An HTML form control element that can be disabled */
declare type HTMLHasDisabledPropertyElement = HTMLButtonElement | HTMLFieldSetElement | HTMLInputElement | HTMLLinkElement | HTMLOptGroupElement | HTMLOptionElement | HTMLSelectElement | HTMLTextAreaElement;

/** An HTML form control element accessible from the elements property */
declare type HTMLInFormElementsPropertyElement = HTMLButtonElement | HTMLFieldSetElement | HTMLInputElement | HTMLObjectElement | HTMLOutputElement | HTMLSelectElement | HTMLTextAreaElement;

/** A collection of HTML form control elements. */
declare interface HTMLFormControlsCollection {
	[index: number]: HTMLInFormElementsPropertyElement
}

/** An HTML form element in the DOM; it allows access to and in some cases modification of aspects of the form, as well as access to its component elements. */
declare interface HTMLFormElement {
	elements: HTMLFormControlsCollection
}

/** The current value of an HTML form control element */
declare type FormDataValue = string | File;

/** The current values of an HTML form element */
declare interface FormData {
	[name: string]: FormDataValue | FormDataValue[];
}

/**
* Returns data from an HTML form element
* @param {Element} form An HTML form element
* @returns {Object} The current values of an HTML form element
*/
function getFormData(form: HTMLFormElement | any): FormData {
	const each = Array.prototype.forEach;
	const data: FormData = {};

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
