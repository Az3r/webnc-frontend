import data from '../data/courses.json'

export function courses() {
  return data.slice(0, 10)
}
