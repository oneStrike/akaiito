import { EsRouter } from '@/components/libs/hooks/useRouter'
import { authentication } from '@/core/authentication'

const router = new EsRouter({
  routerGuard: authentication.guard,
  routerEnter: authentication.enter,
}) as EsRouter

export const useRouter = router
