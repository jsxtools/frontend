# use-fetch-factory [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][monorepo]

[<img alt="npm version" src="https://img.shields.io/npm/v/@jsxtools/use-fetch-factory.svg" height="20">](https://www.npmjs.com/package/@jsxtools/use-fetch-factory)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/monorepo/master.svg" height="20">](https://travis-ci.org/jsxtools/monorepo/use-fetch-factory)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/monorepo/use-fetch-factory.svg" height="20">](https://github.com/jsxtools/monorepo/issues?q=is:issue+is:open+label:use-fetch-factory)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/monorepo/use-fetch-factory.svg" height="20">](https://github.com/jsxtools/monorepo/pulls?q=is:pr+is:open+label:use-fetch-factory)

**use-fetch-factory** generates a [hook] that provides the state and settled response of a [fetch].

It is <strong size>301 bytes</strong>.

## Installation

```sh
npm install @jsxtools/use-fetch-factory
```

## Usage

```js
import { useEffect, useState } from 'react';
import useFetchFactory from '@jsxtools/use-fetch-factory';

const useFetch = useFetchFactory({ useEffect, useState });

function Component () {
  // the `state` is "pending", "fulfilled", or "rejected"
  // the `response` is the response from the fetch
  const [ state, response ] = useFetch('https://httpbin.org/get');

  return state === 'pending'
    ? 'Loading'
  : JSON.stringify(settledValue);
}
```

[fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
[monorepo]: https://github.com/jsxtools/monorepo
