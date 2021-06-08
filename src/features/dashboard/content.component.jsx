import { Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './content.style'

export default function DashboardContent() {
  const styles = useStyles()
  return (
    <main className={styles.root}>
      <div className={styles.toolbar} />
      <Typography variant="h1">Hello</Typography>
    </main>
  )
}
