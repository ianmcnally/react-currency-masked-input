import React, { Component, PropTypes } from 'react'
import { toCurrency } from '../services/currency-conversion'

export default class CurrencyInput extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    defaultValue: PropTypes.string
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

  componentWillReceiveProps(nextProps) {
    const currentValue = this.props.value
    const hasNewValue = nextProps.value && (nextProps.value !== currentValue)

    if (hasNewValue)
      this.setState({ value: toCurrency(nextProps.value) })
  }

  render() {
    const { value } = this.state
    const { handleChange, props } = this

    return (
      <input
        ref={ () => this.value = value }
        type="number"
        pattern="\d*"
        {...props}
        value={value}
        onChange={ handleChange }
      />
    )
  }

}

