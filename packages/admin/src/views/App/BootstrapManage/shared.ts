import type { BasicForm } from '@/typings/components/basicForm'

export const formOptions: BasicForm['options'] = [
  {
    field: 'guideGather',
    component: 'Radio',
    bind: {
      label: '喜好收集',
      required: true
    },
    componentProps: {
      options: [
        {
          label: '开启',
          value: 1
        },
        {
          label: '关闭',
          value: 0
        }
      ]
    }
  },
  {
    field: 'guideMust',
    component: 'Radio',
    bind: {
      label: '强制选择',
      required: true
    },
    componentProps: {
      tips: '开启后用户必须选择喜好后放能进入首页',
      options: [
        {
          label: '开启',
          value: 1
        },
        {
          label: '关闭',
          value: 0
        }
      ]
    }
  }
]
