const { withStyles, Button } = require('@material-ui/core')

const PrimaryButton = withStyles({
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

const ExploreButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #F0AD00, #FA7334)',
    '&:hover': {
      background: 'linear-gradient(45deg, #F0AD00, #FA7334)'
    }
  }
})(PrimaryButton)

const SignUpButton = withStyles({
  root: {
    background: '#005cb2'
  }
})(PrimaryButton)

export { ExploreButton, SignUpButton, PrimaryButton }
