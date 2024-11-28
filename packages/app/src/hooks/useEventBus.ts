export const useAppLaunchEventBus = {
  emit(data?: any) {
    uni.$emit('APP_LAUNCH', data)
  },
  on(callback: (data: any) => void) {
    uni.$on('APP_LAUNCH', callback)
  },
}
