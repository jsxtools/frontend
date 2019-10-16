# use-equal-state-factory [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][frontend]

[<img alt="npm version" src="https://img.shields.io/npm/v/@jsxtools/use-equal-state-factory.svg" height="20">](https://www.npmjs.com/package/@jsxtools/use-equal-state-factory)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/frontend/master.svg" height="20">](https://travis-ci.org/jsxtools/frontend/use-equal-state-factory)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/frontend/use-equal-state-factory.svg" height="20">](https://github.com/jsxtools/frontend/issues?q=is:issue+is:open+label:use-equal-state-factory)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/frontend/use-equal-state-factory.svg" height="20">](https://github.com/jsxtools/frontend/pulls?q=is:pr+is:open+label:use-equal-state-factory)

**use-equal-state-factory** returns a [hook] that provides a state and setter that check for shallow or deep changes.

It is <strong size>161 bytes (146 gzipped)</strong>.

## Installation

```sh
npm install @jsxtools/use-equal-state-factory
```

## Usage

```js
import { useState } from 'react';
import useEqualStateFactory from '@jsxtools/use-equal-state-factory';

const useEqualState = useEqualStateFactory({ useState });

function Component () {
  // shallow updates to formData will not trigger re-renders
  const [formData, setFormData] = useEqualState({ givenName: 'Jonathan', familyName: 'Neal' });
  const onGivenNameInput = event => setFormData({ ...formData, givenName: event.target.value });
  const onFamilyNameInput = event => setFormData({ ...formData, familyName: event.target.value });

  return (
    <>
      <p>
        <label htmlFor="gn">Given Name</label>
        <input id="gn" defaultValue={formData.givenName} onInput={onGivenNameInput} />
      </p>
      <p>
        <label htmlFor="fn">Family Name</label>
        <input id="fn" defaultValue={formData.familyName} onInput={onFamilyNameInput} />
      </p>
    </>
  );
}
```

[hook]: https://reactjs.org/docs/hooks-reference.html
[frontend]: https://github.com/jsxtools/frontend
