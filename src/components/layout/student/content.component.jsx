import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import useStyles from './content.style'
import { useStudent } from './student.context'

export default function StudentContent({ children = <></> }) {
  const { drawer } = useStudent()
  const styles = useStyles()
  return (
    <main
      className={clsx(styles.root, {
        [styles.shift]: drawer
      })}
    >
      <div className={styles.toolbar} />
      {children}
    </main>
  )
}

StudentContent.propTypes = {
  children: PropTypes.node
}
