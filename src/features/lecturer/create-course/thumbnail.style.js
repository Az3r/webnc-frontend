import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  root: {
    border: `1px dashed ${theme.palette.text.hint}`,
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    paddingTop: '56.25%',
    position: 'relative',
    color: 'white'
  },
  fill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%'
  },
  transition: {
    webkitTransitionTimingFunction: theme.transitions.easing.easeInOut,
    webkitTransitionDuration: theme.transitions.duration.standard,
    webkitTransitionProperty: 'all',
    msTransitionTimingFunction: theme.transitions.easing.easeInOut,
    msTransitionDuration: theme.transitions.duration.standard,
    msTransitionProperty: 'all',
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    transitionDuration: theme.transitions.duration.standard,
    transitionProperty: 'all'
  },
  upload: {
    display: 'flex',
    padding: theme.spacing(0, 2),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  upload_hidden: {
    display: 'none'
  },
  cover: {
    zIndex: 5,
    backgroundColor: 'rgb(0,0,0,0)'
  },
  cover_hover: {
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  thumbnail_hover: {
    filter: 'blur(4px)'
  },
  textfield: {
    color: 'white',
    ['&.MuiInput-underline:before']: {
      borderBottom: `1px solid ${theme.palette.background.default}`
    }
  }
}))
