export function generateRandomNumber(digits: number): number {
  if (digits <= 0) {
    throw new Error('Number of digits must be greater than 0')
  }
  const min = 10 ** (digits - 1)
  const max = 10 ** digits - 1
  return Math.floor(min + Math.random() * (max - min + 1))
}
