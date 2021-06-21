const formatter = Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD'
})

export function currency(value = 0) {
  return formatter.format(value)
}
