import 'typeface-dancing-script'
import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  banner: {
    backgroundImage: 'linear-gradient(45deg, #039be5 , #002171)',
    width: '100%',
    height: '100vh',
    color: 'white',
    paddingTop: theme.spacing(4)
  },
  'banner-title': { fontFamily: 'Dancing Script' },
  'banner-message': { fontStyle: 'italic', fontWeight: 300 }
}))
