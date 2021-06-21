import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  preview: {
    color: theme.palette.warning.main
  },
  list_icon: {
    minWidth: 36
  },
  text: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    WebkitLineClamp: 1,
    lineClamp: 1
  }
}))
