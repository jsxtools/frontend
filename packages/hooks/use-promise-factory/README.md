# use-promise-factory [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][frontend]

[<img alt="npm version" src="https://img.shields.io/npm/v/@jsxtools/use-promise-factory.svg" height="20">](https://www.npmjs.com/package/@jsxtools/use-promise-factory)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/frontend/master.svg" height="20">](https://travis-ci.org/jsxtools/frontend/use-promise-factory)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/frontend/use-promise-factory.svg" height="20">](https://github.com/jsxtools/frontend/issues?q=is:issue+is:open+label:use-promise-factory)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/frontend/use-promise-factory.svg" height="20">](https://github.com/jsxtools/frontend/pulls?q=is:pr+is:open+label:use-promise-factory)

**use-promise-factory** generates a [hook] that provides a state and settled value of a [Promise].

It is <strong size>451 bytes (268 gzipped)</strong>.

## Installation

```sh
npm install @jsxtools/use-promise-factory
```

## Usage

```js
import { useEffect, useState } from 'react';
import usePromiseFactory from '@jsxtools/use-promise-factory';

const usePromise = usePromiseFactory({ useEffect, useState });

function Component () {
  // the `state` is "pending", "fulfilled", or "rejected"
  // the `settledValue` is the fulfilled or rejected value
  const [ state, settledValue ] = usePromise(async () => {
    const response = await fetch(URL);
    const json = await response.json();

    return json;
  });

  return state === 'pending'
    ? 'Loading'
  : JSON.stringify(settledValue);
}
```

[hook]: https://reactjs.org/docs/hooks-reference.html
[frontend]: https://github.com/jsxtools/frontend
[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
