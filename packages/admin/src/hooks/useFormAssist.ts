type UseFormAssist<T> = {
  edit: boolean // 是否编辑模式
  editData: null | T // 编辑的数据
  showModal: boolean // 是否显示模态框
  loading: boolean // 是否加载中
  formValue: Record<string | symbol, any> | T // 表单值
  clearStatus: () => void // 清除状态
}

/**
 * useFormAssist 自定义 hooks，用于表单辅助操作
 * @returns formAssist 表单辅助对象
 */
export const useFormAssist = <T>(): UseFormAssist<T> => {
  const clearStatus = () => {
    formAssist.edit = false
    formAssist.editData = null
    formAssist.showModal = false
    formAssist.loading = false
    formAssist.formValue = {}
  }

  const formAssist: UseFormAssist<T> = reactive({
    edit: false,
    editData: null,
    showModal: false,
    loading: false,
    formValue: {},
    clearStatus
  })

  return formAssist
}
