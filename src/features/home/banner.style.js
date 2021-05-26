import { Button } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/styles'

export default makeStyles((theme) => ({
  root: {
    backgroundImage: 'linear-gradient(45deg, #039be5 , #002171)',
    width: '100%',
    minHeight: '100vh',
    color: 'white',
    paddingBottom: theme.spacing(2)
  },
  button: {
    width: 160,
    color: 'white',
    borderColor: 'white'
  },
  'banner-title': { fontFamily: 'Dancing Script' },
  'banner-message': { fontStyle: 'italic', fontWeight: 300 }
}))

export const ExploreButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #F0AD00, #FA7334)',
    '&:hover': {
      background: 'linear-gradient(45deg, #F0AD00, #FA7334)'
    }
  }
})(Button)
