import React, { useState } from 'react'
import { Editor, Presenter } from '@/components/markdown'
import { Box } from '@material-ui/core'
import { useCreateCourse } from '.'

export default function DescriptionSection() {
  const { longdesc, setLongdesc } = useCreateCourse()
  return (
    <Box display="flex" height="100vh" width="100%">
      <Box width="50vw">
        <Editor
          value={longdesc}
          onChange={(s) => setLongdesc(s.target.value)}
        />
      </Box>
      <Box width="50vw">
        <Presenter>{longdesc}</Presenter>
      </Box>
    </Box>
  )
}
