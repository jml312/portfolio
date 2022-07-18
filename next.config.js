module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.sanity.io"]
  },
  experimental: {
    images: { allowFutureImage: true, esmExternals: true }
  }
};
