const path = require('path');
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER
} = require('next/constants');
const webpack = require('webpack');
const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');


const nextRuntimeConfig = {
  serverRuntimeConfig: {
  },
  publicRuntimeConfig: {
    HOST_URL: process.env.HOST_URL
  },
};

module.exports = withPlugins([
  [withCSS, {
    cssModules: false,
  }],
  [withSass, {
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]___[hash:base64:5]",
    }
  }]
], nextRuntimeConfig);