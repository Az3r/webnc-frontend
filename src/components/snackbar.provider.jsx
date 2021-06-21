import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from '@material-ui/lab'
import { Slide, Snackbar } from '@material-ui/core'

const SnackBarContext = React.createContext({
  snackbar: {
    open: false,
    severity: '',
    message: ''
  },
  show: () => {}
})

export default function SnackBarProvider({ children }) {
  const [snackbar, show] = React.useState({
    open: false,
    severity: '',
    message: ''
  })

  return (
    <SnackBarContext.Provider value={{ snackbar, show }}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbar.open}
        autoHideDuration={3000}
        TransitionComponent={Slide}
        onClose={() => show((prev) => ({ ...prev, open: false }))}
      >
        <Alert variant="filled" severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      {children}
    </SnackBarContext.Provider>
  )
}

export function useSnackBar() {
  return React.useContext(SnackBarContext)
}

SnackBarProvider.propTypes = {
  children: PropTypes.node.isRequired
}
