import type { IBasicDiy } from '@/typings/components/diyPage'
import config from '@/config'

export const useDiyCommonStyleToString = (commonStyle: IBasicDiy) => {
  if (!commonStyle) return
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
        commonStyleString += `margin: 0 ${item ? item : 0}px ; `
        break
      case 'borderRadius':
        switch (item) {
          case 'around':
            commonStyleString += `border-radius: ${aroundRadius}px; `
            break
          case 'top':
            commonStyleString += `border-radius: ${topRadius}px ${topRadius}px 0 0; `
            break
          case 'bottom':
            commonStyleString += `border-radius: 0 0 ${bottomRadius}px ${bottomRadius}px; `
        }
    }
  }
  return commonStyleString
}
