import type {
  BasicToolbarProps,
  ToolbarFilter
} from '@/components/basic/BasicToolbar.vue'
import type { BasicTableColumn } from '@/components/basic/BasicTable.vue'
import type { BasicFormOptions } from '@/components/basic/BasicForm.vue'

export const toolbar: BasicToolbarProps['toolbar'] = [
  {
    type: 'button',
    label: '添加',
    value: 'add',
    props: {
      type: 'primary'
    }
  },
  {
    type: 'dropdown',
    label: '批量操作',
    options: [
      {
        label: '批量删除',
        value: 'delete'
      },
      {
        label: '批量启用',
        value: 'enable'
      },
      {
        label: '批量禁用',
        value: 'disabled'
      }
    ]
  }
]

export const tableColumns: BasicTableColumn = [
  {
    label: '名称',
    prop: 'name',
    align: 'center'
  },
  {
    label: '编码',
    prop: 'code',
    align: 'center'
  },
  {
    label: '状态',
    prop: 'status',
    align: 'center',
    slotName: 'status'
  },
  {
    label: '操作',
    prop: 'action',
    align: 'center',
    slotName: 'action'
  }
]

export const filter: ToolbarFilter = [
  {
    field: 'name',
    component: 'Input',
    componentProps: {
      placeholder: '名称'
    }
  },
  {
    field: 'code',
    component: 'Input',
    componentProps: {
      placeholder: '编码'
    }
  },
  {
    field: 'status',
    component: 'Select',
    componentProps: {
      placeholder: '状态',
      options: [
        {
          label: '启用',
          value: 1
        },
        {
          label: '禁用',
          value: 0
        }
      ]
    }
  }
]

export const formOptions: BasicFormOptions[] = [
  {
    field: 'name',
    component: 'Input',
    props: {
      label: '名称',
      rules: [{ required: true, message: '请输入名称' }]
    },
    componentProps: {
      placeholder: '请输入名称'
    }
  },
  {
    field: 'code',
    component: 'Input',
    props: {
      label: '编码',
      rules: [{ required: true, message: '请输入编码' }]
    },
    componentProps: {
      placeholder: '请输入编码'
    }
  },
  {
    field: 'desc',
    component: 'Textarea',
    props: {
      label: '描述信息',
      rules: [{ required: true, message: '请输入描述信息' }]
    },
    componentProps: {
      placeholder: '请输入描述信息'
    }
  }
]
