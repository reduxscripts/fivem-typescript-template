const path = require('path');
const webpack = require('webpack');
const RemovePlugin = require('remove-files-webpack-plugin');
const WebpackObfuscator = require('webpack-obfuscator');
const buildPath = path.resolve(__dirname, 'build');

const serverConfig = {
  target: 'node',
  // here add every seperated folder for entry
  entry: {
    sv_server: './server/server.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(buildPath, 'server'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ 'global.GENTLY': false }),
    new RemovePlugin({
      before: { include: [path.resolve(buildPath, 'server')] },
      watch: { include: [path.resolve(buildPath, 'server')] },
    }),
    new WebpackObfuscator({
      rotateStringArray: true,
      stringArray: true,
      transformObjectKeys: true,
      compact: false,
    }),
  ],
  optimization: { minimize: true  },
  stats: {
    errorDetails: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'], // Add extensions for TypeScript files
    alias: {
      '@server': path.resolve(__dirname, 'dist/server'), // Add alias for client module path
    },
  },
};

const clientConfig = {
  target: 'node',
  entry: {
    cl_client: './client/client.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(buildPath, 'client'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new RemovePlugin({
      before: { include: [path.resolve(buildPath, 'client')] },
      watch: { include: [path.resolve(buildPath, 'client')] },
    }),
    new WebpackObfuscator({
      rotateStringArray: true,
      stringArray: true,
      transformObjectKeys: true,
      compact: false,
    }),
  ],
  optimization: { minimize: true },
  stats: {
    errorDetails: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'], // Add extensions for TypeScript files
    alias: {
      '@client': path.resolve(__dirname, 'dist/client'), // Add alias for client module path
    },
  },
};

module.exports = [serverConfig, clientConfig];