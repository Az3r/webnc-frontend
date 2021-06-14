import { fade, makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  strong: {
    ...theme.typography.body1,
    fontWeight: 'bold'
  },
  em: theme.typography.body1,
  pre: theme.typography.body1,
  hr: {
    height: 1,
    margin: theme.spacing(1, 0)
  },
  icon: { fontSize: 20 },
  list_icon: {
    minWidth: 36
  },
  list_index: {
    ...theme.typography.body1,
    color: theme.palette.text.primary
  },
  todo_cancel: {
    color: theme.palette.error.main
  },
  todo_done: {
    color: theme.palette.success.main
  },
  shift4px: {
    marginLeft: theme.spacing(1)
  },
  quote_box: {
    borderLeft: `${theme.spacing(1)}px solid ${theme.palette.info.light}`,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundColor: fade(theme.palette.text.primary, 0.1)
  },
  table: {
    margin: theme.spacing(2, 0)
  }
}))
