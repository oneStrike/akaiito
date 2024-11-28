import { useRouter } from '@/hooks/useRouter'
import { useSystemStore } from '@/stores/modules/system'
import { useUserStore } from '@/stores/modules/user'

export const launch = async () => {
  const userStore = useUserStore()
  useSystemStore().initSystem()
  if (!userStore.token) {
    useRouter.reLaunch({ name: 'login' })
  }
}
