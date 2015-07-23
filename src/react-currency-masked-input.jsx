/*
  CurrencyMaskedInput, for React. By Ian McNally.

  Version 0.0.11.

  MIT License
*/

import React, {Component, PropTypes} from 'react';

class CurrencyMaskedInput extends Component {

  constructor (props) {
    super(props);

    this.state = {
      value : props.value
    };
  }

  componentWillReceiveProps (nextProps) {
    let {value} = nextProps;

    // allows the user to update the value after render
    if (value) { this.setState({value}); }
  }

  onChange (evt) {
    let value = this._maskedInputValue(evt.target.value, evt.target.validity);

    this.setState({value}, () => {
      if (this.props.onChange) {
        // call original callback, if it exists
        this.props.onChange(evt, value);
      }
    });
  }

  _maskedInputValue (value, validity = {}) {
    // a falsy value with "good" input indicates the user is clearing the text,
    // so allow them to.
    if (!value && !validity.badInput) { return null; }

    // extract digits. if no digits, fill in a zero.
    let digits = value.match(/\d/g) || ['0'];

    // zero-pad a one-digit input
    if (digits.length === 1) {
      digits.unshift('0');
    }

    // add a decimal point
    digits.splice(digits.length - 2, 0, '.');

    // make a number with 2 decimal points
    return Number(digits.join('')).toFixed(2);
  }

  render () {
    return (
      <input type='number' pattern='\d*' {...this.props} value={this.state.value} onChange={this.onChange.bind(this)}/>
    )
  }

}

CurrencyMaskedInput.propTypes = {
  onChange: PropTypes.func
}

CurrencyMaskedInput.defaultProps = {
  value: null
}

export default CurrencyMaskedInput;