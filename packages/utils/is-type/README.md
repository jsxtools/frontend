# is-type [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][frontend]

[<img alt="npm version" src="https://img.shields.io/npm/v/@jsxtools/is-type.svg" height="20">](https://www.npmjs.com/package/@jsxtools/is-type)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/frontend/master.svg" height="20">](https://travis-ci.org/jsxtools/frontend/is-type)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/frontend/is-type.svg" height="20">](https://github.com/jsxtools/frontend/issues?q=is:issue+is:open+label:is-type)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/frontend/is-type.svg" height="20">](https://github.com/jsxtools/frontend/pulls?q=is:pr+is:open+label:is-type)

**is-type** is a collection of functions that return whether a value is a certain type.

It is <strong size>280 bytes (173 gzipped)</strong>.

## Installation

```sh
npm install @jsxtools/is-type
```

## Usage

```js
import { isArray, isBoolean, isNumber, isObject, isString } from '@jsxtools/is-type';

isArray(''); // false
isArray([]); // true
isArray({}); // false

isBoolean(false); // true
isBoolean(0); // false
isBoolean(!0); // true

isNumber(0); // true
isNumber(Infinity); // false
isNumber(NaN); // false
isNumber('0'); // false

isObject({}); // true
isObject([]); // true
isObject(''); // false

isString(''); // true
isString([]); // false
isString({}); // false
```

[frontend]: https://github.com/jsxtools/frontend
