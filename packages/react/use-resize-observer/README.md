# use-resize-observer [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][frontend]

[<img alt="npm version" src="https://img.shields.io/npm/v/@jsxtools/use-resize-observer.svg" height="20">](https://www.npmjs.com/package/@jsxtools/use-resize-observer)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/frontend/master.svg" height="20">](https://travis-ci.org/github/jsxtools/frontend)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/frontend/use-resize-observer.svg" height="20">](https://github.com/jsxtools/frontend/issues?q=is:issue+is:open+label:use-resize-observer)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/frontend/use-resize-observer.svg" height="20">](https://github.com/jsxtools/frontend/pulls?q=is:pr+is:open+label:use-resize-observer)

**use-resize-observer** lets you get the observable size of an element in React.

It is <strong size>625 bytes (332 gzipped)</strong>.

## Installation

```sh
npm install @jsxtools/use-resize-observer
```

## Usage

```js
import useResizeObserver from '@jsxtools/use-resize-observer';

export default function MyComponent() {
  let { ref, width, height } = useResizeObserver()

  return (
    <div ref={ref}>{width}x{height}</div>
  );
}
```

[frontend]: https://github.com/jsxtools/frontend
