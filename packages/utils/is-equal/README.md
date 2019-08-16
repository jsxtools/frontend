# is-equal [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][monorepo]

[<img alt="npm version" src="https://img.shields.io/npm/v/@jsxtools/is-equal.svg" height="20">](https://www.npmjs.com/package/@jsxtools/is-equal)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/monorepo/master.svg" height="20">](https://travis-ci.org/jsxtools/monorepo/is-equal)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/monorepo/is-equal.svg" height="20">](https://github.com/jsxtools/monorepo/issues?q=is:issue+is:open+label:is-equal)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/monorepo/is-equal.svg" height="20">](https://github.com/jsxtools/monorepo/pulls?q=is:pr+is:open+label:is-equal)

**is-equal** returns whether two values are the same value.

It is <strong size>211 bytes</strong>.

## Installation

```sh
npm install @jsxtools/is-equal
```

## Usage

```js
import isEqual from '@jsxtools/is-equal';

const isShallowEqual = isEqual(prevObject, nextObject);

const isDeepEqual = isEqual(prevObject, nextObject, isEqual);
```
