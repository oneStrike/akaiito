export const filter = [
  {
    field: 'method',
    component: 'Select',
    componentProps: {
      placeholder: '请求方法',
      clearable: true,
      options: [
        {
          label: 'GET',
          value: 'GET'
        },
        {
          label: 'POST',
          value: 'POST'
        }
      ]
    }
  },
  {
    field: 'statusCode',
    component: 'Select',
    componentProps: {
      placeholder: '请求结果',
      clearable: true,
      options: [
        {
          label: '成功',
          value: 'GET'
        },
        {
          label: '失败',
          value: 'POST'
        }
      ]
    }
  }
]
