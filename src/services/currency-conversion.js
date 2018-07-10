const getDigitsFromValue = (value = '') => value.replace(/(-(?!\d))|[^0-9|-]/g, '') || ''

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

const removeLeadingZeros = number => number.replace(/^0+([0-9]+)/, '$1')

const addDecimalToNumber = (number, decimalSeparator) => {
  const centsStartingPosition = number.length - 2
  const dollars = removeLeadingZeros(
    number.substring(0, centsStartingPosition)
  )
  const cents = number.substring(centsStartingPosition)
  return `${dollars}${decimalSeparator}${cents}`
}

export const toCurrency = (value, decimalSeparator='.') => {
  const digits = getDigitsFromValue(value)
  const digitsWithPadding = padDigits(digits)
  return addDecimalToNumber(digitsWithPadding, decimalSeparator)
}

