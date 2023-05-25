export const downloadBlob = function (blob: Blob, fileName: string) {
  const link = document.createElement('a') //创建一个a标签
  const url = URL.createObjectURL(blob) //将blob文件对象通过URL.createObjectURL()方法转为为url
  link.href = url //为a标签设置href属性，并赋值为url
  link.download = fileName //定义下载的文件名，文件名要包含后缀哟！如'导出EXCEL.xlsx'
  document.body.appendChild(link) //把a标签放在body上
  link.click() //出发a标签点击下载
  document.body.removeChild(link) //在body中移除这个a标签
  URL.revokeObjectURL(url) //释放blob对象
}
