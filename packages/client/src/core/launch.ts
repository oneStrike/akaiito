import { useRouter } from '@/hooks/useRouter'
import { useUserStore } from '@/stores/modules/user'

export const launch = async () => {
  const userStore = useUserStore()
  if (!userStore.token) {
    useRouter.reLaunch({ name: 'login' })
  }
}
