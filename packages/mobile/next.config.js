// @generated: @expo/next-adapter@2.1.64
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo

const { withExpo } = require('@expo/next-adapter');
const withImages = require('next-images');

const BACKEND_HOST = process.env.BACKEND_HOST || 'http://10.240.158.1:8300';
const HOST = process.env.HOST || 'http://10.240.158.1:8090';

module.exports = withExpo(
  withImages({
    projectRoot: __dirname,
    publicRuntimeConfig: {
      HOST,
      BACKEND_HOST,
      BACKEND_HOST_SSR: process.env.BACKEND_HOST_SSR || BACKEND_HOST,
      AUTO_LOGIN_HOST: process.env.AUTO_LOGIN_HOST || HOST,
    },
  })
);
