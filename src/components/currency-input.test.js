const CurrencyInput = require('./currency-input')
const renderShallow = require('render-shallow').default
const React = require('react')

const { createSpy } = jasmine

it('exports CurrencyInput on .default for module compatibility', () => {
  expect(CurrencyInput.default).toEqual(CurrencyInput)
})

describe('when rendered with required props', () => {
  let component

  beforeAll(() => {
    component = renderShallow(<CurrencyInput />).output
  })

  it('renders the input', () => {
    expect(component).toMatchSnapshot()
  })

})

describe('with props.value', () => {
  const props = { value: '1' }
  let component

  beforeAll(() => {
    component = renderShallow(<CurrencyInput {...props} />).output
  })

  it('sets the inputs value from props.value', () => {
    expect(component.props.value).toEqual(props.value)
  })

})

describe('with any unspecified prop', () => {
  const props = { readOnly: true }
  let component

  beforeAll(() => {
    component = renderShallow(<CurrencyInput {...props} />).output
  })

  it('passes the unknown props to the input', () => {
    Object.keys(props).forEach(prop => {
      expect(component.props[prop]).toEqual(props[prop])
    })
  })

})

describe('when the input value changes', () => {
  const props = { onChange: createSpy('onChange') }
  const changeEvent = { persist: createSpy('persist'), target: { value: '350' } }
  const expectedValue = '3.50'
  let component
  let componentInstance

  beforeAll(() => {
    const { instance, output, rerender } = renderShallow(<CurrencyInput {...props} />)

    output.props.onChange(changeEvent)

    component = rerender()
    componentInstance = instance()
  })

  it('the new value is masked and passed to the input', () => {
    expect(component.props.value).toEqual(expectedValue)
  })

  it('the value is mirrored on the instance', () => {
    expect(componentInstance.value).toEqual(expectedValue)
  })

  it('it calls props.onChange with the persisted event and new value', () => {
    expect(changeEvent.persist).toHaveBeenCalled()
    expect(props.onChange).toHaveBeenCalledWith(changeEvent, expectedValue)
  })

})

describe('when props.value is updated', () => {
  const updatedValue = '101'
  const expectedUpdatedValue = '1.01'
  let component

  beforeAll(() => {
    const { rerenderElement } = renderShallow(<CurrencyInput />)

    component = rerenderElement(<CurrencyInput value={updatedValue} />).output
  })

  it('updated the masked value on the input', () => {
    expect(component.props.value).toEqual(expectedUpdatedValue)
  })

})

