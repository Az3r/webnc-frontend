const currencyFormatter = Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD'
})
const dateFormatter = Intl.DateTimeFormat()

export function currency(value = 0) {
  return currencyFormatter.format(value)
}

export function date(datetime = Date.now()) {
  return dateFormatter.format(datetime)
}
