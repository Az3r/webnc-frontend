import { Typography } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import useStyles from './content.style'
import { useDashboard } from './dashboard.context'

export default function DashboardContent() {
  const { drawer } = useDashboard()
  const styles = useStyles()
  return (
    <main
      className={clsx(styles.root, {
        [styles.shift]: drawer
      })}
    >
      <div className={styles.toolbar} />
      <Typography variant="h1">Hello</Typography>
    </main>
  )
}
