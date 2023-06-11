type UseFormAssist<T> = {
  edit: boolean
  editData: null | T
  showModal: boolean
  loading: boolean
  formValue: Record<string | symbol, any> | T
  clearStatus: () => void
}

export const useFormAssist = <T>() => {
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
