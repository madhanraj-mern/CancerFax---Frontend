const webpack = require('webpack');

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "stream": require.resolve("stream-browserify"),
    "util": require.resolve("util"),
    "crypto": false,
    "assert": false,
    "http": false,
    "http2": false,
    "https": false,
    "os": false,
    "url": false,
    "zlib": false
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ]);
  config.ignoreWarnings = [/Failed to parse source map/];
  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false
    }
  });
  return config;
}


