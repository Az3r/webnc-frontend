import { stars } from '@/utils/course'

test('should count correct stars', () => {
  const inputs = [1, 2, 3, 4, 5, 2.3, 3.5, 4.7]
  const outputs = [
    [1, -1, -1, -1, -1],
    [1, 1, -1, -1, -1],
    [1, 1, 1, -1, -1],
    [1, 1, 1, 1, -1],
    [1, 1, 1, 1, 1],
    [1, 1, -1, -1, -1],
    [1, 1, 1, 0, -1],
    [1, 1, 1, 1, 0]
  ]
  inputs.forEach((value, index) => {
    expect(stars(value)).toStrictEqual(outputs[index])
  })
})
