import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, useTheme } from '@material-ui/core'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism-async-light'
import light from 'react-syntax-highlighter/dist/cjs/styles/prism/prism'
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/tomorrow'
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown'
import clsx from 'clsx'
import useStyles from './create-course.style'

SyntaxHighlighter.registerLanguage('markdown', markdown)
export default function MarkdownEditor({ id = 'markdown-editor' }) {
  const [text, update] = useState('')
  const [offset, scroll] = useState(0)
  const outputEl = useRef(null)
  const theme = useTheme()
  const styles = useStyles()

  useEffect(() => {
    if (!outputEl.current) outputEl.current = document.getElementById(id)
    outputEl.current.scrollTop = offset
  }, [offset])

  return (
    <Box className={styles.root}>
      <textarea
        value={text}
        onChange={(e) => update(e.target.value)}
        onKeyDown={(e) => {
          if (e.code === 'Tab') {
            e.preventDefault()
            var s = e.target.selectionStart
            e.target.value =
              e.target.value.substring(0, e.target.selectionStart) +
              '\t' +
              e.target.value.substring(e.target.selectionEnd)
            e.target.selectionEnd = s + 1
          }
        }}
        onScroll={(e) => scroll(e.target.scrollTop)}
        className={clsx(styles.editor, styles.input, styles.text)}
      />
      <SyntaxHighlighter
        id={id}
        showLineNumbers
        className={clsx(styles.editor, styles.output)}
        customStyle={{ padding: theme.spacing(2), margin: 0, borderRadius: 0 }}
        language="markdown"
        codeTagProps={{
          className: styles.text
        }}
        style={theme.palette.type === 'dark' ? dark : light}
      >
        {text}
      </SyntaxHighlighter>
    </Box>
  )
}

MarkdownEditor.propTypes = {
  id: PropTypes.string.isRequired
}

MarkdownEditor.defaultProps = {
  id: 'markdown-editor'
}
