import type { RouteRecordName } from 'vue-router'

export interface Tabs {
  pathName: RouteRecordName
  title: string
}

export interface ITabStore {
  fixTab: Tabs
  active: Tabs | null
  tabs: Tabs[] | []
}
