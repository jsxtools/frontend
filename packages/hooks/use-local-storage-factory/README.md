# use-local-storage-factory [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][frontend]

[<img alt="npm version" src="https://img.shields.io/npm/v/@jsxtools/use-local-storage-factory.svg" height="20">](https://www.npmjs.com/package/@jsxtools/use-local-storage-factory)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/frontend/master.svg" height="20">](https://travis-ci.org/jsxtools/frontend/use-local-storage-factory)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/frontend/use-local-storage-factory.svg" height="20">](https://github.com/jsxtools/frontend/issues?q=is:issue+is:open+label:use-local-storage-factory)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/frontend/use-local-storage-factory.svg" height="20">](https://github.com/jsxtools/frontend/pulls?q=is:pr+is:open+label:use-local-storage-factory)

**use-local-storage-factory** returns a [hook] that provides a state and setter bound to [Local Storage].

It is <strong size>363 bytes (214 gzipped)</strong>.

## Installation

```sh
npm install @jsxtools/use-local-storage-factory
```

## Usage

```js
import { useState } from 'react';
import useLocalStorageFactory from '@jsxtools/use-local-storage-factory';

const useLocalStorage = useEqualStateFactory({ useState });

function Component() {
  // the `value` of `counter` will persist after the browser is refreshed
  const [value, setValue] = useLocalStorage('counter', 0);
  const inc = setValue.bind(null, value + 1);
  const dec = setValue.bind(null, value - 1);

  return (
    <p>
      <span>Value is "{value}".</span>
      <button aria-label="decrement value" onClick={dec}>-</button>
      <button aria-label="increment value" onClick={inc}>+</button>
    </p>
  );
}
```

[hook]: https://reactjs.org/docs/hooks-reference.html
[local storage]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
[frontend]: https://github.com/jsxtools/frontend
