import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  topic: {
    padding: theme.spacing(2, 0)
  },
  topic_avatar: {
    width: 48,
    height: 48
  },
  topic_label: {
    ...theme.typography.subtitle1,
    textTransform: 'capitalize'
  },
  category: {
    padding: theme.spacing(2, 0)
  },
  category_avatar: {
    width: 48,
    height: 48
  },
  category_label: {
    ...theme.typography.h5,
    textTransform: 'capitalize',
    ['&:hover']: {
      color: theme.palette.primary.main
    }
  }
}))
