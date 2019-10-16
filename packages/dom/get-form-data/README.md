# get-form-data [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][frontend]

[<img alt="npm version" src="https://img.shields.io/npm/v/@jsxtools/get-form-data.svg" height="20">](https://www.npmjs.com/package/@jsxtools/get-form-data)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/frontend/master.svg" height="20">](https://travis-ci.org/jsxtools/frontend/get-form-data)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/frontend/get-form-data.svg" height="20">](https://github.com/jsxtools/frontend/issues?q=is:issue+is:open+label:get-form-data)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/frontend/get-form-data.svg" height="20">](https://github.com/jsxtools/frontend/pulls?q=is:pr+is:open+label:get-form-data)

**get-form-data** returns data from an HTML form element as an object.

It is <strong size>543 bytes (305 gzipped)</strong>.

## Installation

```sh
npm install @jsxtools/get-form-data
```

## Usage

```html
<form id="form">
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
</form>
```

```js
import getFormData from '@jsxtools/get-form-data';

const data = getFormData(document.getElementById('form'));
/* data = Object {
  "someCheckbox": Array [
    "Dog",
    "Cat",
  ],
  "someCheckboxAgain": "on",
  "someFile": File {},
  "someHidden": "something hidden",
  "someRadio": "Dog",
  "someSelectMultiple": Array [
    "Second",
    "Third",
  ],
  "someSelectOne": "First",
  "someText": "Chris",
  "someTextarea": "A place for everything.\r\nAnd everything in its place.",
} */
```

[frontend]: https://github.com/jsxtools/frontend
