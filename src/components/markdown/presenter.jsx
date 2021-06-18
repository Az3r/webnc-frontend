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
import gfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'
import clsx from 'clsx'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism-async-light'
import light from 'react-syntax-highlighter/dist/cjs/styles/prism/prism'
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark'
import useStyles from './presenter.style'

// Did you know you can use tildes instead of backticks for code in markdown? ✨
export default function Markdown({ children = <></> }) {
  const styles = useStyles()
  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      skipHtml
      components={{
        h1: ({ children }) => (
          <Typography align="center" variant="h1">
            {children}
          </Typography>
        ),
        h2: ({ children }) => (
          <Typography align="center" variant="h2">
            {children}
          </Typography>
        ),
        h3: ({ children }) => (
          <Typography align="center" variant="h3">
            {children}
          </Typography>
        ),
        h4: ({ children }) => <Typography variant="h4">{children}</Typography>,
        h5: ({ children }) => <Typography variant="h5">{children}</Typography>,
        h6: ({ children }) => <Typography variant="h6">{children}</Typography>,
        a: ({ href, children }) => <Link href={href}>{children}</Link>,
        p: ({ children }) => <Typography component="p">{children}</Typography>,
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
        th: ({ children }) => <TableCell align="center">{children}</TableCell>,
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
              <Typography className={styles.list_index}>
                {index + 1}.
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
              <ListItemIcon
                classes={{
                  root: clsx(styles.list_icon, {
                    [styles.shift4px]: ordered
                  })
                }}
              >
                {start}
              </ListItemIcon>
              <ListItemText primary={children} />
            </ListItem>
          )
        },
        input: () => <></>,
        blockquote: ({ children }) => {
          return (
            <Box className={styles.quote_box} component="blockquote">
              {children}
            </Box>
          )
        },
        code: ({ children, className }) => {
          const theme = useTheme()
          const match = /language-(\w+)/.exec(className || '')
          const language = match ? match[1] : 'text'
          return (
            <SyntaxHighlighter
              showLineNumbers
              style={theme.palette.type === 'dark' ? dark : light}
              language={language}
              customStyle={{ padding: 16, margin: 0 }}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          )
        },
        img: ({ src, title }) => {
          return (
            <Typography align="center">
              <img src={src} alt={title} />
            </Typography>
          )
        }
      }}
    >
      {children}
    </ReactMarkdown>
  )
}

Markdown.propTypes = {
  children: PropTypes.node
}

Markdown.defaultProps = {
  children: <></>
}
