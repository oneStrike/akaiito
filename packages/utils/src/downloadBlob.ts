/**
 * 下载文件
 * @param blob 文件对象
 * @param fileName 文件名
 */
export const downloadBlob = function (blob: Blob, fileName: string) {
	// 创建一个a标签
	const link = document.createElement('a')

	// 将blob文件对象通过URL.createObjectURL()方法转为为url
	const url = URL.createObjectURL(blob)

	// 为a标签设置href属性，并赋值为url
	link.href = url

	// 定义下载的文件名，文件名要包含后缀哟！如'导出EXCEL.xlsx'
	link.download = fileName

	// 把a标签放在body上
	document.body.appendChild(link)

	// 出发a标签点击下载
	link.click()

	// 在body中移除这个a标签
	document.body.removeChild(link)

	// 释放blob对象
	URL.revokeObjectURL(url)
}
