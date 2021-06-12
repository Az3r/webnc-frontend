import { Button, fade, makeStyles, withStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  thumbnail: {
    width: '100%',
    height: theme.mixins.toolbar.minHeight * 6
  },
  content: {
    padding: theme.spacing(2)
  },
  star: {
    padding: theme.spacing(0, 0.5)
  },
  title: {
    margin: theme.spacing(0, 0, 2, 0)
  },
  shortdesc: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    WebkitLineClamp: 3,
    lineClamp: 3,
    margin: theme.spacing(0, 0, 1, 0)
  },
  rating: {
    margin: theme.spacing(1, 0, 0.5, 0)
  },
  rating_icon: {
    minWidth: 40
  },
  rating_text: {
    color: '#ffb400',
    margin: theme.spacing(0, 0.5, 0, 0)
  },
  expand: {
    display: 'block'
  },
  expand_button: {
    color: theme.palette.text.secondary
  },
  favorite_button: {
    margin: theme.spacing(0, 0, 2, 0)
  }
}))
