# is-type [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][monorepo]

[<img alt="npm version" src="https://img.shields.io/npm/v/@jsxtools/is-type.svg" height="20">](https://www.npmjs.com/package/@jsxtools/is-type)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/monorepo/master.svg" height="20">](https://travis-ci.org/jsxtools/monorepo/is-type)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/monorepo/is-type.svg" height="20">](https://github.com/jsxtools/monorepo/issues?q=is:issue+is:open+label:is-type)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/monorepo/is-type.svg" height="20">](https://github.com/jsxtools/monorepo/pulls?q=is:pr+is:open+label:is-type)

**is-type** is a collection of functions that return whether a value is a certain type.

It is <strong size>422 bytes (222 gzipped)</strong>.

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

[monorepo]: https://github.com/jsxtools/monorepo
