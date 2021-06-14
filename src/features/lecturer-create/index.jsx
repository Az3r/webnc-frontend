import React from 'react'

import Editor from '@/components/markdown/editor'
import { Box } from '@material-ui/core'

export default function CreateCourse() {
  return (
    <Box height="20vh" width="10vw">
      <Editor />
    </Box>
  )
}
