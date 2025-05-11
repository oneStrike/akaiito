import type { EsFormOptions } from '@/components/es-form/types'
import type { EsTableColumn } from '@/components/es-table/types'
import type { EsToolbarProps, ToolbarFilter } from '@/components/es-toolbar/types'

const roles = [
  {
    label: '作家',
    value: 'WRITER',
  },
  {
    label: '漫画家',
    value: 'COMIC_ARTIST',
  },
  {
    label: '插画师',
    value: 'ILLUSTRATOR',
  },
  {
    label: '模特',
    value: 'MODEL',
  },
]

const gender = [
  {
    label: '未知',
    value: 0,
  },
  {
    label: '男',
    value: 1,
  },
  {
    label: '女',
    value: 2,
  },

]

export const tableColumns: EsTableColumn = [
  {
    label: '姓名',
    prop: 'name',
    align: 'center',
    type: 'link',
  },
  {
    label: '头像',
    prop: 'avatar',
    align: 'center',
    type: 'image',
  },
  {
    label: '身份',
    prop: 'roles',
    align: 'center',
    slotName: 'roles',
    width: 200,
  },
  {
    label: '外部主页',
    prop: 'website',
    align: 'center',
    slotName: 'website',
  },
  {
    label: '状态',
    prop: 'status',
    align: 'center',
    slotName: 'status',
  },
  {
    label: '创建时间',
    prop: 'createdAt',
    align: 'center',
    sortable: 'custom',
    sortOrders: ['ascending', 'descending'],
    sortBy: 'createdAt',
  },
  {
    label: '操作',
    prop: 'action',
    align: 'center',
    slotName: 'action',
  },
]

export const formOptions: EsFormOptions[] = [
  {
    field: 'avatar',
    component: 'Upload',
    props: {
      label: '头像',
    },
    componentProps: {
      placeholder: '请上传作者头像',
      scenario: 'shared',
      multiple: false,
      fileType: 'image',
    },
  },
  {
    field: 'name',
    component: 'Input',
    props: {
      span: 2,
      label: '作者',
      rules: useValidate.required('作者名字'),
    },
    componentProps: {
      placeholder: '请输入作者名称',
      maxlength: 50,
    },
  },

  {
    field: 'roles',
    component: 'Checkbox',
    props: {
      span: 2,
      label: '身份',
      rules: useValidate.required('身份'),
    },
    componentProps: {
      placeholder: '请选择身份',
      options: roles,
      valueType: 'array',
    },
  },
  {
    field: 'gender',
    component: 'Radio',
    props: {
      span: 2,
      label: '性别',
      rules: useValidate.required('性别'),
    },
    componentProps: {
      placeholder: '请选择性别',
      options: gender,
    },
  },
  {
    field: 'nationality',
    component: 'Select',
    props: {
      span: 2,
      label: '国籍',
      rules: useValidate.required('国籍'),
    },
    componentProps: {
      placeholder: '请选择国籍',
    },
  },
  {
    field: 'description',
    component: 'Textarea',
    props: {
      label: '作者描述',
      rules: useValidate.required('作者描述'),
    },
    componentProps: {
      placeholder: '请输入作者描述',
      rows: 5,
    },
  },
  {
    field: 'socialLinks',
    component: 'DynamicFieldPair',
    props: {
      label: '社交媒体链接',
      rules: useValidate.url(false),
    },
    componentProps: {
      placeholder: ['请输入社交载体', '请输入链接'],
      maxlength: 50,
    },
  },
  {
    field: 'remark',
    component: 'Textarea',
    props: {
      label: '备注',
    },
    componentProps: {
      placeholder: '请输入备注信息',
      rows: 5,
    },
  },
]

export const filter: ToolbarFilter = [
  {
    field: 'status',
    component: 'Select',
    props: {
      span: 6,
    },
    componentProps: {
      placeholder: '状态',
      clearable: true,
      options: [
        {
          label: '启用',
          value: 1,
        },
        {
          label: '禁用',
          value: 0,
        },
      ],
    },
  },
  {
    field: 'roles',
    component: 'Select',
    props: {
      span: 6,
    },
    componentProps: {
      placeholder: '内容类型',
      clearable: true,
      multiple: true,
      collapseTags: true,
      options: roles,
    },
  },
  {
    field: 'name',
    component: 'Input',
    props: {
      span: 6,
    },
    componentProps: {
      placeholder: '作者名称',
      clearable: true,
    },
  },
]

export const toolbar: EsToolbarProps['toolbar'] = [
  {
    type: 'button',
    label: '添加',
    value: 'add',
    props: {
      type: 'primary',
    },
  },
]
