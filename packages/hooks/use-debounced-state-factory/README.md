# use-debounced-state-factory [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][frontend]

[<img alt="npm version" src="https://img.shields.io/npm/v/@jsxtools/use-debounced-state-factory.svg" height="20">](https://www.npmjs.com/package/@jsxtools/use-debounced-state-factory)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/frontend/master.svg" height="20">](https://travis-ci.org/jsxtools/frontend/use-debounced-state-factory)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/frontend/use-debounced-state-factory.svg" height="20">](https://github.com/jsxtools/frontend/issues?q=is:issue+is:open+label:use-debounced-state-factory)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/frontend/use-debounced-state-factory.svg" height="20">](https://github.com/jsxtools/frontend/pulls?q=is:pr+is:open+label:use-debounced-state-factory)

**use-debounced-state-factory** returns a [hook] that provides a state and setter that throttle updates coming in rapid succession.

It is <strong size>131 bytes (128 gzipped)</strong>.

## Installation

```sh
npm install @jsxtools/use-debounced-state-factory
```

## Usage

```js
import { useState } from 'react';
import useDebouncedStateFactory from '@jsxtools/use-debounced-state-factory';

const useDebouncedState = useDebouncedStateFactory({ useState });

function Component() {
  // successive updates to `searchTerm` to will be deferred by 400 milliseconds
  const [searchTerm, setSearchTerm] = useDebouncedState(initialState, 400);
  const onSearchTermInput = event => setSearchTerm(event.target.value);

  return (
    <p>
      <label htmlFor="q">Search</label>
      <input id="q" name="q" defaultValue="" onInput={onSearchTermInput}>
    </p>
  )
}
```

[hook]: https://reactjs.org/docs/hooks-reference.html
[frontend]: https://github.com/jsxtools/frontend
