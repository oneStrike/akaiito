import { config } from '@/components/libs/config/config.default'
import { setConfig } from '@/components/libs/hooks/useConfig'
import { useModal } from '@/components/libs/hooks/useModal'
import { EsRouter } from '@/components/libs/hooks/useRouter'
import type { Config } from '@/components/libs/typings/config'
import type { Platform } from 'src/components/libs/typings'

export const useEs = {
  setup: (conf?: Partial<Config>) => {
    const systemInfo = uni.getSystemInfoSync()
    uni.$es = {
      config: Object.assign(config, conf),
      systemInfo,
      menuRectInfo: uni?.getMenuButtonBoundingClientRect
        ? uni?.getMenuButtonBoundingClientRect()
        : {},
      platform: (systemInfo.uniPlatform === 'app'
        ? plus.os.name?.toLowerCase()
        : systemInfo.uniPlatform) as Platform,
      modal: useModal,
      router: new EsRouter({
        routerGuard: conf?.routerGuard,
        routerEnter: conf?.routerEnter,
        prefix: conf?.prefix,
      }),
      setConfig,
      env: import.meta.env,
    }
  },
}
