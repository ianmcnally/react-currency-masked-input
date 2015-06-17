/*
  CurrencyMaskedInput, for React. By Ian McNally.

  Version 0.0.6.

  Licensed to do whatever you want with.
*/

import React from 'react';

export default class CurrencyMaskedInput extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      value : props.value || null
    };

    this.onChange = this.onChange.bind(this);
    this.render = this.render.bind(this);
  }

  onChange (evt) {
    let value = this._maskedInputValue(evt.target.value);
    this.setState({value});
    if (this.props.onChange) {
      // call original callback, if it exists
      // but give the state enough time to update.
      setTimeout(this.props.onChange, 0);
    }
  }

  _maskedInputValue (value) {
    let digits = value.match(/\d/g) || [];

    if (!digits.length) { return '0'; }

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
      <input {...this.props} value={this.state.value} onChange={this.onChange}/>
    )
  }

}