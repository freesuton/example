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

// module.exports = withImages(redirects);
