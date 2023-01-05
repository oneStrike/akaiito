import { IBasicDiy } from '@akaiito/typings/src/admin/diyPage'
import config from '@/config'

export const formatCommonStyle = (commonStyle: IBasicDiy): string => {
  const {
    backgroundColor,
    backgroundImage,
    aroundRadius,
    topRadius,
    bottomRadius
  } = commonStyle
  let commonStyleString = ''
  for (const attrKey in commonStyle) {
    const item = commonStyle[attrKey as keyof IBasicDiy]
    switch (attrKey) {
      case 'backgroundType':
        if (item === 'color') {
          commonStyleString += `background: ${backgroundColor};`
        } else if (item === 'image') {
          const backgroundUrl = Array.isArray(backgroundImage)
            ? backgroundImage[0].path
            : backgroundImage
          commonStyleString += `background: url('${
            config.FILE_PATH + backgroundUrl
          }') no-repeat center center / cover; `
        }

        break
      case 'bothSideMargin':
        commonStyleString += `margin: 0 ${item ? Number(item) * 2 : 0}rpx ; `
        break
      case 'borderRadius':
        switch (item) {
          case 'around':
            commonStyleString += `border-radius: ${aroundRadius * 2}rpx; `
            break
          case 'top':
            commonStyleString += `border-radius: ${topRadius * 2}rpx ${
              topRadius * 2
            }rpx 0 0; `
            break
          case 'bottom':
            commonStyleString += `border-radius: 0 0 ${bottomRadius * 2}rpx ${
              bottomRadius * 2
            }rpx;`
        }
    }
  }
  return commonStyleString
}
