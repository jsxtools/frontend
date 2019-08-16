# debounce [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][monorepo]

[<img alt="npm version" src="https://img.shields.io/npm/v/@jsxtools/debounce.svg" height="20">](https://www.npmjs.com/package/@jsxtools/debounce)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/monorepo/master.svg" height="20">](https://travis-ci.org/jsxtools/monorepo/debounce)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/monorepo/debounce.svg" height="20">](https://github.com/jsxtools/monorepo/issues?q=is:issue+is:open+label:debounce)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/monorepo/debounce.svg" height="20">](https://github.com/jsxtools/monorepo/pulls?q=is:pr+is:open+label:debounce)

_debounce_ returns a debounced function that delays invoking `func` until `wait` milliseconds have elapsed since `func` was last invoked.

It is <strong size>154 bytes</strong>.

## Installation

```sh
npm install @jsxtools/debounce
```

## Usage

```js
import debounce from '@jsxtools/debounce';

window.addEventListener('resize', debounce(() => {
  // resize events
}, 250, true));
```
