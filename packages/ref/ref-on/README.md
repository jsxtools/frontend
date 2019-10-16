# ref-on [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][monorepo]

[<img alt="npm version" src="https://img.shields.io/npm/v/@jsxtools/ref-on.svg" height="20">](https://www.npmjs.com/package/@jsxtools/ref-on)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/monorepo/master.svg" height="20">](https://travis-ci.org/jsxtools/monorepo/ref-on)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/monorepo/ref-on.svg" height="20">](https://github.com/jsxtools/monorepo/issues?q=is:issue+is:open+label:ref-on)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/monorepo/ref-on.svg" height="20">](https://github.com/jsxtools/monorepo/pulls?q=is:pr+is:open+label:ref-on)

**ref-on** lets you handle DOM events like React [synthetic events].

It is <strong size>854 bytes (449 gzipped)</strong>.

## Installation

```sh
npm install @jsxtools/ref-on
```

## Usage

```js
import on from '@jsxtools/ref-on';

function FormField() {
  return (
    <p ref={on({
      focusin (event) {
        console.log(event.target); // <input>
      },
      input (event) {
        console.log(event.target.value); // <input>’s value
      }
    })}>
        <label htmlFor="gn">Given Name</label>
        <input id="gn" />
    </p>
  );
}
```

[monorepo]: https://github.com/jsxtools/monorepo
[synthetic events]: https://reactjs.org/docs/handling-events.html
