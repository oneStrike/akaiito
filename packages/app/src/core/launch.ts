import { useSystemStore } from '@/stores/modules/system'

export const launch = async () => {
  const systemStore = useSystemStore()
  systemStore.getAppConfig()
}
