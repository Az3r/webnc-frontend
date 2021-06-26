import React from 'react'
import { Editor, Presenter } from '@/components/markdown'
import { Box } from '@material-ui/core'
import { useState } from 'react'

export default function MarkdownDemo() {
  const [markdown, update] = useState(`
# H1

## H2

### h3
`)
  return (
    <Box display="flex" height="100vh" width="100%">
      <Box flexGrow={1}>
        <Editor value={markdown} onChange={(s) => update(s.target.value)} />
      </Box>
      <Box flexGrow={1.5}>
        <Presenter>{markdown}</Presenter>
      </Box>
    </Box>
  )
}
