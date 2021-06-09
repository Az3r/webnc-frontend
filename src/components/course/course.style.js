import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  title: {
    height: 48,
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
    height: '100%'
  },
  category: {
    position: 'absolute',
    bottom: theme.spacing(0.5),
    right: theme.spacing(0.5)
  }
}))
