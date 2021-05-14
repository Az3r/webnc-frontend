import 'typeface-dancing-script'
import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  root: {
    backgroundImage: 'linear-gradient(to bottom right, #039be5, #002171)',
    width: '100vw',
    height: '100vh',
    color: 'white'
  },
  title: { fontFamily: "'Dancing Script'" },
  message: { marginTop: '8px', fontStyle: 'italic', fontWeight: 300 }
}))
