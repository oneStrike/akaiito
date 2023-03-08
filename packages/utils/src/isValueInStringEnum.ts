export const isValueInStringEnum = <T extends Record<keyof T, string>>(
  value: string,
  enumObject: T extends Record<keyof T, string> ? T : never
): value is T[keyof T] => {
  return Object.values(enumObject).includes(value)
}
