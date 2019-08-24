# prevent-default [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][monorepo]

[<img alt="npm version" src="https://img.shields.io/npm/v/@jsxtools/prevent-default.svg" height="20">](https://www.npmjs.com/package/@jsxtools/prevent-default)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/monorepo/master.svg" height="20">](https://travis-ci.org/jsxtools/monorepo/prevent-default)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/monorepo/prevent-default.svg" height="20">](https://github.com/jsxtools/monorepo/issues?q=is:issue+is:open+label:prevent-default)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/monorepo/prevent-default.svg" height="20">](https://github.com/jsxtools/monorepo/pulls?q=is:pr+is:open+label:prevent-default)

**prevent-default** returns a function that invokes `preventDefault` on any `event` passed into it.

It is <strong size>156 bytes</strong>.

## Installation

```sh
npm install @jsxtools/prevent-default
```

## Usage

```js
import preventDefault from '@jsxtools/prevent-default';

document.querySelector('form').addEventListener('submit', preventDefault(() => {
  // handle submission via JS without submission
}));
```

[monorepo]: https://github.com/jsxtools/monorepo
