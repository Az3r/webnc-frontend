import React from 'react'
import PropTypes from 'prop-types'
import '@/app.css'

function MainApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MainApp

MainApp.propTypes = {
  Component: PropTypes.element.isRequired,
  pageProps: PropTypes.object
}

MainApp.defaultProps = {
  Component: <div />,
  pageProps: {}
}
