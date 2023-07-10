import type { Config } from '@/components/libs/typings/config'
import { config } from '@/components/libs/config/config.default'
import { Platform } from 'src/components/libs/typings'
import { useModal } from '@/components/libs/hooks/useModal'
import { LkRouter } from '@/components/libs/hooks/useRouter'
import { LkRequest } from '@/components/libs/hooks/useRequest'

export const useLk = {
  setup: (conf?: Config) => {
    const systemInfo = uni.getSystemInfoSync()
    uni.$lk = {
      config: Object.assign(config, conf),
      systemInfo: systemInfo,
      /* #ifdef MP*/
      menuRectInfo: uni.getMenuButtonBoundingClientRect(),
      /* #endif*/
      platform: (systemInfo.uniPlatform === 'app'
        ? plus.os.name?.toLowerCase()
        : systemInfo.uniPlatform) as Platform,
      modal: useModal,
      router: new LkRouter({
        routerGuard: conf?.routerGuard,
        routerEnter: conf?.routerEnter,
        prefix: conf?.prefix
      }),
      http: LkRequest
    }
  }
}
