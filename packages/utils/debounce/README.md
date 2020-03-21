# debounce [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][frontend]

[<img alt="npm version" src="https://img.shields.io/npm/v/@jsxtools/debounce.svg" height="20">](https://www.npmjs.com/package/@jsxtools/debounce)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/frontend/master.svg" height="20">](https://travis-ci.org/github/jsxtools/frontend)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/frontend/debounce.svg" height="20">](https://github.com/jsxtools/frontend/issues?q=is:issue+is:open+label:debounce)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/frontend/debounce.svg" height="20">](https://github.com/jsxtools/frontend/pulls?q=is:pr+is:open+label:debounce)

**debounce** returns a function that throttles updates coming in rapid succession.

It is <strong size>176 bytes (142 gzipped)</strong>.

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

[frontend]: https://github.com/jsxtools/frontend
