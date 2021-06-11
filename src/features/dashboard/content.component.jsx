import React, { memo, useEffect } from 'react'
import clsx from 'clsx'
import useStyles from './content.style'
import { sections, useDashboard } from './dashboard.context'
import dynamic from 'next/dynamic'

const MemoizedSearch = memo(dynamic(() => import('./search.section')))
const MemoizedWorkspace = memo(dynamic(() => import('./workspace.section')))
export default function DashboardContent() {
  const { drawer, section } = useDashboard()
  const styles = useStyles()

  return (
    <main
      className={clsx(styles.root, {
        [styles.shift]: drawer
      })}
    >
      <div className={styles.toolbar} />
      {navigate(section)}
    </main>
  )
}

function navigate(section = '') {
  switch (section) {
    case sections.home:
      return <MemoizedWorkspace />
    case sections.search:
      return <MemoizedSearch />
    default:
      break
  }
}
