import { useRouter } from '@/hooks/useRouter'
import { useSystemStore } from '@/stores/modules/system'
import { useUserStore } from '@/stores/modules/user'

export const launch = async () => {
  const userStore = useUserStore()
  const systemStore = useSystemStore()
  await systemStore.getSystemConfig()
  if (!userStore.token) {
    useRouter.reLaunch({ name: 'login' })
  }
}
