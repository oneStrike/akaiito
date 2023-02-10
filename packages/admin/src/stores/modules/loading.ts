import type { SpinProps } from 'ant-design-vue'
const loadingStore = defineStore('loading', {
  state: () => {
    return {
      config: {
        spinning: false
      } as SpinProps
    }
  },
  actions: {
    show(config: SpinProps) {
      this.config = config
      this.config.spinning = true
    },
    hide() {
      this.config.spinning = false
    }
  }
})
export default loadingStore
