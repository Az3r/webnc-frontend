import React from 'react'
import PropTypes from 'prop-types'
import {
  DialogContent,
  DialogActions,
  TextField,
  Button,
  DialogTitle,
  DialogContentText,
  Grid,
  InputAdornment
} from '@material-ui/core'

const formatter = new Intl.NumberFormat()
export default function PriceDialog({
  price: _price,
  discount: _discount,
  onDone,
  onCancel
}) {
  const [price, setPrice] = React.useState(_price)
  const [discount, setDiscount] = React.useState(_discount)
  function submit(e) {
    e.preventDefault()
    if (onDone) onDone({ price, discount })
  }
  return (
    <form onSubmit={submit}>
      <DialogTitle>Edit Price</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Price in $USD,
          <br />
          Discount in percentage
        </DialogContentText>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              required
              autoFocus
              onKeyPress={(e) => {
                if (e.code === 'Enter') e.target.blur()
              }}
              type="text"
              name="course-price"
              value={formatter.format(price)}
              onChange={(e) => {
                const number = Number(e.target.value.replace(/[.,-]/, ''))
                const s = formatter.format(number)
                if (s !== 'NaN') setPrice(number)
              }}
              label="Price"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              onKeyPress={(e) => {
                if (e.code === 'Enter') e.target.blur()
              }}
              type="number"
              name="course-discount"
              value={discount}
              onChange={(e) => {
                e.target.value = Math.min(
                  100,
                  Math.max(0, e.target.valueAsNumber)
                )
                setDiscount(e.target.valueAsNumber)
              }}
              label="Discount"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="primary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Done
        </Button>
      </DialogActions>
    </form>
  )
}

PriceDialog.propTypes = {
  price: PropTypes.number,
  discount: PropTypes.number,
  onDone: PropTypes.func,
  onCancel: PropTypes.func
}
