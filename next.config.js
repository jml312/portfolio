module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"]
  },
  experimental: {
    images: { allowFutureImage: true }
  }
};
