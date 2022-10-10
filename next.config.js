/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
};

const withTM = require("next-transpile-modules")([
  "@square/web-sdk",
  "react-square-web-payments-sdk",
]);
module.exports = withTM({
  nextConfig,
  experimental: {
    esmExternals: "loose",
  },
});
