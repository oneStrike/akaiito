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
          path: '/home/home',
          dot: true,
          badge: 3
        },
        {
          icon: 'friend',
          text: '友人',
          key: 'friend',
          path: '/friend/friend',
          badge: 12
        },
        {
          icon: 'publish',
          text: '发布',
          key: 'publish',
          path: '/publish/publish',
          midButton: true
        },
        {
          icon: 'message',
          text: '消息',
          key: 'message',
          path: '/message/message',
          dot: true
        },
        {
          icon: 'profile',
          text: '我的',
          key: 'profile',
          path: '/profile/profile',
          dot: true
        }
      ] as TabBarItem[]
    }
  },
  getters: {},
  actions: {}
})
