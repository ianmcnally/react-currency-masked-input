const getDigitsFromValue = (value = '') => value.replace(/\D/g, '') || ''

const padDigits = digits => {
  const desiredLength = 3
  const actualLength = digits.length

  if (actualLength >= desiredLength) {
    return digits
  }

  const amountToAdd = desiredLength - actualLength
  const padding = '0'.repeat(amountToAdd)

  return padding + digits
}

const addDecimalToNumber = number => {
  const centsStartingPosition = number.length - 2
  const dollars = number.substring(0, centsStartingPosition)
  const cents = number.substring(centsStartingPosition)

  return `${dollars}.${cents}`
}

const toCurrency = value => {
  const digits = getDigitsFromValue(value)
  const digitsWithPadding = padDigits(digits)
  return addDecimalToNumber(digitsWithPadding)
}

module.exports = { toCurrency }

