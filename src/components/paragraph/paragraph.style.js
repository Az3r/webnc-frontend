import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  text: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    WebkitLineClamp: (props) => props.line,
    lineClamp: (props) => props.line,
    margin: theme.spacing(0, 0, 1, 0)
  },
  expand: {
    display: 'block'
  },
  button: {
    color: theme.palette.text.secondary
  }
}))
