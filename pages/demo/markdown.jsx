import React from 'react'
import { Editor, Presenter } from '@/components/markdown'
import StudentLayout from '@/components/layout/student'
import { Box, Divider } from '@material-ui/core'
import { useState } from 'react'

export default function MarkdownDemo() {
  const [markdown, update] = useState(`
# H1

## H2

### h3
`)
  return (
    <StudentLayout>
      <Box display="flex" height="100vh" width="100%">
        <Editor value={markdown} onChange={(s) => update(s)} />
        <Presenter>{markdown}</Presenter>
      </Box>
    </StudentLayout>
  )
}
