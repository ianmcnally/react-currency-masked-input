# Currency Input

[![Greenkeeper badge](https://badges.greenkeeper.io/ianmcnally/react-currency-masked-input.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/ianmcnally/react-currency-masked-input.svg?branch=master)](https://travis-ci.org/ianmcnally/react-currency-masked-input)

`<CurrencyInput />` Creates an input that gets [masked](http://en.wikipedia.org/wiki/Input_mask) as currency, in [React](https://facebook.github.io/react).

![Shows currency masked on the input](https://raw.githubusercontent.com/imcnally/react-currency-masked-input/master/examples/masking-example.gif)

_Note: Dollar sign and styling not included_


i.e.,

Entering a 1 shows: $0.01.

Entering 11 shows: $0.11.

Entering 110 shows: $1.10.

And so on.

## Usage

Install via npm: `npm install react-currency-masked-input`.

It accepts all properties you'd normally set on an input, so:

```jsx
// your standard input

render() {
  return <input name="myInput" placeholder="0" required />
}
```

Becomes a matter of simply replacing the tag to `CurrencyInput`:

```jsx
// with a currency mask
import CurrencyInput from 'react-currency-masked-input'

//...

render() {
  return <CurrencyInput name="myInput" required />
}
```

### Props

| Prop           | Description                          | Values   | Default |
| --- | --- | --- | --- |
| `separator`    | The character use as a decimal point | `.`, `,` | `.`     |

Usage notes:
- renders an input with `type="number"` and `pattern="\d*"`, but will override those props if you pass them in.
- Will use the `defaultValue` prop passed in as an initial value, but will take over from there.
- Will become a controlled input if/when `props.value` is passed to it.
- Calls `onChange` prop after updating its internal value. First argument is the original event, the second is the masked value.
- Sets the input value on the component instance, so you can reference it on a ref, e.g., `myComponent.refs.input.value`, as you would with a normal ref.

## Development

1. `yarn` - install local dependencies

2. `npm run bundle` - compiles source code to ./react-currency-masked-input.js

## Testing

1. `npm test` - Runs the unit tests in watch mode

2. `npm run test:ci` - Runs the tests once; useful in CI.

