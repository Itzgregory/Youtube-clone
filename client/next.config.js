/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  //to help with module resolution//
  experimental: {
    esmExternals: false
  }
}

module.exports = nextConfig;