import type { Config } from '@/components/libs/typings/config'
import { config } from '@/components/libs/config/config.default'
import type { Platform } from 'src/components/libs/typings'
import { useModal } from '@/components/libs/hooks/useModal'
import { EsRouter } from '@/components/libs/hooks/useRouter'
import { EsRequest } from '@/components/libs/hooks/useRequest'
import { setConfig } from '@/components/libs/hooks/useConfig'

export const useEs = {
  setup: (conf?: Partial<Config>) => {
    const systemInfo = uni.getSystemInfoSync()

    uni.$es = {
      config: Object.assign(config, conf),
      systemInfo: systemInfo,
      /* #ifdef MP*/
      menuRectInfo: uni.getMenuButtonBoundingClientRect(),
      /* #endif*/
      platform: (systemInfo.uniPlatform === 'app'
        ? plus.os.name?.toLowerCase()
        : systemInfo.uniPlatform) as Platform,
      modal: useModal,
      router: new EsRouter({
        routerGuard: conf?.routerGuard,
        routerEnter: conf?.routerEnter,
        prefix: conf?.prefix
      }),
      http: EsRequest,
      setConfig
    }
  }
}
