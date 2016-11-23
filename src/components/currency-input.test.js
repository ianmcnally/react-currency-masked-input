import React from 'react'
import CurrencyInput from './currency-input'
import renderShallow from 'render-shallow'
import { renderIntoDocument } from 'react-addons-test-utils'

const { createSpy } = jasmine

describe('when rendered to the DOM', () => {

  it('does not crash', () => {
    expect(() => renderIntoDocument(<CurrencyInput />)).not.toThrow()
  })

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

describe('with props.defaultValue', () => {
  const props = { defaultValue: '1' }
  let component

  beforeAll(() => {
    component = renderShallow(<CurrencyInput {...props} />).output
  })

  it('sets the input`s value from props.defaultValue', () => {
    expect(component.props.value).toEqual(props.defaultValue)
  })

})

describe('with props.value', () => {
  const props = { value: '1' }
  let component

  beforeAll(() => {
    component = renderShallow(<CurrencyInput {...props} />).output
  })

  it('will pass value directly to the input, making it controlled', () => {
    expect(component.props.value).toEqual(props.value)
  })

})

describe('with no props.value and props.value is updated', () => {
  const initialProps = {}
  const newProps = { value: '100' }
  let component

  beforeAll(() => {
    const { rerenderElement } = renderShallow(<CurrencyInput {...initialProps} />)
    component = rerenderElement(<CurrencyInput {...newProps} />).output
  })

  it('sets the new props.value on the input', () => {
    expect(component.props.value).toEqual(newProps.value)
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
  const props = {}
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

  it('does not persist the event without props.onChange', () => {
    expect(changeEvent.persist).not.toHaveBeenCalled()
  })

})

describe('when the input value changes and props.onChange is specified', () => {
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

  it('it calls props.onChange with the persisted event and new value', () => {
    expect(changeEvent.persist).toHaveBeenCalled()
    expect(props.onChange).toHaveBeenCalledWith(changeEvent, expectedValue)
  })

})

