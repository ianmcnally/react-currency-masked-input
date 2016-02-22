# React currency-masked input

[![Build Status](https://travis-ci.org/ianmcnally/react-currency-masked-input.svg?branch=master)](https://travis-ci.org/imcnally/react-currency-masked-input)

`<CurrencyMaskedInput />` Creates an input that gets [masked](http://en.wikipedia.org/wiki/Input_mask) as currency, in [React](https://facebook.github.io/react).

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
  return <input name="myInput" ref="myInput" placeholder="0" required />
}
```

Becomes a matter of simply replacing the tag to `CurrencyMaskedInput`:

```jsx
// with a currency mask
import CurrencyMaskedInput from 'react-currency-masked-input'

//...

render() {
  return <CurrencyMaskedInput name="myInput" ref="myInput" placeholder="0" required />
}
```

Usage notes:
- renders an input with `type="number"` and `pattern="\d*"`, but will override those props if you pass them in.
- Will use the `value` prop passed in as an initial value, but will take over from there.
- Can manually update `value` by triggering a re-render of the component. It's handy for asynchronous value updates, like:
```jsx
componentDidMount() {
  ajaxCall().done((rate) => this.setState({ rate }))
}

render() {
  return <CurrencyMaskedInput value={this.state.rate} />
}
```
- Calls `onChange` prop after updating its internal value. First argument is the original event, the second is the masked value.
- To maintain a reference to the input, it's best to attach a `ref` prop to <CurrencyMaskedInput>, since it will be inherited.
- Sets the input value on the component instance, so you can reference it on a ref, e.g., `myComponent.refs.input.value`, as you would with a normal ref.

## Development

1. `npm install` - install local dependencies

2. `npm run compile` - compiles source code to dist/

## Testing

Testing is done with Jasmine, run by Karma. Tests live in `test/**/*_spec.js`.

1. `npm run test` - Runs the unit tests in a headless browser (for CI).

2. `npm run watch` - Runs the unit tests in a headless browser, on every file change (for local development).

## TODO

1. Support for dynamic separator, e.g., `,` not `.`
