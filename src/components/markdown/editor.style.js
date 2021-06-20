import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  output: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    cursor: 'text'
  },
  textarea: {
    ...theme.typography.body1,
    resize: 'none',
    border: 'none',
    outline: 'none',
    position: 'relative',
    fontWeight: 'bold',
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
    width: '100%',
    height: '100%',
    ozTabSize: 2
  },
  text: {
    ...theme.typography.body1,
    fontWeight: 'bold'
  }
}))
