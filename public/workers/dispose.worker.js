onmessage = function ({ data }) {
  console.log('dispose unused url')
  URL.revokeObjectURL(data)
}
