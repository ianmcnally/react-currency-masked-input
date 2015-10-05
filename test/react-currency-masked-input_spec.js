import React from 'react/addons'
import CurrencyMaskedInput from '../src/react-currency-masked-input.jsx'
const {
  findRenderedDOMComponentWithTag,
  renderIntoDocument,
  Simulate
} = React.addons.TestUtils

describe('CurrencyMaskedInput', () => {

  describe('default props', () => {

    it('sets a value', () => {
      expect(CurrencyMaskedInput.defaultProps.value).toBeNull()
    })

  })

  describe('props passing', () => {
    let input
    const value = '100'
    const nonsenseProp = 'nonsense'

    beforeEach(() => {
      input = renderIntoDocument(
        <CurrencyMaskedInput nonsenseProp={nonsenseProp} value={value}/>
      )
    })

    it('sets the initial state value from props.value', () => {
      expect(input.state.value).toEqual(value)
    })

    it('passes in any prop', () => {
      expect(input.props.nonsenseProp).toEqual(nonsenseProp)
    })

  })

  describe('props updating', () => {
    let inputWrapper
    const value = '100'

    beforeEach(() => {

      class InputWrapper extends React.Component {
        constructor (props) {
          super(props)

          this.state = { value }
        }
        render () {
          return <CurrencyMaskedInput value={this.state.value} />
        }
      }

      inputWrapper = renderIntoDocument(<InputWrapper />)
    })

    it('updates the state value when a user updates the value prop with a number string', () => {
      const input = findRenderedDOMComponentWithTag(inputWrapper, 'input')
      const newValue = '101'

      expect(input.props.value).toEqual(value)

      inputWrapper.setState({ value : newValue })

      expect(input.props.value).toEqual(newValue)
    })

    it('updates the state value when a user updates the value prop with a number', () => {
      const input = findRenderedDOMComponentWithTag(inputWrapper, 'input')
      const newValue = 101

      expect(input.props.value).toEqual(value)

      inputWrapper.setState({ value : newValue })

      expect(input.props.value).toEqual(newValue)
    })

    it('updates the state value when a user updates the value prop with a falsy number', () => {
      const input = findRenderedDOMComponentWithTag(inputWrapper, 'input')
      const newValue = 0

      expect(input.props.value).toEqual(value)

      inputWrapper.setState({ value : newValue })

      expect(input.props.value).toEqual(newValue)
    })

    it('does not update the state value when a user updates the value prop with a null value', () => {
      const input = findRenderedDOMComponentWithTag(inputWrapper, 'input')
      const newValue = null

      expect(input.props.value).toEqual(value)

      inputWrapper.setState({ value : newValue })

      expect(input.props.value).not.toEqual(newValue)
    })

    it('does not update the state value when a user updates the value prop with an undefined value', () => {
      const input = findRenderedDOMComponentWithTag(inputWrapper, 'input')
      const newValue = undefined

      expect(input.props.value).toEqual(value)

      inputWrapper.setState({ value : newValue })

      expect(input.props.value).not.toEqual(newValue)
    })

  })

  describe('change', () => {
    let input
    let inputEl
    const originalOnChange = jasmine.createSpy('originalOnChange')

    beforeEach(() => {
      input = renderIntoDocument(<CurrencyMaskedInput onChange={originalOnChange}/>)
      inputEl = React.findDOMNode(input)
    })

    it('masks a single digit number as a penny', () => {
      const value = '1'
      const expectedMaskedValue = '0.01'

      Simulate.change(inputEl, { target : { value } })

      expect(input.state.value).toEqual(expectedMaskedValue)
    })

    it('masks a double digit number as cents', () => {
      const value = '50'
      const expectedMaskedValue = '0.50'

      Simulate.change(inputEl, { target : { value } })

      expect(input.state.value).toEqual(expectedMaskedValue)
    })

    it('masks a triple digit number as dollar and cents', () => {
      const value = '350'
      const expectedMaskedValue = '3.50'

      Simulate.change(inputEl, { target : { value } })

      expect(input.state.value).toEqual(expectedMaskedValue)
    })

    it('masks a multiple digit numbers', () => {
      const value = '123456789'
      const expectedMaskedValue = '1234567.89'

      Simulate.change(inputEl, { target : { value } })

      expect(input.state.value).toEqual(expectedMaskedValue)
    })

    it('masks invalid input as zero', () => {
      const value = 'abcdef'
      const expectedMaskedValue = '0.00'

      Simulate.change(inputEl, {
        target : {
          validity : { badInput : true },
          value
        }
      })

      expect(input.state.value).toEqual(expectedMaskedValue)
    })

    it('masks a cleared input as null', () => {
      const value = '' // when a user deletes input text, it gets passed as ''
      const expectedMaskedValue = null

      Simulate.change(inputEl, {
        target : {
          validity : { badInput : false },
          value
        }
      })

      expect(input.state.value).toEqual(expectedMaskedValue)
    })

    it('calls props.onChange, with correct arguments', () => {
      const value = '123'
      const expectedMaskedValue = '1.23'

      Simulate.change(inputEl, { target : { value } })

      expect(originalOnChange).toHaveBeenCalledWith(jasmine.any(Object), expectedMaskedValue)
    })

  })

})
