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
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    WebkitLineClamp: 1,
    lineClamp: 1
  },
  transition: {
    transition: theme.transitions.create(['filter', 'opacity'])
  },
  watch: {
    opacity: 0,
    cursor: 'pointer'
  },
  thumbnailHover: {
    filter: 'brightness(30%)'
  },
  watchHover: {
    opacity: 1
  }
}))
