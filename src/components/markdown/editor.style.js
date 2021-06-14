import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  editor: {
    width: '100%',
    height: '100%',
    resize: 'none',
    border: 'none',
    outline: 'none',
    position: 'absolute',
    top: 0,
    left: 0
  },
  input: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(7),
    background: 'transparent',
    color: 'transparent',
    caretColor: theme.palette.text.primary,
    zIndex: 10,
    margin: 0,
    overflow: 'auto',
    whiteSpace: 'pre',
    tabSize: 2,
    MozTabSize: 2
  },
  text: {
    ...theme.typography.body1,
    fontWeight: 'bold'
  },
  code: {}
}))
