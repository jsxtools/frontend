# use-fetch-factory [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][frontend]

[<img alt="npm version" src="https://img.shields.io/npm/v/@jsxtools/use-fetch-factory.svg" height="20">](https://www.npmjs.com/package/@jsxtools/use-fetch-factory)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/frontend/master.svg" height="20">](https://travis-ci.org/github/jsxtools/frontend)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/frontend/use-fetch-factory.svg" height="20">](https://github.com/jsxtools/frontend/issues?q=is:issue+is:open+label:use-fetch-factory)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/frontend/use-fetch-factory.svg" height="20">](https://github.com/jsxtools/frontend/pulls?q=is:pr+is:open+label:use-fetch-factory)

**use-fetch-factory** generates a [hook] that provides the state and settled response of a [fetch].

It is <strong size>597 bytes (351 gzipped)</strong>.

## Installation

```sh
npm install @jsxtools/use-fetch-factory
```

## Usage

```js
import { useEffect, useRef, useState } from 'react';
import useFetchFactory from '@jsxtools/use-fetch-factory';

const useFetch = useFetchFactory({ useEffect, useRef, useState });

function Component () {
  // the `state` is "pending", "fulfilled", or "rejected"
  // the `response` is the response from the fetch
  const [ state, response ] = useFetch('https://httpbin.org/get');

  return state === 'pending'
    ? 'Loading'
  : JSON.stringify(settledValue);
}
```

### Abort

```js
const [ state, response, abort ] = useFetch('https://httpbin.org/get');

// abort the fetch
abort();
```

### Timeout

```js
// abort the fetch after 2000ms
const [ state, response ] = useFetch('https://httpbin.org/get', {
  timeout: 2000
});
```

[fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
[frontend]: https://github.com/jsxtools/frontend
