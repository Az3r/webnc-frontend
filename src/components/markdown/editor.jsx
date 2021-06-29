import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, useTheme } from '@material-ui/core'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism-async-light'
import light from 'react-syntax-highlighter/dist/cjs/styles/prism/prism'
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark'
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown'
import useStyles from './editor.style'

SyntaxHighlighter.registerLanguage('markdown', markdown)
export default function MarkdownEditor({
  value,
  onChange,
  onScroll,
  ...props
}) {
  const [text, update] = useState(value || '')
  const [offset, scroll] = useState({ top: 0, left: 0 })
  const textareaEl = useRef(null)
  const outputEl = useRef(null)
  const theme = useTheme()
  const styles = useStyles()

  useEffect(() => {
    if (!outputEl.current)
      outputEl.current = textareaEl.current.nextElementSibling
    outputEl.current.scrollTop = offset.top
    outputEl.current.scrollLeft = offset.left
  }, [offset])

  return (
    <Box position="relative" height="100%">
      <textarea
        ref={textareaEl}
        {...props}
        spellCheck={false}
        className={styles.textarea}
        value={text}
        onChange={(e) => {
          update(e.target.value)
          onChange?.call(undefined, e)
        }}
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
        onScroll={(e) => {
          scroll({ top: e.target.scrollTop, left: e.target.scrollLeft })
          onScroll?.call(undefined, e)
        }}
      />
      <SyntaxHighlighter
        showLineNumbers
        lineNumberStyle={{
          width: theme.spacing(5),
          paddingRight: theme.spacing(2)
        }}
        className={styles.output}
        customStyle={{
          ...theme.typography.body1,
          padding: theme.spacing(1, 2),
          margin: 0,
          borderRadius: 0,
          overflow: 'hidden',
          whiteSpace: 'no-wrap'
        }}
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
  value: PropTypes.string,
  onChange: PropTypes.func,
  onScroll: PropTypes.func
}
