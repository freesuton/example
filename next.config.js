const withImages = require('next-images');

// const redirects = {

// };

module.exports  = {
  async rewrites () {
    return [
      {
        source: '/:path*',
        destination: 'http://node-env.eba-dp2nqvpq.us-east-1.elasticbeanstalk.com/:path*',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/dashboards',
        destination: '/dashboards/crypto',
        permanent: true
      }
    ];
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  }
};

// module.exports = withImages(redirects);
