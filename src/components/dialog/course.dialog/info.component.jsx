import React from 'react'
import {
  Box,
  Container,
  InputAdornment,
  makeStyles,
  TextField
} from '@material-ui/core'
import { useCreateCourse } from '.'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ['& > *']: {
      margin: theme.spacing(2, 0)
    }
  }
}))

export default function InfoSection() {
  const styles = useStyles()
  const { info, setInfo } = useCreateCourse()
  const { title, price, discount, shortdesc } = info

  const formatter = new Intl.NumberFormat()
  const formattedPrice = formatter.format(price)
  return (
    <Container className={styles.root} maxWidth="md">
      <TextField
        label="Enter your Course's title"
        placeholder="My awesome course"
        value={title}
        onChange={(e) =>
          setInfo((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <Box display="flex">
        <TextField
          required
          name="price"
          value={formattedPrice === 'NaN' ? 0 : formattedPrice}
          onChange={(e) => {
            const number = Number(e.target.value.replace(/[.,-]/, ''))
            setInfo((prev) => ({ ...prev, price: number }))
          }}
          label="Price"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
        />
        <TextField
          required
          type="number"
          name="discount"
          value={discount}
          onChange={(e) => {
            const value = Math.min(100, Math.max(0, e.target.valueAsNumber))
            setInfo((prev) => ({ ...prev, discount: value }))
          }}
          label="Discount"
          InputProps={{
            startAdornment: <InputAdornment position="start">%</InputAdornment>
          }}
        />
      </Box>
      <TextField
        value={shortdesc}
        onChange={(e) =>
          setInfo((prev) => ({ ...prev, shortdesc: e.target.value }))
        }
        multiline
        rows={5}
        rowsMax={5}
        variant="outlined"
        placeholder="What is your course about?"
      />
    </Container>
  )
}
