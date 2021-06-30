import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  thumbnail: {
    transition: theme.transitions.create('filter'),
    ['&:hover']: {
      filter: 'brightness(33%)'
    }
  },
  title: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    WebkitLineClamp: 2,
    lineClamp: 2,
    [theme.breakpoints.down('xs')]: {
      WebkitLineClamp: 1,
      lineClamp: 1
    }
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
  content: {
    padding: theme.spacing(0, 2),
    '&:last-child': {
      paddingBottom: theme.spacing(1)
    }
  },
  chip_bestseller: {
    color: theme.palette.getContrastText(theme.palette.success.dark),
    backgroundColor: theme.palette.success.dark
  }
}))

export const COURSE_WIDTH = 320
export const THUMBNAIL_WIDTH = 120
