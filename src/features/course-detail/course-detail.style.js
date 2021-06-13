import { Button, fade, makeStyles, withStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  thumbnail: {
    width: '100%',
    height: theme.mixins.toolbar.minHeight * 6
  },
  header: {
    ...theme.typography.h5,
    fontWeight: theme.typography.h6.fontWeight
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
  rating_icon: {
    minWidth: 40
  },
  rating_text: {
    color: '#ffb400'
  },
  expand: {
    display: 'block'
  },
  expand_button: {
    color: theme.palette.text.secondary
  },
  favorite_button: {
    margin: theme.spacing(0, 0, 2, 0)
  },
  price_origin: {
    textDecoration: 'line-through'
  },
  price_discount: {
    color: theme.palette.error.main
  },
  preview_list: {
    margin: theme.spacing(1, 0),
    padding: 0
  },
  preview_title: {
    fontStyle: 'italic',
    color: theme.palette.warning.main
  },
  instructor_avatar: {
    width: 64,
    height: 64
  },
  instructor_work: {
    color: theme.palette.text.secondary,
    fontStyle: 'italic'
  },
  instructor_name: {
    cursor: 'pointer'
  },
  review_avatar: {
    width: 40,
    height: 40
  },
  review_name: {
    paddingLeft: theme.spacing(0.5),
    fontWeight: theme.typography.h6.fontWeight
  },
  review_time: {
    color: theme.palette.text.secondary,
    fontStyle: 'italic'
  }
}))
