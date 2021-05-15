/**
 * generate an array for star rating component
 * @param {number} rating course's rating
 * @returns array where each item is -1, 0, 1
 */
export function stars(rating) {
  const stars = []
  const ceil = Math.ceil(rating)
  const floor = Math.floor(rating)
  for (let i = 0; i < floor; i++) {
    stars.push(1)
  }
  for (let i = floor; i < 5; i++) {
    stars.push(-1)
  }
  const offset = ceil - rating
  if (offset > 0 && offset <= 0.5) stars[ceil - 1] = 0
  return stars
}
