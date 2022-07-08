const withImages = require('next-images');

const redirects = {
  async redirects() {
    return [
      {
        source: '/dashboards',
        destination: '/dashboards/crypto',
        permanent: true
      }
    ];
  }
};

module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/:path*",
        destination: 'http://localhost:4000/:path*',
      },
    ];
  };
  return {
    rewrites,
  };
};

module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}
// module.exports = withImages(redirects);
