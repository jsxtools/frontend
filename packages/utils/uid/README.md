# uid [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][monorepo]

[<img alt="npm version" src="https://img.shields.io/npm/v/@jsxtools/uid.svg" height="20">](https://www.npmjs.com/package/@jsxtools/uid)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/monorepo/master.svg" height="20">](https://travis-ci.org/jsxtools/monorepo/uid)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/monorepo/uid.svg" height="20">](https://github.com/jsxtools/monorepo/issues?q=is:issue+is:open+label:uid)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/monorepo/uid.svg" height="20">](https://github.com/jsxtools/monorepo/pulls?q=is:pr+is:open+label:uid)

**uid** returns a unique URL-safe ID.

It is <strong size>205 bytes</strong>.

## Installation

```sh
npm install @jsxtools/uid
```

## Usage

```js
import uid from '@jsxtools/uid';

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
