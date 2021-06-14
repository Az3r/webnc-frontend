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
  Typography
} from '@material-ui/core'
import gfm from 'remark-gfm'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { CheckCircle, Cancel, FiberManualRecord } from '@material-ui/icons'
import useStyles from './markdown.style'
import clsx from 'clsx'

// Did you know you can use tildes instead of backticks for code in markdown? ✨
export default function Markdown({ children = <></> }) {
  const styles = useStyles()
  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      skipHtml
      components={{
        h1: ({ children }) => <Typography variant="h1">{children}</Typography>,
        h2: ({ children }) => <Typography variant="h2">{children}</Typography>,
        h3: ({ children }) => <Typography variant="h3">{children}</Typography>,
        h4: ({ children }) => <Typography variant="h4">{children}</Typography>,
        h5: ({ children }) => <Typography variant="h5">{children}</Typography>,
        h6: ({ children }) => <Typography variant="h6">{children}</Typography>,
        a: ({ href, children }) => <Link href={href}>{children}</Link>,
        p: ({ children }) => <Typography component="p">{children}</Typography>,
        span: ({ children }) => <Typography>{children}</Typography>,
        strong: ({ children }) => <b className={styles.strong}>{children}</b>,
        code: ({ children }) => <code className={styles.code}>{children}</code>,
        em: ({ children }) => <em className={styles.em}>{children}</em>,
        thead: ({ children }) => <TableHead>{children}</TableHead>,
        tbody: ({ children }) => <TableBody>{children}</TableBody>,
        table: ({ children }) => (
          <TableContainer component={Paper}>
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
            start = <CheckCircle classes={{ root: styles.todo_done }} />
          else if (checked == false)
            start = <Cancel classes={{ root: styles.todo_cancel }} />
          else start = <FiberManualRecord />
          return (
            <ListItem>
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
