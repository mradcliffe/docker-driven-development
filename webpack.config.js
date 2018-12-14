const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = () => undefined !== process.env.NODE_ENV && process.env.NODE_ENV === 'production';
const isDev = () => !isProd();
const isTest = () => isDev();

const entry = [
  'babel-polyfill',
  path.join(__dirname, '/app/js/app.js'),
];
if (isDev() || isTest()) {
  entry.push('webpack-dev-server/client?http://localhost:8000');
}

const config = {
  mode: isProd() ? 'production' : 'development',
  devtool: isProd() ? 'source-map' : 'inline-module-source-map',
  entry,
  cache: !isProd(),
  output: {
    path: path.join(__dirname, '/webroot'),
    filename: 'js/main.js',
    publicPath: '',
  },
  node: {
    fs: 'empty',
  },
  devServer: {
    contentBase: path.join(__dirname, '/app'),
    historyApiFallback: true,
    hot: true,
    port: 8000,
    inline: true,
    publicPath: '',
    noInfo: false,
    proxy: {
      "/api": {
        target: "http://web.internal",
        secure: false,
        changeOrigin: true,
        logLevel: 'debug',
        cookieDomainRewrite: {
          localhost: '.web.internal',
          '.web.internal': 'localhost',
        },
      },
    },
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve('./app'),
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, '/app'),
        enforce: 'pre',
        loader: 'eslint-loader',
      },
      {
        test: /\.css$/,
        use: ['css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|gif|jpg|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'images/[hash].[ext]',
        },
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: 'fonts/[hash].[ext]',
        },
      },
      {
        test: /\.(mp4|ogg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[hash].[ext]',
        },
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        exclude: /line\.svg/,
        options: {
          name: 'fonts/[hash].[ext]',
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
    ],
  },
};

if (isProd()) {
  config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  config.plugins.push(new ExtractTextPlugin({ filename: 'css/main.css' }));

  // Change the sass-loader to use the extract text plugin instead of loading via JavaScript.
  const scssIndex = config.module.rules.findIndex(loader => loader.test.test('app.scss'), -1);
  if (scssIndex !== -1) {
    config.module.rules[scssIndex] = {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      }),
    };
  }
} else {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.LoaderOptionsPlugin({ debug: true }));
  config.plugins.push(new HtmlWebpackPlugin({ template: "./app/index.html", filename: "./index.html" }));

  // Font loading fix because webpack, sass-loader and css-loader do not like to change
  // source and dist directories.
  const woffIndex = config.module.rules.findIndex(loader => loader.test.test('blah.woff'), -1);
  const eotIndex = config.module.rules.findIndex(loader => loader.test.test('blah.eot'), -1);

  if (woffIndex !== -1) {
    config.module.rules[woffIndex].options.name = '[name].[ext]';
  }
  if (eotIndex !== -1) {
    config.module.rules[eotIndex].options.name = '[name].[ext]';
  }
}

module.exports = config;
