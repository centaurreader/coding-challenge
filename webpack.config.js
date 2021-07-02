const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,

  entry: './src/index.ts',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
              '@babel/preset-env',
            ],
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],

  devServer: {
    contentBase: ['./src', './dist'],
    compress: true,
    port: 8080,
    hot: true,
    historyApiFallback: true,
  },
};
