import { styled } from '@material-ui/core'
import { ToggleButton } from '@material-ui/lab'

export const FilterButton = styled(ToggleButton)(({ theme }) => ({
  '&.MuiToggleButton-root': {
    border: 'none',
    padding: theme.spacing(1)
  },
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.default
  }
}))
