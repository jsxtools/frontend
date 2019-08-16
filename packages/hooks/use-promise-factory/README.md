# use-promise-factory [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][monorepo]

[<img alt="npm version" src="https://img.shields.io/npm/v/@jsxtools/use-promise-factory.svg" height="20">](https://www.npmjs.com/package/@jsxtools/use-promise-factory)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/monorepo/master.svg" height="20">](https://travis-ci.org/jsxtools/monorepo/use-promise-factory)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/monorepo/use-promise-factory.svg" height="20">](https://github.com/jsxtools/monorepo/issues?q=is:issue+is:open+label:use-promise-factory)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/monorepo/use-promise-factory.svg" height="20">](https://github.com/jsxtools/monorepo/pulls?q=is:pr+is:open+label:use-promise-factory)

**use-promise-factory** generates a [hook] that provides a state and settled value of a [Promise].

It is <strong size>278 bytes</strong>.

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

[monorepo]: https://github.com/jsxtools/monorepo

[hook]: https://reactjs.org/docs/hooks-reference.html

[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

[cli-img]: https://img.shields.io/travis/jsxtools/monorepo/master.svg

[cli-url]: https://travis-ci.org/jsxtools/monorepo

[git-img]: https://img.shields.io/github/issues/jsxtools/monorepo/is-equal.svg

[git-url]: https://github.com/jsxtools/monorepo/issues

[gpr-img]: https://img.shields.io/github/issues-pr/jsxtools/monorepo/is-equal.svg

[gpr-url]: https://github.com/jsxtools/monorepo/pulls
