# React currency-masked input

`<CurrencyMaskedInput />` Creates an input that gets masked as currency, in [React](https://facebook.github.io/react).

![Shows currency masked on the input](https://raw.githubusercontent.com/imcnally/react-currency-masked-input/master/examples/masking-example.gif)

_Note: Dollar sign and styling not included_


i.e.,

Entering a 1 shows: $0.01.

Entering 11 shows: $0.11.

Entering 110 shows: $1.10.

And so on.

## Usage

It accepts an properties you'd normally set on an input, so:

```html
<CurrencyMaskedInput {...props} />
```

Notes:
- Will use the `value` prop passed in as an initial value, but will take over from there.
- Calls `onChange` prop after updating its internal value.
- To maintain a reference to the input, it's best to attach a `ref` prop to <CurrencyMaskedInput>, since it will be inherited.

## Development

1. `npm install` - install local dependencies

2. `npm run compile` - compiles source code to dist/

## TODO

1. Unit tests

2. Support for dynamic separator, e.g., `,` not `.`