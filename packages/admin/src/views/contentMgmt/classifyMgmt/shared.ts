import { utils } from '@/utils'
import type { EsFormOptions } from '@/components/es-form/es-form.vue'
import type { EsTableColumn } from '@/components/es-table/es-table.vue'
import type {
  EsToolbarProps,
  ToolbarFilter,
} from '@/components/es-toolbar/es-toolbar.vue'

const pluginType = [
  {
    label: '小说',
    value: 1,
  },
  {
    label: '漫画',
    value: 2,
  },
  {
    label: '图片',
    value: 3,
  },
]

export const tableColumns: EsTableColumn = [
  {
    label: '姓名',
    prop: 'name',
    align: 'center',
  },
  {
    label: '头像',
    prop: 'avatar',
    align: 'center',
    type: 'image',
  },
  {
    label: '内容模型',
    prop: 'contentModel',
    align: 'center',
    slotName: 'contentModel',
  },
  {
    label: '状态',
    prop: 'status',
    align: 'center',
    slotName: 'status',
  },
  {
    label: '外部主页',
    prop: 'website',
    align: 'center',
    type: 'link',
  },
  {
    label: '创建时间',
    prop: 'createdAt',
    align: 'center',
    formatter: utils.formatter,
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
      rules: [{ required: true, message: '请上传作者头像' }],
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
      label: '作者',
      rules: [{ required: true, message: '请输入作者名称' }],
    },
    componentProps: {
      placeholder: '请输入作者名称',
      maxlength: 50,
    },
  },
  {
    field: 'description',
    component: 'Textarea',
    props: {
      label: '作者描述',
      rules: [{ required: true, message: '请输入作者描述' }],
    },
    componentProps: {
      placeholder: '请输入作者描述',
    },
  },
  {
    field: 'website',
    component: 'Input',
    props: {
      label: '作者外部主页',
      rules: [{ required: true, message: '请输入作者外部主页' }],
    },
    componentProps: {
      placeholder: '请输入作者外部主页',
      maxlength: 50,
    },
  },

  {
    field: 'contentModel',
    component: 'Radio',
    props: {
      label: '内容类型',
      rules: [{ required: true, message: '请选择内容类型' }],
    },
    componentProps: {
      placeholder: '请选择内容类型',
      options: pluginType,
    },
  },
]

export const filter: ToolbarFilter = [
  {
    field: 'contentModel',
    component: 'Select',
    componentProps: {
      placeholder: '内容模型',
      clearable: true,
      options: pluginType,
    },
  },
  {
    field: 'status',
    component: 'Select',
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
    field: 'name',
    component: 'Input',
    componentProps: {
      placeholder: '分类名称',
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
