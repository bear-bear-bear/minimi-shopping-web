const path = require('path');

module.exports = {
  mode: 'development',

  entry: {
    main: path.resolve(__dirname, 'src', 'js', 'client', 'client.js'),
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src', 'js'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
