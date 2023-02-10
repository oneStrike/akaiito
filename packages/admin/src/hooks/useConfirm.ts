import { Modal, type ModalFuncProps } from 'ant-design-vue'

export const useConfirm = (config: ModalFuncProps) => {
  Modal.confirm(config)
}
