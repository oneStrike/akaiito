import GlobalModal from '@/utils/modal'
import type { GlobalModalOptions } from '@/typings/utils/globalModal'
import { useSystem } from '@/hooks/useSystem'

const defaultOptions = {
	title: '提示',
	content: '提示内容',
	showCancel: true,
	backButton: true,
	cancelText: '取消',
	cancelColor: '#000000',
	confirmText: '确定',
	confirmColor: '#3CC51F',
	complete: false
}

const showUniModal = (options: GlobalModalOptions) => {
	let {
		title,
		content,
		showCancel,
		cancelText,
		cancelColor,
		confirmText,
		confirmColor,
		success,
		fail
	} = options

	// #ifdef APP-PLUS
	if (useSystem.appPlatform === 'android') {
		const tempConfirmText = confirmText
		const tempConfirmColor = confirmColor
		confirmText = cancelText
		cancelText = tempConfirmText
		confirmColor = cancelColor
		cancelColor = tempConfirmColor
	}
	// #endif
	uni.showModal({
		title,
		content,
		showCancel,
		cancelText,
		cancelColor,
		confirmText,
		confirmColor,
		success: (data) => {
			success && success(data)
		},
		fail: (err) => {
			fail && fail(err)
		}
	})
}

const show = (options: GlobalModalOptions) => {
	options = Object.assign(defaultOptions, options)

	// #ifndef APP-PLUS
	showUniModal(options)
	// #endif

	// #ifdef APP-PLUS
	if (useSystem.appPlatform === 'ios') {
		showUniModal(options)
	} else {
		(new GlobalModal(options)).show()
	}
	// #endif
}

export const useModal = {
	show
}
