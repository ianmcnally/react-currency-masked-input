import React from 'react';
import {addons} from 'react/addons';
import CurrencyMaskedInput from '../src/react-currency-masked-input.jsx';

describe('CurrencyMaskedInput', () => {

  describe('props passing', () => {
    let input;
    let value = '100';
    let nonsenseProp = 'nonsense';

    beforeEach(() => {
      input = addons.TestUtils.renderIntoDocument(
        <CurrencyMaskedInput value={value} nonsenseProp={nonsenseProp}/>
      );
    });

    it('sets the initial state value from props.value', () => {
      expect(input.state.value).toEqual(value);
    });

    it('passes in any prop', () => {
      expect(input.props.nonsenseProp).toEqual(nonsenseProp);
    });

  });

  describe('change', () => {
    let input;
    let inputEl;
    let originalOnChange = jasmine.createSpy('originalOnChange');

    beforeEach(() => {
      input = addons.TestUtils.renderIntoDocument(
        <CurrencyMaskedInput onChange={originalOnChange}/>
      );
      inputEl = React.findDOMNode(input);
    });

    it('masks a single digit number as a penny', () => {
      let value = '1';
      let expectedMaskedValue = '0.01';

      inputEl.value = value;
      addons.TestUtils.Simulate.change(inputEl);

      expect(input.state.value).toEqual(expectedMaskedValue);
    });

    it('masks a double digit number as cents', () => {
      let value = '50';
      let expectedMaskedValue = '0.50';

      inputEl.value = value;
      addons.TestUtils.Simulate.change(inputEl);

      expect(input.state.value).toEqual(expectedMaskedValue);
    });

    it('masks a triple digit number as dollar and cents', () => {
      let value = '350';
      let expectedMaskedValue = '3.50';

      inputEl.value = value;
      addons.TestUtils.Simulate.change(inputEl);

      expect(input.state.value).toEqual(expectedMaskedValue);
    });

    it('masks a multiple digit numbers', () => {
      let value = '123456789';
      let expectedMaskedValue = '1234567.89';

      inputEl.value = value;
      addons.TestUtils.Simulate.change(inputEl);

      expect(input.state.value).toEqual(expectedMaskedValue);
    });

    it('masks invalid input as zero', () => {
      let value = 'abcdef';
      let expectedMaskedValue = '0.00';

      inputEl.value = value;
      addons.TestUtils.Simulate.change(inputEl, {
        target: {
          validity: {badInput: true},
          value: value
        }
      });

      expect(input.state.value).toEqual(expectedMaskedValue);
    });

    it('masks a cleared input as null', () => {
      let value = ''; // when a user deletes input text, it gets passed as ''
      let expectedMaskedValue = null;

      inputEl.value = value;
      addons.TestUtils.Simulate.change(inputEl, {
        target: {
          validity: {badInput: false},
          value: value
        }
      });

      expect(input.state.value).toEqual(expectedMaskedValue);
    });

    it('calls props.onChange, with correct arguments', () => {
      let value = '123';
      let expectedMaskedValue = '1.23';
      inputEl.value = value;
      addons.TestUtils.Simulate.change(inputEl);

      expect(originalOnChange).toHaveBeenCalledWith(jasmine.any(Object), expectedMaskedValue);
    });

  });

});