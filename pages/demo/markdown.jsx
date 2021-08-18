import React from 'react'
import MonacoEditor from '@monaco-editor/react'
import { Box, CircularProgress, Typography } from '@material-ui/core'
import { useState } from 'react'
import Markdown from '@/components/markdown/presenter'

export default function MarkdownDemo() {
  const [markdown, update] = useState(`
# H1

## H2

### h3
`)
  return (
    <Box display="flex">
      <MonacoEditor
        width={800}
        height={600}
        defaultValue={markdown}
        value={markdown}
        theme="vs-dark"
        defaultLanguage="markdown"
        onChange={(text) => update(text)}
        loading={
          <Typography align="center" component="div">
            <CircularProgress />
            <Typography variant="h4">Initialize Edtior...</Typography>
          </Typography>
        }
      />
      <Markdown width={800} height={600} value={markdown} />
    </Box>
  )
}
