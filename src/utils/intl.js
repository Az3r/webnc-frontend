const formatter = Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD'
})

export function currency(value) {
  return formatter.format(value)
}
