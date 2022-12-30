import type { RouteRecordName } from 'vue-router'

export interface ITabs {
  pathName: RouteRecordName
  title: string
}

export interface ITabStore {
  fixTab: ITabs
  active: ITabs | null
  tabs: ITabs[] | []
}
