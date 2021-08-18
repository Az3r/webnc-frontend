/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import {
  ListItemIcon,
  TableBody,
  ListItem,
  List,
  Box,
  Divider,
  Link,
  ListItemText,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from '@material-ui/core'
import { CheckCircle, Cancel, FiberManualRecord } from '@material-ui/icons'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import light, {
  vscDarkPlus as dark
} from 'react-syntax-highlighter/dist/cjs/styles/prism/'
import useStyles from './presenter.style'
import clsx from 'clsx'

export default function Markdown({ width, height, value, ...props }) {
  const styles = useStyles()
  return (
    <Box width={width} height={height} {...props}>
      <ReactMarkdown
        remarkPlugins={[gfm]}
        skipHtml
        components={{
          h1: ({ children }) => (
            <Typography align="center" variant="h2" component="h1">
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography variant="h3">{children}</Typography>
          ),
          h3: ({ children }) => (
            <Typography variant="h4">{children}</Typography>
          ),
          h4: ({ children }) => (
            <Typography variant="h5">{children}</Typography>
          ),
          h5: ({ children }) => (
            <Typography variant="h6">{children}</Typography>
          ),
          h6: ({ children }) => (
            <Typography variant="subtitle1">{children}</Typography>
          ),
          a: ({ href, children }) => <Link href={href}>{children}</Link>,
          p: ({ children }) => (
            <Typography component="p" className={styles.p}>
              {children}
            </Typography>
          ),
          span: ({ children }) => <Typography>{children}</Typography>,
          strong: ({ children }) => <b className={styles.strong}>{children}</b>,
          em: ({ children }) => <em className={styles.em}>{children}</em>,
          pre: ({ children }) => <pre className={styles.pre}>{children}</pre>,
          thead: ({ children }) => <TableHead>{children}</TableHead>,
          tbody: ({ children }) => <TableBody>{children}</TableBody>,
          table: ({ children }) => (
            <TableContainer component={Paper} className={styles.table}>
              <Table>{children}</Table>
            </TableContainer>
          ),
          tr: ({ children }) => <TableRow>{children}</TableRow>,
          th: ({ children }) => (
            <TableCell align="center">{children}</TableCell>
          ),
          td: ({ children, style: { textAlign } }) => (
            <TableCell align={textAlign}>{children}</TableCell>
          ),
          hr: () => <Divider className={styles.hr} />,
          ol: ({ children }) => <List component="ol">{children}</List>,
          ul: ({ children }) => <List component="ul">{children}</List>,
          li: ({ children, checked, index, ordered }) => {
            let start
            if (ordered)
              start = (
                <Typography color="inherit">
                  <b>{index + 1}.</b>
                </Typography>
              )
            else if (checked == true)
              start = (
                <CheckCircle
                  classes={{ root: clsx(styles.todo_done, styles.icon) }}
                />
              )
            else if (checked == false)
              start = (
                <Cancel
                  classes={{ root: clsx(styles.todo_cancel, styles.icon) }}
                />
              )
            else start = <FiberManualRecord classes={{ root: styles.icon }} />
            return (
              <ListItem dense>
                <ListItemIcon className={styles.list_icon}>
                  {start}
                </ListItemIcon>
                <ListItemText primary={children} />
              </ListItem>
            )
          },
          input: () => undefined,
          blockquote: ({ children }) => {
            return (
              <Box className={styles.quote_box} component="blockquote">
                {children}
              </Box>
            )
          },
          code: ({ children, className }) => {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : 'text'
            return (
              <SyntaxHighlighter
                showLineNumbers
                style={dark}
                language={language}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            )
          },
          img: ({ src, title }) => {
            return <img src={src} alt={title} />
          }
        }}
      >
        {value}
      </ReactMarkdown>
    </Box>
  )
}

Markdown.propTypes = {
  value: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
