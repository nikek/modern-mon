module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    browsers: ['PhantomJS'],
    reporters: ['dots'],

    files: ['src/**/*.spec.js'],
    preprocessors: { 'src/**/*.js': ['webpack'] },

    webpack: require('./webpack.config'),
    webpackServer: { noInfo: true },

    singleRun: true
  });
};
