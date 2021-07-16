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

export function formatDuration(duration) {
  // calculate hour, minute, second
  const hour = Math.floor(duration / 3660)
  const minute = Math.floor((duration % 3660) / 60)
  const second = Math.floor(duration % 60)

  // format output
  const secondStr = ':' + second.toString().padStart(2, '0')
  const minuteStr = minute.toString().padStart(2, '0')
  const hourStr = hour > 0 ? hour.toString().padStart(2, '0') + ':' : ''
  return hourStr + minuteStr + secondStr
}

export function formatDateDifference(date) {
  const now = new Date()
  const diff = now - date

  // constants
  const second = 1000
  const minute = 60 * second
  const hour = 60 * minute
  const day = 24 * hour
  const month = 30 * day
  const year = 12 * month

  // get biggest unit
  let divided = second
  if (diff > year) divided = year
  else if (diff > month) divided = month
  else if (diff > day) divided = day
  else if (diff > hour) divided = hour
  else if (diff > minute) divided = minute

  // format output
  let unit = 'seconds'
  if (diff > year) unit = 'years'
  else if (diff > month) unit = 'months'
  else if (diff > day) unit = 'days'
  else if (diff > hour) unit = 'hours'
  else if (diff > minute) unit = 'minutes'
  const message = `${Math.floor(diff / divided)} ${unit} ago`

  return message
}
