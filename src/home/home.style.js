import 'typeface-dancing-script'
import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  background: {
    position: 'fixed',
    backgroundImage: 'linear-gradient(45deg, #039be5 , #002171)',
    width: '100vw',
    height: '100vh'
  },
  root: {
    color: 'white',
    paddingTop: theme.spacing(2)
  },
  title: { fontFamily: "'Dancing Script'" },
  message: { marginTop: '8px', fontStyle: 'italic', fontWeight: 300 }
}))
