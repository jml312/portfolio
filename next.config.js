module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"]
  },
  async redirects() {
    return [
      {
        source: "/resume",
        destination: "/assets/Josh%20Levy%20Resume.pdf",
        permanent: true
      }
    ];
  },
  experimental: {
    images: { allowFutureImage: true }
  }
};
