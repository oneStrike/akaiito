import { useRouter } from '@/hooks/useRouter'
import { useUserStore } from '@/stores/modules/user'
import { useSystemStore } from '@/stores/modules/system'

export const launch = async () => {
  const userStore = useUserStore()
  const systemStore = useSystemStore()
  await systemStore.getSystemConfig()
  if (!userStore.token) {
    useRouter.reLaunch({ name: 'login' })
  }
}
