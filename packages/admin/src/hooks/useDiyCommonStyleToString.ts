import config from '@/config'
import { defaultAttrCommon } from '@/views/App/Devise/PageDiy/attr/default'
import type { IDiyBaseConfig } from '~@/diyPage'

export const useDiyCommonStyleToString = (commonStyle: IDiyBaseConfig) => {
  if (!commonStyle) return defaultAttrCommon()
  const {
    backgroundColor,
    backgroundImage,
    aroundRadius,
    topRadius,
    bottomRadius
  } = commonStyle
  let commonStyleString = ''
  for (const attrKey in commonStyle) {
    const item = commonStyle[attrKey as keyof IDiyBaseConfig]
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
