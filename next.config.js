module.exports = {
  future: {
    webpack5: true
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
