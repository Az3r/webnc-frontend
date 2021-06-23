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
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
}))

export const COURSE_WIDTH = 320
export const THUMBNAIL_WIDTH = 120
