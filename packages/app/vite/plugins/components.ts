import Components, { kebabCase } from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'

export function AutoRegistryComponent() {
  return Components({
    resolvers: [
      WotResolver(),
      {
        type: 'component',
        resolve: (name: string) => {
          if (name.match(/^es[A-Z]/)) {
            const compName = kebabCase(name)
            return {
              name,
              from: `/components/${compName}/${compName}.vue`,
            }
          }
        },
      },
    ],
  })
}
