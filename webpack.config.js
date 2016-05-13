var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    entry: { app: './src/index.js' },
    output: {
      path: './build/',
      publicPath: '/build/',
      filename: 'all.js'
    },
    plugins: [
      new webpack.ProvidePlugin({ riot: 'riot' }),
      new ExtractTextPlugin('all.css')
    ],
    module: {
      preLoaders: [
        { test: /\.tag$/, exclude: /node_modules/, loader: 'riotjs-loader', query: { type: 'es6' } }
      ],
      loaders: [
        { test: /\.js|\.tag$/, exclude: /node_modules/, include: /src/, loader: 'babel-loader', query: {modules: 'common'} },
        { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader") }
      ]
    },
    devServer: {
      port: 5555,
      historyApiFallback: true,
      host: '0.0.0.0',            // reach app from network (test on devices)
      proxy: {
        '/heroic/*': {
          target: 'http://localhost:8080',
          rewrite: function(req) {
            req.url = req.url.replace(/^\/heroic/, '');
          }
        }
      }
    }
}
