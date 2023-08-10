import type { BasicFormOptions } from '@/typings/components/basic/basicForm'

export const platforms = [
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
export const options: BasicFormOptions[] = [
  {
    component: 'Input',
    bind: {
      path: 'name',
      label: '协议名称',
      rule: useValidate.required({ message: '协议名称' })
    },
    componentProps: {
      bind: {
        placeholder: '请输入协议名称'
      }
    }
  },
  {
    component: 'Checkbox',
    bind: {
      path: 'platform',
      label: '平台',
      rule: useValidate.required({ message: '平台' })
    },
    componentProps: {
      bind: {
        placeholder: '请选择平台',
        transform: true
      },
      options: platforms
    }
  },
  {
    component: 'Editor',
    bind: {
      path: 'content',
      label: '内容',
      rule: useValidate.required({ message: '内容' })
    },
    componentProps: {
      bind: {
        placeholder: '请输入内容'
      }
    }
  },
  {
    component: 'Input',
    bind: {
      path: 'remark',
      label: '备注'
    },
    componentProps: {
      bind: {
        placeholder: '请输入备注',
        type: 'textarea'
      }
    }
  }
]

export const filterOptions: BasicFormOptions[] = [
  {
    component: 'Select',
    bind: {
      label: '状态',
      path: 'status',
      width: 140
    },
    componentProps: {
      bind: {
        placeholder: '状态'
      },
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  },
  {
    component: 'Select',
    bind: {
      label: '平台',
      path: 'platform',
      width: 200
    },
    componentProps: {
      bind: {
        placeholder: '状态',
        multiple: true,
        maxTagCount: 'responsive',
        transform: true
      },
      options: platforms
    }
  },
  {
    component: 'Input',
    bind: {
      label: '名称',
      path: 'name',
      width: 200
    },
    componentProps: {
      bind: {
        placeholder: '名称'
      }
    }
  }
]

export const batchOptions = () => [
  {
    label: '批量禁用',
    key: 'disabled'
  },
  {
    label: '批量启用',
    key: 'enable'
  },
  {
    label: '批量删除',
    key: 'delete'
  }
]
