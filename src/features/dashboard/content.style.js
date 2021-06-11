import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  toolbar: theme.mixins.toolbar,
  shift: {
    marginLeft: 0,
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: 283.4
    }
  }
}))
