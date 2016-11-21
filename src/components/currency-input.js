const React = require('react')
const currencyConversion = require('../services/currency-conversion')

const { Component, PropTypes } = React
const { toCurrency } = currencyConversion

class CurrencyInput extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
  };

  state = {
    value: this.props.value || ''
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

module.exports = CurrencyInput
module.exports.default = CurrencyInput

