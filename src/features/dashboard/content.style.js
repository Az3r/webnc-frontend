import { makeStyles, styled, withStyles } from '@material-ui/core'
import { ToggleButton } from '@material-ui/lab'

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 0, 0, 2),
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
  },
  filter_root: {
    border: 'none'
  }
}))

export const FilterButton = styled(ToggleButton)(({ theme }) => ({
  '&.MuiToggleButton-root': {
    border: 'none',
    padding: theme.spacing(1)
  },
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.default
  }
}))
