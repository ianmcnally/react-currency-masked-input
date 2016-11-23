import babelPlugin from 'rollup-plugin-babel'

export default {
  entry: 'src/components/currency-input.js',
  format: 'cjs',
  dest: 'react-currency-masked-input.js',
  plugins: [babelPlugin({ exclude: 'node_modules/**' })]
}
