# utils [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][monorepo]

[<img alt="npm version" src="https://img.shields.io/npm/v/@jsxtools/utils.svg" height="20">](https://www.npmjs.com/package/@jsxtools/utils)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/monorepo/master.svg" height="20">](https://travis-ci.org/jsxtools/monorepo/utils)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/monorepo/utils.svg" height="20">](https://github.com/jsxtools/monorepo/issues?q=is:issue+is:open+label:utils)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/monorepo/utils.svg" height="20">](https://github.com/jsxtools/monorepo/pulls?q=is:pr+is:open+label:utils)

**utils** is a tree-shakable collection of utilities for JavaScript.

It is <strong size>321 bytes</strong>.

## Installation

```sh
npm install @jsxtools/utils
```

## classes

**classes** returns a normalized string of class names from strings, arrays, or objects.

```js
import { classes } from '@jsxtools/utils';

classes('this', 'that', 'this'); // 'this that'
classes(['this', 'that', 'this']); // 'this that'
classes({ 'this': true, 'that': true, 'else': false }); // 'this that'
```

## debounce

**debounce** returns a function that throttles updates coming in rapid succession.

```js
import { debounce } from '@jsxtools/utils';

window.addEventListener('resize', debounce(() => {
  // resize events
}, 250, true));
```

## is-equal

**is-equal** returns whether two values are the same value.

```js
import { isEqual } from '@jsxtools/utils';

// these objects are shallow equal
objectA = { name: 'Adam', age: 930 };
objectB = { name: 'Adam', age: 930 };
isEqual(objectA, objectB);

// these objects are not shallow equal
objectA = { name: 'Adam', age: 930, pets: ['dog'] };
objectB = { name: 'Adam', age: 930, pets: ['dog'] };
isEqual(objectA, objectB);

// but they are deeply equal
isEqual(objectA, objectB, isEqual);
```

## is-type

**is-type** is a collection of functions that return whether a value is a certain type.

```js
import { isArray, isBoolean, isNumber, isObject, isString } from '@jsxtools/utils';

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

## prevent-default

**prevent-default** returns a function that invokes `preventDefault` on any `event` passed into it.

```js
import { preventDefault } from '@jsxtools/utils';

document.querySelector('form').addEventListener('submit', preventDefault(() => {
  // handle submission via JS without submission
}));
```

## uid

**uid** returns a unique URL-safe ID.

```js
import { uid } from '@jsxtools/utils';

// give <body> a unique ID with 5 characters, like "wAl_H"
// in 1s at 4000 IDs/s it has a 1% probability of at least 1 collision
document.body.id = uid(5);

// give <body> a unique ID like "wAl_Hh9fYRe"
// in 4d at 4000 IDs/s it has a 1% probability of at least 1 collision
document.body.id = uid(11);

// give <body> a unique ID like "wAl_Hh9fYReEakFYN-7qr"
// in 10,000,000y at 4000 IDs/s it has a 1% probability of at least 1 collision
document.body.id = uid(21);
```

[monorepo]: https://github.com/jsxtools/monorepo
