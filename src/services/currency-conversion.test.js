import { toCurrency } from './currency-conversion'

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

  describe('with one leading zero and a dollar amount', () => {
    const value = '02250'
    let result

    beforeAll(() => {
      result = toCurrency(value)
    })

    it('returns a real dollar amount', () => {
      expect(result).toEqual('22.50')
    })

  })

  describe('with several leading zeros and a dollar amount', () => {
    const value = '000250'
    let result

    beforeAll(() => {
      result = toCurrency(value)
    })

    it('returns a real dollar amount', () => {
      expect(result).toEqual('2.50')
    })

  })

  describe('with several leading zeros and a cents amount', () => {
    const value = '000050'
    let result

    beforeAll(() => {
      result = toCurrency(value)
    })

    it('returns the cents with only one leading zero', () => {
      expect(result).toEqual('0.50')
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

  describe('a negative value', () => {
    const value = '-200'
    let result
    beforeAll(() => {
      result = toCurrency(value)
    })

    it('returns a number with a negative prefix', () => {
      expect(result).toEqual('-2.00')
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

  describe('with no value', () => {
    let result

    beforeAll(() => {
      result = toCurrency()
    })

    it('returns a zero', () => {
      expect(result).toEqual('0.00')
    })

  })

})

