import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Alert } from '@material-ui/lab'
import { Slide, Snackbar } from '@material-ui/core'

const SnackBarContext = React.createContext({
  open: false,
  alert: { message: '', severity: '' },
  show: () => {}
})

export default function SnackBarProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [queue, setQueue] = useState(null)
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    if (open && alert && queue?.length) {
      // there is an active snackbar right now, so we close it
      setOpen(false)
    } else if (queue?.length) {
      // display next snackbar in queue
      setAlert(queue[0])
      setOpen(true)
      setQueue(null)
    }
  }, [open, queue, alert])

  return (
    <SnackBarContext.Provider
      value={{
        open,
        alert,
        snackbar: {},
        show: ({ message, severity }) => setQueue([{ message, severity }])
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        autoHideDuration={3000}
        TransitionComponent={Slide}
        onClose={() => setOpen(false)}
      >
        <Alert variant="filled" severity={alert?.severity}>
          {alert?.message}
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
