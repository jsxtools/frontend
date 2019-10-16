# create-context-state [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][monorepo]

[<img alt="npm version" src="https://img.shields.io/npm/v/@jsxtools/create-context-state.svg" height="20">](https://www.npmjs.com/package/@jsxtools/create-context-state)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/monorepo/master.svg" height="20">](https://travis-ci.org/jsxtools/monorepo/create-context-state)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/monorepo/create-context-state.svg" height="20">](https://github.com/jsxtools/monorepo/issues?q=is:issue+is:open+label:create-context-state)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/monorepo/create-context-state.svg" height="20">](https://github.com/jsxtools/monorepo/pulls?q=is:pr+is:open+label:create-context-state)

**create-context-state** lets you create context states sharable across components in React.

It is <strong size>231 bytes (184 gzipped)</strong>.

## Installation

```sh
npm install @jsxtools/create-context-state
```

## Usage

```js
// state.js creates a sharable state
import createContextState from '@jsxtools/create-context-state';

const [useState, Provider] = createContextState({
  givenName: 'Ellen',
  familyName: 'Ripley'
});

export { useState, Provider };
```

```js
// MyApp.js binds that state to the context of a React DOM tree
import { Provider } from './state.js';

export default function MyApp() {
  return (
    <Provider>
      <MyComponent />
    </Provider>
  );
}
```

```js
// MyComponent.js uses the sharable state in the context of its React DOM tree
import { useState } from './state.js';

export default function MyComponent() {
  let [state, setState] = useState();

  return (
    <form>
      <p>
        <label>
          Given Name
          <input
            defaultValue={state.givenName}
            onInput={event => setState(event.target.value)}
          />
        </label>
      </p>
      <p>
        <label>
          Family Name
          <input
            defaultValue={state.familyName}
            onInput={event => setState(event.target.value)}
          />
        </label>
      </p>
    </form>
  );
}
```

[monorepo]: https://github.com/jsxtools/monorepo
