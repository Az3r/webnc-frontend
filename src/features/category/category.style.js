import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  label: {
    textTransform: 'capitalize'
  },
  avatar: {
    borderRadius: '50%',
    width: 48,
    height: 48
  },
  expand_button: {
    boxShadow: 'none'
  },
  rotate: {
    transition: theme.transitions.create(['transform'], {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut
    })
  },
  collapse: {
    transform: 'rotate(540deg)'
  }
}))
