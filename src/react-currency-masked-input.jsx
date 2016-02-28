import React, { Component, PropTypes } from 'react'

export default class CurrencyMaskedInput extends Component {

  constructor (props) {
    super(props)

    this.state = {
      value : this._maskedInputValue(props.value.toString(), true)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { value } = nextProps

    // allows the user to update the value after render
    if (this._isValidUpdateValue(value)) { 
      var formattedValue = this._maskedInputValue(value.toString(), true)
      this.setState({ value: formattedValue }) 
    }
  }

  onChange (evt) {
    const value = this._maskedInputValue(evt.target.value, evt.target.validity)
    
    //Remove the currency symbols and commas to get the raw value
    var regCurrency = new RegExp("\\" + this.props.currencySymbol,"g");
    var rawValue = evt.target.value.replace(regCurrency,"");
        rawValue = rawValue.replace(/\,/g,"");

    this.setState({ value: rawValue }, function () {
      if (this.props.onChange) {
        // call original callback, if it exists
        this.props.onChange(evt, rawValue);
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
      digits.unshift('0');
    }

    // add a decimal point if the user wanted
    var sigDigits = (this.props.showCents) ? 2 : 0;
    if (this.props.showCents) {
      digits.splice(digits.length - 2, 0, '.');
    }

    var currencySymbol = (this.props.currencySymbol != undefined) ? this.props.currencySymbol : "";
    // make a number with the requested significant digits, currency symbol, and commas at the thousands places
    return currencySymbol + (Number(digits.join('')).toFixed(sigDigits)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

