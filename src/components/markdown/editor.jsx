import React from 'react'
import PropTypes from 'prop-types'
import MonacoEditor from '@monaco-editor/react'
import { CircularProgress, Typography } from '@material-ui/core'

export default function MarkdownEditor({
  defaultValue = '',
  onChange,
  width,
  height,
  ...props
}) {
  return (
    <MonacoEditor
      options={{ wordWrap: 'on', lineNumbers: false }}
      width={width}
      height={height}
      theme="vs-dark"
      defaultValue={defaultValue}
      defaultLanguage="markdown"
      onChange={onChange}
      loading={
        <Typography align="center" component="div">
          <CircularProgress />
          <Typography variant="h4">Initialize Edtior...</Typography>
        </Typography>
      }
      {...props}
    />
  )
}

MarkdownEditor.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
