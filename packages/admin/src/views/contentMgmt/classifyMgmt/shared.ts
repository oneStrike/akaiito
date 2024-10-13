import type { EsFormOptions } from '@/components/es-form/es-form.vue'
import type { EsTableColumn } from '@/components/es-table/es-table.vue'
import type { EsToolbarProps, ToolbarFilter } from '@/components/es-toolbar/es-toolbar.vue'

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
    label: '分类',
    prop: 'name',
    align: 'center',
    type: 'link',
  },
  {
    label: '图标',
    prop: 'icon',
    align: 'center',
    type: 'image',
  },
  {
    label: '热度',
    prop: 'hot',
    align: 'center',
    sortable: 'custom',
    sortOrders: ['ascending', 'descending'],
    sortBy: 'hot',
  },
  {
    label: '小说数量',
    prop: 'novelCount',
    align: 'center',
    sortable: 'custom',
    sortOrders: ['ascending', 'descending'],
    sortBy: 'novelCount',
  },
  {
    label: '漫画数量',
    prop: 'mangaCount',
    align: 'center',
    sortable: 'custom',
    sortOrders: ['ascending', 'descending'],
    sortBy: 'mangaCount',
  },
  {
    label: '图片数量',
    prop: 'imageCount',
    align: 'center',
    sortable: 'custom',
    sortOrders: ['ascending', 'descending'],
    sortBy: 'imageCount',
  },
  {
    label: '状态',
    prop: 'status',
    align: 'center',
    slotName: 'status',
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
    field: 'name',
    component: 'Input',
    props: {
      label: '分类名称',
      class: 'w-1/2',
      rules: [{ required: true, message: '请输入分类名称' }],
    },

    componentProps: {
      placeholder: '请输入分类名称',
      maxlength: 50,
    },
  },
  {
    field: 'icon',
    component: 'Upload',
    props: {
      label: '分类图标',
      class: 'w-1/2',
      rules: [{ required: true, message: '请上传分类图标' }],
    },
    componentProps: {
      placeholder: '请上传分类图标',
      scenario: 'shared',
      multiple: false,
      fileType: 'image',
    },
  },
  {
    field: 'auxiliaryHot',
    component: 'InputNumber',
    props: {
      label: '辅助热度',
      class: 'w-1/2',
    },
    componentProps: {
      placeholder: '请输入辅助热度',
      min: 1,
      max: 999999,
      type: 'number',
    },
  },
  {
    field: 'contentModel',
    component: 'Checkbox',
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
      multiple: true,
      collapseTags: true,
      collapseTagsTooltip: true,
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
