# resize-observer [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][frontend]

[<img alt="npm version" src="https://img.shields.io/npm/v/@jsxtools/resize-observer.svg" height="20">](https://www.npmjs.com/package/@jsxtools/resize-observer)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/frontend/master.svg" height="20">](https://travis-ci.org/jsxtools/frontend/resize-observer)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/frontend/resize-observer.svg" height="20">](https://github.com/jsxtools/frontend/issues?q=is:issue+is:open+label:resize-observer)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/frontend/resize-observer.svg" height="20">](https://github.com/jsxtools/frontend/pulls?q=is:pr+is:open+label:resize-observer)

**resize-observer** is a minimal polyfill for the ResizeObserver API, following the [Resize Observer Specification].

It is <strong size>1946 bytes (852 gzipped)</strong>.

## Installation

```sh
npm install @jsxtools/resize-observer
```

## Usage

```js
import polyfillResizeObserver from '@jsxtools/resize-observer'

// polyfill ResizeObserver
polyfillResizeObserver(window)
```

```js
import polyfillResizeObserver from '@jsxtools/resize-observer'

// ponyfill ResizeObserver
const { ResizeObserver, ResizeObserverEntry, DOMRectReadOnly } = polyfillResizeObserver({})
```

## Acknowledgments

The algorithms used to calculate the dimensions of an element follow the excellent [resize-observer] project authored by [Tremayne Christ].
That polyfill is a small, performant, and more complete polyfill that follows the latest draft specification.

[frontend]: https://github.com/jsxtools/frontend
[Resize Observer Specification]: https://www.w3.org/TR/resize-observer/
[resize-observer]: https://github.com/juggle/resize-observer
[Tremayne Christ]: https://www.npmjs.com/~trem
