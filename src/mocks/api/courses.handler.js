import courses from '../data/courses.json'

export function all() {
  return courses
}

export function mostviews() {
  return courses.slice(0, 10)
}
export function newest() {
  return courses.slice(10, 10)
}

export function own() {
  return courses.slice(20, 20)
}

export function watching() {
  return courses.slice(30, 4)
}
