// @ts-ignore
import type { TabBarItem } from '@/components/lk-tab-bar/lk-tab-bar.vue'

export const tabBarStore = defineStore('tabBar', {
  state() {
    return {
      currentTab: 'home',
      tabBar: [
        {
          icon: 'home',
          text: '首页',
          key: 'home',
          path: 'home/home'
        },
        {
          icon: 'friend',
          text: '友人',
          key: 'friend',
          path: 'friend/friend'
        },
        {
          icon: 'publish',
          text: '发布',
          key: 'publish',
          path: 'publish/publish',
          midButton: true
        },
        {
          icon: 'message',
          text: '消息',
          key: 'message',
          path: 'message/message'
        },
        {
          icon: 'profile',
          text: '我的',
          key: 'profile',
          path: 'profile/profile'
        }
      ] as TabBarItem[]
    }
  },
  getters: {},
  actions: {
    toggleTabBar(val: TabBarItem) {
      this.currentTab = val.key
      uni.$lk.router.switchTab({ path: val.path })
    }
  }
})
