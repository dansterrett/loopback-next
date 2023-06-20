// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/example-webpack
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

const path = require('node:path');
const {ProvidePlugin} = require('webpack');

/**
 * Common configuration for both Node.js and Web
 */
const baseConfig = {
  mode: 'production',
  entry: './dist/index.js',
  // Uncomment the following line to enable source map
  // devtool: 'source-map',
  resolve: {
    extensions: ['.js'],
    fallback: {
      // Polyfill for Node.js core modules
      assert: require.resolve('assert/'),
      buffer: require.resolve('buffer/'),
      events: require.resolve('events/'),
      process: require.resolve('process/browser'),
      util: require.resolve('util/'),
    },
  },
};

/**
 * Configuration for a Node.js compatible bundle
 */
const nodeConfig = {
  ...baseConfig,
  name: 'node',
  target: 'node', // For Node.js
  output: {
    filename: 'bundle-node.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'umd', // We can use `commonjs2` for Node.js
    },
  },
};

/**
 * Configuration for a browser compatible bundle
 */
const webConfig = {
  ...baseConfig,
  name: 'web',
  target: 'web', // For browsers
  output: {
    filename: 'bundle-web.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'LoopBack',
      type: 'umd',
    },
  },
  plugins: [
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new ProvidePlugin({process: ['process']}),
  ],
};

// Expose two configurations for `webpack`. Use `--config-name <web|node>` to
// select a named entry.
module.exports = [nodeConfig, webConfig];
