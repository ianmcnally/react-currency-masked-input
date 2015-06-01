/*
  CurrencyMaskedInput by Ian McNally.

  Version 0.0.2.

  Licensed to do whatever you want with.
*/

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

// <CurrencyMaskedInput />
//
// Creates an input that gets masked as currency.
//
// Usage: accepts an properties you'd normally set on an input.
//
// Notes:
//   - Will use the `value` prop passed in as an initial value,
//    but will take over from there.
//   - Calls `onChange` prop after updating its internal value.
//   - To maintain a reference to the input, it's best to attach
//     a `ref` prop to <CurrencyMaskedInput>, since it will be inherited.

var CurrencyMaskedInput = (function (_React$Component) {
  function CurrencyMaskedInput(props) {
    _classCallCheck(this, CurrencyMaskedInput);

    _get(Object.getPrototypeOf(CurrencyMaskedInput.prototype), 'constructor', this).call(this, props);
    this.state = {
      value: props.value || null
    };

    this.onChange = this.onChange.bind(this);
    this.render = this.render.bind(this);
  }

  _inherits(CurrencyMaskedInput, _React$Component);

  _createClass(CurrencyMaskedInput, [{
    key: 'onChange',
    value: function onChange(evt) {
      var value = this._maskedInputValue(evt.target.value);
      this.setState({ value: value });
      if (this.props.onChange) {
        // call original callback, if it exists
        // but give the state enough time to update.
        setTimeout(this.props.onChange, 0);
      }
    }
  }, {
    key: '_maskedInputValue',
    value: function _maskedInputValue(value) {
      var digits = value.match(/\d/g) || [];

      if (!digits.length) {
        return null;
      }

      // zero-pad a one-digit input
      if (digits.length === 1) {
        digits.unshift('0');
      }

      // add a decimal point
      digits.splice(digits.length - 2, 0, '.');

      // make a number with 2 decimal points
      return Number(digits.join('')).toFixed(2);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement('input', _extends({}, this.props, { value: this.state.value, onChange: this.onChange }));
    }
  }]);

  return CurrencyMaskedInput;
})(_react2['default'].Component);

exports['default'] = CurrencyMaskedInput;
module.exports = exports['default'];