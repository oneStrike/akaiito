/**
 * 复制客户端的代码至 /dist/public/client
 *
 */

const path = require('node:path')
const fs = require('fs-extra')

module.exports = () => {
  const clientPackagePath = path.join(__dirname, '../../client')
  const targetPath = path.join(__dirname, '../dist/public/clientPackage')
  fs.copy(clientPackagePath, targetPath, {
    filter: (src) => {
      const exclude = ['node_modules', 'dist', '.hbuilderx']
      let isExclude = false
      for (let i = 0; i < exclude.length; i++) {
        const item = exclude[i]
        if (src.includes(item)) isExclude = true
      }
      return !isExclude
    },
  })
}
