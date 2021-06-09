import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  title: {
    height: 120.4 / 3,
    display: '-webkit-box',
    boxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    WebkitLineClamp: 2,
    lineClamp: 2
  },
  lecturer: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    color: theme.palette.text.secondary,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    WebkitLineClamp: 1,
    lineClamp: 1
  },
  thumbnail: {
    height: 120
  },
  root: {
    width: 320
  },
  content: {
    padding: theme.spacing(0, 2),
    '&:last-child': {
      paddingBottom: theme.spacing(1)
    }
  }
}))
