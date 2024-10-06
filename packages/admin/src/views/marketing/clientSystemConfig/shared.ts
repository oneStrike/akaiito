import type { EsFormOptions } from '@/components/es-form/es-form.vue'

export const formOptions: EsFormOptions[] = [
  {
    field: 'clientName',
    component: 'Input',
    props: {
      label: '客户端名称',
      rules: [{ required: true, message: '请输入客户端名称' }],
    },
    componentProps: {
      placeholder: '请输入客户端名称',
    },
  },
  {
    field: 'logo',
    component: 'Upload',
    props: {
      label: 'logo',
      rules: [{ required: true, message: '请上传程序logo' }],
    },
    componentProps: {
      placeholder: '请上传程序logo',
      scenario: 'shared',
      multiple: false,
      fileType: 'image',
    },
  },
  {
    field: 'contentModel',
    component: 'Checkbox',
    props: {
      label: '启用的内容模型',
      rules: [{ required: true, message: '请选择启用的内容模型' }],
    },
    componentProps: {
      placeholder: '请选择启用的内容模型',
      options: [
        { label: '图片', value: 1 },
        { label: '漫画', value: 2 },
        { label: '小说', value: 3 },
        { label: '视频', value: 4, disabled: true },
      ],
    },
  },
]
