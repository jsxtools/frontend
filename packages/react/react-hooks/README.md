# react-hooks [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][monorepo]

[<img alt="npm version" src="https://img.shields.io/npm/v/@jsxtools/react-hooks.svg" height="20">](https://www.npmjs.com/package/@jsxtools/react-hooks)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/monorepo/master.svg" height="20">](https://travis-ci.org/jsxtools/monorepo/react-hooks)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/monorepo/react-hooks.svg" height="20">](https://github.com/jsxtools/monorepo/issues?q=is:issue+is:open+label:react-hooks)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/monorepo/react-hooks.svg" height="20">](https://github.com/jsxtools/monorepo/pulls?q=is:pr+is:open+label:react-hooks)

**react-hooks** is a tree-shakable collection of [hooks] for React.

It is <strong size>340 bytes</strong>.

## useDebouncedState

[useDebouncedState](../../packages/hooks/use-debounced-state-factory) provides a state and setter that throttle updates coming in rapid succession.

```js
import { useDebouncedState } from '@jsxtools/react-hooks';

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

## useEqualState

[useEqualState](../../packages/hooks/use-equal-state-factory) provides a state and setter that check for shallow or deep changes.

```js
import { useEqualState } from '@jsxtools/react-hooks';

function Component() {
  // shallow updates to `formData` will not trigger re-renders
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

## useLocalStorage

[useLocalStorage](../../packages/hooks/use-local-storage-factory) provides a state and setter bound to Local Storage.

```js
import { useLocalStorage } from '@jsxtools/react-hooks';

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

## usePromise

[usePromise](../../packages/hooks/use-promise-factory) provides a state and settled value of a Promise.

```js
import { usePromise } from '@jsxtools/react-hooks';

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

## Installation

```sh
npm install @jsxtools/react-hooks
```

## Usage

```js
import reactHooks from '@jsxtools/react-hooks';

reactHooks();
```

[hooks]: https://reactjs.org/docs/hooks-reference.html
[monorepo]: https://github.com/jsxtools/monorepo
