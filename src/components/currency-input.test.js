const CurrencyInput = require('./currency-input')
const renderShallow = require('render-shallow').default
const React = require('react')

describe('when rendered with required props', () => {
  let component

  beforeAll(() => {
    component = renderShallow(<CurrencyInput />).output
  })

  it('renders the input', () => {
    expect(component).toMatchSnapshot()
  })

})

describe('with props.value', () => {

  xit('sets the inputs value from props.value', () => {
  })

})

describe('when props.value is updated as a number', () => {

  xit('it update the input value', () => {
  })

})

describe('when props.value is updated as a string', () => {

  xit('it update the input value', () => {
  })

})

describe('when props.value is updated with a falsy value', () => {

  xit('it update the input value', () => {
  })

})

describe('when props.value is updated with a null value', () => {

  xit('it does not update the input value', () => {
  })

})

describe('when props.value is updated with a null value', () => {

  xit('it does not update the input value', () => {
  })

})

describe('with any unspecified prop', () => {

  xit('passes the unknown props to the input', () => {
  })

})

describe('when the input value changes', () => {

  xit('the new value is to the input', () => {
  })

  xit('the value is mirrored on the instance', () => {
  })

  xit('it calls props.onChange with the persist event and new value', () => {
  })

})

describe('when the input values changes and', () => {

  describe('with deleted', () => {

    it('returns null', () => {
    })

  })

})


