var webpack = require('webpack');

module.exports = {

  entry: ['./src/react-currency-masked-input.jsx'],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },

  output: {
    path: "./dist/",
    library: 'CurrencyMaskedInput',
    libraryTarget: 'var',
    filename: 'react-currency-masked-input.js'
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  externals: {
    'react': 'React'
  }
};
