import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '20vh'
  },
  editor: {
    resize: 'none',
    border: 'none',
    outline: 'none',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  },
  input: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingLeft: 75.4 / 3 + theme.spacing(2),
    background: 'transparent',
    color: 'transparent',
    caretColor: theme.palette.text.primary,
    zIndex: 10,
    tabSize: 2,
    MozTabSize: 2
  },
  output: {
    overflow: 'hidden'
  },
  text: theme.typography.body1
}))
