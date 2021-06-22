import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  title: {
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
    height: '50%'
  },

  root: {
    position: 'relative',
    height: 0,
    overflow: 'hidden',
    paddingTop: '100%'
  },
  card: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },

  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing(0, 1),
    '&:last-child': {
      paddingBottom: theme.spacing(0)
    }
  }
}))

export const COURSE_WIDTH = 320
export const THUMBNAIL_WIDTH = 120
