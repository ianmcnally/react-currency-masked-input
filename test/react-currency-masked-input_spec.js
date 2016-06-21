/*eslint-disable react/no-multi-comp */
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import CurrencyMaskedInput from '../src/react-currency-masked-input'
import {
  findRenderedDOMComponentWithTag,
  renderIntoDocument,
  Simulate
} from 'react-addons-test-utils'

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

    it('initializes the `value` instance property', () => {
      expect(input.value).toBeTruthy()
    })

    it('sets the initial state value from props.value', () => {
      expect(input.state.value).toEqual(value)
    })

    it('passes in any prop', () => {
      expect(input.props.nonsenseProp).toEqual(nonsenseProp)
    })

  })

  describe('external api', () => {
    let inputWrapper
    const value = '3.50'

    beforeEach(() => {

      class InputWrapper extends Component {
        constructor (props) {
          super(props)

          this.state = { value }
        }
        render () {
          return <CurrencyMaskedInput ref='input' value={this.state.value} />
        }
      }

      inputWrapper = renderIntoDocument(<InputWrapper />)
    })

    describe('`value` instance property', () => {

      it('adds `value` to the component instance', () => {
        expect(inputWrapper.refs.input.value).toBeTruthy()
        expect(inputWrapper.refs.input.value).toEqual(value)
      })

      it('updates `value` when the input`s value changes', () => {
        const input = findRenderedDOMComponentWithTag(inputWrapper, 'input')

        Simulate.change(input, { target : { value : '102' } })

        expect(inputWrapper.refs.input.value).toEqual('1.02')
      })

    })

  })

  describe('props updating', () => {
    let inputWrapper
    const value = '100'

    beforeEach(() => {

      class InputWrapper extends Component {
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
      inputEl = findDOMNode(input)
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

    it('ignores inputted dots when masking', () => {
      const value = '1.01'
      const expectedMaskedValue = '1.01'

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

/*eslint-enable react/no-multi-comp */

