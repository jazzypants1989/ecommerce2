/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
  '@square/web-sdk',
  'react-square-web-payments-sdk',
]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    esmExternals: 'loose',
  },
});
