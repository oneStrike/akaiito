import type {
  BasicToolbarProps,
  ToolbarFilter
} from '@/components/basic/BasicToolbar.vue'
import type { BasicTableColumn } from '@/components/basic/BasicTable.vue'
import { utils } from '@/utils'
import type { BasicFormOptions } from '@/components/basic/BasicForm.vue'
import { useValidate } from '@/hooks/useValidate'

export const tableColumns: BasicTableColumn = [
  {
    label: '用户名',
    prop: 'username',
    align: 'center',
    slotName: 'username'
  },
  {
    label: '手机号',
    prop: 'mobile',
    align: 'center'
  },
  {
    label: '角色',
    prop: 'isRoot',
    align: 'center',
    slotName: 'isRoot'
  },
  {
    label: '状态',
    prop: 'status',
    align: 'center',
    slotName: 'status'
  },
  {
    label: '创建时间',
    prop: 'createdAt',
    align: 'center',
    formatter: utils.formatter,
    sortable: 'custom',
    sortOrders: ['ascending', 'descending'],
    sortBy: 'createdAt'
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
    field: 'status',
    component: 'Select',
    componentProps: {
      placeholder: '状态',
      clearable: true,
      maxlength: 11,
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
  },
  {
    field: 'isRoot',
    component: 'Select',
    componentProps: {
      placeholder: '角色',
      clearable: true,
      maxlength: 11,
      options: [
        {
          label: '超级管理员',
          value: 1
        },
        {
          label: '普通管理员',
          value: 0
        }
      ]
    }
  },
  {
    field: 'username',
    component: 'Input',
    componentProps: {
      placeholder: '用户名'
    }
  },
  {
    field: 'mobile',
    component: 'Input',
    componentProps: {
      placeholder: '手机号',
      maxlength: 11
    }
  }
]

export const toolbar: BasicToolbarProps['toolbar'] = [
  {
    type: 'button',
    label: '添加',
    value: 'add',
    props: {
      type: 'primary'
    }
  }
]

export const pwdFormOptions: BasicFormOptions[] = [
  {
    field: 'oldPassword',
    component: 'Input',
    props: {
      required: true,
      label: '原密码',
      rules: [
        { required: true, message: '请输入原密码' },
        {
          validator: useValidate.password
        }
      ]
    },
    componentProps: {
      placeholder: '请输入原密码',
      type: 'password',
      showPassword: true
    }
  },
  {
    field: 'newPassword',
    component: 'Input',
    props: {
      required: true,
      label: '新密码',
      rules: [
        { required: true, message: '请输入新密码' },
        {
          validator: useValidate.password
        }
      ]
    },
    componentProps: {
      placeholder: '请输入新密码',
      type: 'password',
      showPassword: true
    }
  },
  {
    field: 'confirmNewPassword',
    component: 'Input',
    props: {
      required: true,
      label: '确认新密码',
      rules: [
        { required: true, message: '请输入确认新密码' },
        {
          validator: useValidate.password
        }
      ]
    },
    componentProps: {
      placeholder: '请输入确认新密码',
      type: 'password',
      showPassword: true
    }
  }
]
