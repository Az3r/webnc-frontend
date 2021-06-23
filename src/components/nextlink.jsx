import React from 'react'
import PropTypes from 'prop-types'
import NLink from 'next/link'
import { Link, makeStyles } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  link: {
    ['&:hover']: {
      color: theme.palette.primary.main
    }
  }
}))

export default function NextLink({ href, className, ...props }) {
  const styles = useStyles()
  return (
    <NLink href={href} passHref>
      <Link {...props} className={clsx(styles.link, className)} />
    </NLink>
  )
}

NextLink.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string
}
