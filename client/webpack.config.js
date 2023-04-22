const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),

      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'sw.js',
      }),

      new WebpackPwaManifest({
        //filename: 'manifest.json',
        name: 'JATE',
        short_name: 'JATE',
        start_url: '/',
        display: 'standalone',
        background_color: '#212121',
        theme_color: '#1976d2',
        icons: [
          {
            src: path.resolve( __dirname, 'src/images/logo.png'),
            size: [72, 96, 128, 144, 152, 192, 384, 512],
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        },
      ],
    },

    resolve: {
      extensions: ['.js', '.json'],
      modules: [path.resolve(__dirname, 'client/src'), 'node_modules'],
    },
  };
};
