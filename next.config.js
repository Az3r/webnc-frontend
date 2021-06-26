module.exports = {
  future: {
    webpack5: true
  },
  images: {
    domains: ['picsum.photos']
  },
  async redirects() {
    return [
      {
        source: '/category/:anything*',
        destination: '/:anything*',
        permanent: true
      }
    ]
  }
}
