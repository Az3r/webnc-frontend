import { makeStyles, withStyles, Button } from '@material-ui/core'

export default makeStyles((theme) => ({
  root: {
    backgroundImage: 'linear-gradient(45deg, #039be5 , #002171)',
    width: '100%',
    minHeight: '100vh',
    color: 'white',
    paddingBottom: theme.spacing(2)
  },
  'banner-title': { fontFamily: 'Dancing Script' },
  'banner-message': { fontStyle: 'italic', fontWeight: 300 }
}))

export const PrimaryButton = withStyles({
  root: {
    color: 'white',
    background: 'transparent',
    letterSpacing: 1.25,
    '&:hover': {
      background: 'rgb(255,255,255,0.1)'
    }
  },
  outlined: {
    border: '1px solid rgb(255,255,255,0.5)'
  }
})(Button)

export const ExploreButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #F0AD00, #FA7334)',
    '&:hover': {
      background: 'linear-gradient(45deg, #F0AD00, #FA7334)'
    }
  }
})(PrimaryButton)

export const SignUpButton = withStyles({
  root: {
    background: '#005cb2'
  }
})(PrimaryButton)
