import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  header: {
    ...theme.typography.h5,
    fontWeight: theme.typography.h6.fontWeight
  },
  preview: {
    color: theme.palette.warning.main
  },
  placeholder: {
    ['&::placeholder']: {
      fontStyle: 'italic'
    }
  },
  form_duration: {
    alignItems: 'center'
  },
  input_duration: {
    width: 48
  }
}))
