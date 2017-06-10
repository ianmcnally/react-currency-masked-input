import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { toCurrency } from '../services/currency-conversion'

export default class CurrencyInput extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    defaultValue: PropTypes.string,
    value: PropTypes.string
  };

  state = {
    value: this.props.defaultValue || ''
  };

  handleChange = event => {
    const { onChange } = this.props
    const valueAsCurrency = toCurrency(event.target.value)

    this.setState({ value: valueAsCurrency })

    if (onChange) {
      event.persist()
      onChange(event, valueAsCurrency)
    }

  };

  get value() {
    return this.props.value || this.state.value
  }

  render() {
    const { handleChange, props: { defaultValue, ...safeProps }, value } = this

    return (
      <input
        type="number"
        pattern="\d*"
        {...safeProps}
        value={value}
        onChange={ handleChange }
      />
    )
  }

}

