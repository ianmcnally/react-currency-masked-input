import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { toCurrency } from '../services/currency-conversion'

export default class CurrencyInput extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    separator: PropTypes.oneOf(['.', ',']),
    decimals: PropTypes.number
  };

  static defaultProps = {
    separator: '.',
    decimals: 2
  }

  state = {
    value: this.props.defaultValue || ''
  };

  handleChange = event => {
    const { onChange, separator, decimals } = this.props
    const valueAsCurrency = toCurrency(event.target.value, separator, decimals)

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
    const { handleChange, props: { defaultValue, separator, ...inputProps }, value } = this

    return (
      <input
        type="number"
        pattern="\d*"
        {...inputProps}
        value={value}
        onChange={ handleChange }
      />
    )
  }

}

