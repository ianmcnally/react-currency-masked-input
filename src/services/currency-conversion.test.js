const currencyConversion = require('./currency-conversion')
const { toCurrency } = currencyConversion

describe('toCurrency', () => {

  describe('with a single digit', () => {
    const value = '1'
    let result

    beforeAll(() => {
      result = toCurrency(value)
    })

    it('returns a penny amount', () => {
      expect(result).toEqual('0.01')
    })

  })

  describe('with a double digit number', () => {
    const value = '50'
    let result

    beforeAll(() => {
      result = toCurrency(value)
    })

    it('returns a double digit cents amount', () => {
      expect(result).toEqual('0.50')
    })

  })

  describe('with a triple digit number', () => {
    const value = '255'
    let result

    beforeAll(() => {
      result = toCurrency(value)
    })

    it('returns a dollar and cents amount', () => {
      expect(result).toEqual('2.55')
    })

  })

  describe('with a several-digit number', () => {
    const value = '2558'
    let result

    beforeAll(() => {
      result = toCurrency(value)
    })

    it('returns a multiple dollar and cents value', () => {
      expect(result).toEqual('25.58')
    })

  })

  describe('the value includes dots', () => {
    const value = '2.04'
    let result

    beforeAll(() => {
      result = toCurrency(value)
    })

    it('returns a number without the extra dots', () => {
      expect(result).toEqual('2.04')
    })

  })

  describe('with invalid', () => {
    const value = 'abcdef'
    let result

    beforeAll(() => {
      result = toCurrency(value)
    })

    it('returns a zero', () => {
      expect(result).toEqual('0.00')
    })

  })

})

