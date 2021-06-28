import { Toolbar, AppBar } from '@material-ui/core'
import React from 'react'
import dynamic from 'next/dynamic'
import useStyles from './appbar.style'
import { useAuth } from '@/components/hooks/auth.provider'

const GuestAppBar = dynamic(() => import('./guest.appbar'))
const StudentAppBar = dynamic(() => import('./student.appbar'))

export default function MainAppBar() {
  const styles = useStyles()
  const { error, user } = useAuth()
  if (error) console.error(error)
  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={styles.root}>
          {user ? <StudentAppBar student={user} /> : <GuestAppBar />}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}
