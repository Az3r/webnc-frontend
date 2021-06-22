import React from 'react'
import { Typography } from '@material-ui/core'
import useStyles from './topic.style'
import { TopicPropTypes } from '@/utils/typing'

export default function TopicFeature({ topic }) {
  const styles = useStyles()
  return <Typography>Topic</Typography>
}

TopicFeature.propTypes = {
  topic: TopicPropTypes.isRequired
}
