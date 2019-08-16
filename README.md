# monorepo [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][monorepo]

[<img alt="build status" src="https://img.shields.io/travis/jsxtools/monorepo/master.svg" height="20">](https://travis-ci.org/jsxtools/monorepo)
[<img alt="code coverage" src="https://img.shields.io/codecov/c/github/jsxtools/monorepo" height="20">](https://codecov.io/gh/jsxtools/monorepo)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/monorepo.svg" height="20">](https://github.com/jsxtools/monorepo/issues)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/monorepo.svg" height="20">](https://github.com/jsxtools/monorepo/pulls)

[monorepo] is a collection of JavaScript tools.

## Utilities

- [classes](packages/utils/classes) returns a normalized string of class names from strings, arrays, or objects.
- [debounce](packages/utils/debounce) returns a debounced function that delays invoking `func` until `wait` milliseconds have elapsed since `func` was last invoked.
- [is-equal](packages/utils/is-equal) returns whether two values are the same value.
- [is-type](packages/utils/is-type) returns whether a value is a certain type.
- [prevent-default](packages/utils/prevent-default) returns a function that invokes `preventDefault` on any `event` passed into it.
- [uid](packages/utils/uid) returns a unique URL-safe ID.

## Hook Factories

- [use-debounced-state-factory](packages/hooks/use-debounced-state-factory) returns a [hook] that provides a state and setter that throttle updates coming in rapid succession.
- [use-equal-state-factory](packages/hooks/use-equal-state-factory) returns a [hook] that provides a state and setter that check for shallow or deep changes.
- [use-local-storage-factory](packages/hooks/use-local-storage-factory) returns a [hook] that provides a state and setter bound to Local Storage.
- [use-promise-factory](packages/hooks/use-promise-factory) returns a [hook] that provides a state and settled value of a Promise.

## React Hooks

- [react-hooks](packages/react/react-hooks) is a tree-shakable collection of hooks for React.

## DOM

- [get-form-data](packages/dom/get-form-data) returns data from an HTML form element as an object.

[monorepo]: https://github.com/jsxtools/monorepo
[hook]: https://reactjs.org/docs/hooks-reference.html
[local storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[useState]: https://reactjs.org/docs/hooks-reference.html#usestate
