import { handlerIdCard } from '@/hooks/form/rules'

export const parseIdCard = (idCard = '') => {
  if (!handlerIdCard(idCard)) {
    return {}
  }
  // 解析生日
  const birthday = idCard.substring(6, 14)
  const year = birthday.substring(0, 4)
  const month = birthday.substring(4, 6)
  const day = birthday.substring(6, 8)

  // 解析性别
  const genderCode = Number.parseInt(idCard.charAt(16), 10)
  const gender = genderCode % 2 === 0 ? 0 : 1

  return {
    birthday: `${year}-${month}-${day}`,
    gender,
  }
}
