import React, { Component, PropTypes } from 'react'

export default class CurrencyMaskedInput extends Component {

  constructor (props) {
    super(props)

    this.state = {
      value : props.value
    }
  }

  componentWillReceiveProps (nextProps) {
    const { value } = nextProps

    // allows the user to update the value after render
    if (this._isValidUpdateValue(value)) { this.setState({ value }) }
  }

  onChange (evt) {
    const value = this._maskedInputValue(evt.target.value, evt.target.validity)

    this.setState({ value }, () => {
      if (this.props.onChange) {
        // call original callback, if it exists
        this.props.onChange(evt, value)
      }
    })
  }

  _isValidUpdateValue (value) {
    // A String of numbers, or a number, will have digits. Null or undefined will not.
    const isANumber = String(value).match(/\d/g)

    return Boolean(isANumber)
  }

  _maskedInputValue (value, validity = {}) {
    // a falsy value with "good" input indicates the user is clearing the text,
    // so allow them to.
    if (!value && !validity.badInput) { return null }

    // extract digits. if no digits, fill in a zero.
    const digits = value.match(/\d/g) || ['0']

    // zero-pad a one-digit input
    if (digits.length === 1) {
      digits.unshift('0')
    }

    // add a decimal point
    digits.splice(digits.length - 2, 0, '.')

    // make a number with 2 decimal points
    return Number(digits.join('')).toFixed(2)
  }

  render () {
    return (
      <input
          ref={() => this.value = this.state.value}
          type='number'
          pattern='\d*'
          {...this.props}
          value={this.state.value}
          onChange={this.onChange.bind(this)}
      />
    )
  }

}

CurrencyMaskedInput.propTypes = {
  onChange : PropTypes.func,
  value : PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

CurrencyMaskedInput.defaultProps = {
  value : null
}

module.exports = CurrencyMaskedInput;

