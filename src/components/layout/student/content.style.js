import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  toolbar: theme.mixins.toolbar,
  shift: {
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: 283.4
    }
  }
}))
