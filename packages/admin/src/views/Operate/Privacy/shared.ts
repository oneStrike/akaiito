import { passwordRule, requiredRule } from '@/hooks/useValidator'
import type { BasicForm } from '@/typings/components/basicForm'
import type { SearchProps } from '@/typings/components/basicSearch'
import type { TableColumn } from '@/typings/components/basicTable'
export const batchBtn = [
  {
    label: '批量禁用',
    value: 1
  },
  {
    label: '批量启用',
    value: 2
  },
  {
    label: '批量删除',
    value: 3
  }
]
export const search: SearchProps['options'] = reactive([
  {
    field: 'status',
    component: 'Select',
    fillAll: true,
    bind: {
      label: '状态'
    },
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ],
      bind: {
        placeholder: '请选择使用状态',
        rules: passwordRule
      }
    }
  },
  {
    field: 'platform',
    component: 'Select',
    fillAll: true,
    bind: {
      label: '平台'
    },
    componentProps: {
      options: [
        { label: 'APP', value: 1 },
        { label: 'WEB', value: 2 },
        { label: '小程序', value: 3 }
      ],
      bind: {
        placeholder: '请选择使用平台',
        rules: passwordRule,
        multiple: true,
        conversion: true
      }
    }
  },
  {
    field: 'name',
    component: 'Input',
    bind: {
      label: '标题'
    },
    componentProps: {
      bind: {
        placeholder: '请输入标题'
      }
    }
  }
])

export const column: TableColumn = [
  {
    prop: 'name',
    label: '标题',
    type: 'link'
  },
  {
    prop: 'platform',
    label: '平台',
    formatter: (row, column, cellValue) => {
      const platform = cellValue.split(',')
      let platformText = ''
      platform.forEach((item: string) => {
        switch (item) {
          case '1':
            platformText += 'APP，'
            break
          case '2':
            platformText += 'WEB，'
            break
          case '3':
            platformText += '小程序，'
            break
        }
      })
      return platformText.slice(0, platformText.length - 1)
    }
  },
  {
    prop: 'createdAt',
    label: '创建时间',
    width: 180
  },
  {
    prop: 'status',
    label: '状态',
    scoped: 'status'
  },
  {
    prop: 'remark',
    label: '备注',
    formatter: (row, column, cellValue) => cellValue || '-'
  },
  {
    prop: 'action',
    label: '操作',
    type: 'action',
    width: 140,
    operateBtn: [
      {
        label: '编辑',
        key: 'edit',
        btn: {
          type: 'primary'
        }
      },
      {
        label: '删除',
        key: 'delete',
        tipsField: 'name',
        btn: {
          type: 'danger'
        }
      }
    ]
  }
]

export const form: BasicForm['options'] = [
  {
    field: 'name',
    component: 'Input',
    bind: {
      label: '标题',
      rules: requiredRule('标题')
    },
    componentProps: {
      bind: {
        placeholder: '请输入标题'
      }
    }
  },

  {
    field: 'platform',
    component: 'Check',
    bind: {
      label: '应用平台',
      rules: requiredRule('应用平台')
    },
    componentProps: {
      bind: {},
      options: [
        {
          label: 'APP',
          value: 1
        },
        {
          label: 'WEB',
          value: 2
        },
        {
          label: '小程序',
          value: 3
        }
      ]
    }
  },
  {
    field: 'content',
    component: 'Editor',
    bind: {
      label: '内容',
      rules: requiredRule('内容')
    },
    componentProps: {
      bind: {
        placeholder: '请输入内容'
      }
    }
  },
  {
    field: 'remark',
    component: 'Input',
    bind: {
      label: '备注',
      required: false
    },
    componentProps: {
      bind: {
        placeholder: '请输入备注',
        type: 'textarea'
      }
    }
  }
]
