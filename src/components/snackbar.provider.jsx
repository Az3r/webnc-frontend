import React, { useState, useEffect } from 'react'
import { Alert } from '@material-ui/lab'
import { Slide, Snackbar } from '@material-ui/core'

let show
export default function SnackBarProvider() {
  const [open, setOpen] = useState(false)
  const [queue, setQueue] = useState(null)
  const [alert, setAlert] = useState(null)

  show = ({ message, severity }) => setQueue([{ message, severity }])
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
  )
}

export function useSnackBar() {
  return { show }
}
