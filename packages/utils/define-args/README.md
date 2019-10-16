# define-args [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][monorepo]

[<img alt="npm version" src="https://img.shields.io/npm/v/@jsxtools/define-args.svg" height="20">](https://www.npmjs.com/package/@jsxtools/define-args)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/monorepo/master.svg" height="20">](https://travis-ci.org/jsxtools/monorepo/define-args)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/monorepo/define-args.svg" height="20">](https://github.com/jsxtools/monorepo/issues?q=is:issue+is:open+label:define-args)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/monorepo/define-args.svg" height="20">](https://github.com/jsxtools/monorepo/pulls?q=is:pr+is:open+label:define-args)

**define-args** returns a function with the ability to bind arguments without binding context.

It is <strong size>520 bytes (314 gzipped)</strong>.

## Installation

```sh
npm install @jsxtools/define-args
```

## Usage

Use **define-args** to enable `args()` on a function:

```js
import defineArgs from '@jsxtools/args';

// creates a function that adds two numbers and supports args()
const addTwoNumbers = defineArgs(function (a, b) { return a + b })

// returns 5, because the arguments are 2 and 3
addTwoNumbers(2, 3) 

// creates an argument-bound function with args(1)
const addOneNumber = defineArgs(addTwoNumbers).args(1)

// returns 3, because the arguments are 1, 2, and 3
addOneNumber(2, 3)
```

Use **define-args** to extend classes:

```js
import defineArgs from '@jsxtools/define-args';

// creates a class that stores a number and supports args()
const StoredNumber = defineArgs(function (number) { this.number = number })

// creates a new StoredNumber, where its "number" is 5
const someStoredNumber = new StoredNumber(5)

// creates an argument-bound class with args(1)
const StoredOne = StoredNumber.args(1)

// creates a new StoredOne, where its "number" is already 1 (and 5 is ignored)
const anotherStoredNumber = new SomeOneNumber(5)

// extends StoredNumber (and StoredOne) with "and"
SomeNumber.prototype.and = function (number) { return this.number + number }

// returns 10, because its "number" is 5 and the argument is 5
someStoredNumber.and(5)

// returns 6, because its "number" is 1 and the argument is 5
anotherStoredNumber.and(5)
```

The browser script works in all modern browsers, including Internet Explorer 9+.

## Example Usage: React Component

```jsx
import defineArgs from '@jsxtools/args';

function BoundComponent () {
  const { constructor } = this

  // bind all prototype functions and allow them to predefine arguments
  Object.getOwnPropertyNames(constructor.prototype).forEach(
    name => this[name] !== constructor && typeof this[name] === 'function'
      ? this[name] = defineArgs(this[name].bind(this))
    : null
  )
} BoundComponent.prototype.isReactComponent = {}

class MyComponent extends BoundComponent {
  constructor () {
    super()

    this.state.items = [
      'Defeat Bowser',
      'Save the Princess'
    ]
  }

  remove (index) {
    const prevItems = this.state.items
    const nextItems = prevItems.slice().splice(index, 1)

    this.setState({ items: nextItems })
  }

  render () {
    return (
      <ul>
        this.state.items.map(
          (item, index) => (
            <li key={index}>
              <span>{item}</span>
              <button onClick={this.remove.args(index)}>remove</button>
            </li>
          )
        )
      </ul>
    )
  }
}
```

[monorepo]: https://github.com/jsxtools/monorepo
