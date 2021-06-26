import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme) => ({
  text: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    WebkitLineClamp: 1,
    lineClamp: 1
  },
  avatar: {
    borderRadius: '50%'
  }
}))
