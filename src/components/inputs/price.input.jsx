import React from 'react'
import PropTypes from 'prop-types'
import { TextField, InputAdornment } from '@material-ui/core'

const formatter = new Intl.NumberFormat()
export default function PriceTextField({ value, onChange, ...props }) {
  const [price, setPrice] = React.useState(value || 0)
  const formattedPrice = formatter.format(price)
  return (
    <TextField
      value={formattedPrice === 'NaN' ? 0 : formattedPrice}
      onChange={(e) => {
        const number = Number(e.target.value.replace(/[.,-]/, ''))
        onChange?.(e, number)
        setPrice(number)
      }}
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>
      }}
      {...props}
    />
  )
}

PriceTextField.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func
}
