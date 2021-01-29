// const path = require('path');

// module.exports = {
//   mode: 'development',

//   entry: {
//     main: path.resolve(__dirname, 'src', 'js', 'client', 'client.js'),
//   },

//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'src', 'js'),
//   },

//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env'],
//           },
//         },
//       },
//     ],
//   },
// };

const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  mode: 'development',

  entry: {
    main: path.resolve(__dirname, 'entry.js'),
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '../',
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
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // (file-size > limit) ? use file-loader
              publicPath: './',
              name: 'img/[name].[ext]?[hash]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
};

module.exports = config;
