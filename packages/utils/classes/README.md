# classes [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][monorepo]

[<img alt="npm version" src="https://img.shields.io/npm/v/@jsxtools/classes.svg" height="20">](https://www.npmjs.com/package/@jsxtools/classes)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/monorepo/master.svg" height="20">](https://travis-ci.org/jsxtools/monorepo/classes)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/monorepo/classes.svg" height="20">](https://github.com/jsxtools/monorepo/issues?q=is:issue+is:open+label:classes)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/monorepo/classes.svg" height="20">](https://github.com/jsxtools/monorepo/pulls?q=is:pr+is:open+label:classes)

**classes** returns a normalized string of class names from strings, arrays, or objects.

It is <strong size>222 bytes</strong>.

## Installation

```sh
npm install @jsxtools/classes
```

## Usage

```js
import classes from '@jsxtools/classes';

classes('this', 'that', 'this'); // 'this that'
classes(['this', 'that', 'this']); // 'this that'
classes({ 'this': true, 'that': true, 'else': false }); // 'this that'
```

[monorepo]: https://github.com/jsxtools/monorepo
