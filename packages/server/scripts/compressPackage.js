/**
 * 压缩打包后代码
 */

const fs = require('fs')
const path = require('path')
const archiver = require('archiver')

module.exports = () => {
  const sourcePath = path.join(__dirname, '../dist.zip')
  const targetPath = path.join(__dirname, '../dist')
  const output = fs.createWriteStream(sourcePath)
  const archive = archiver('zip', {
    zlib: { level: 9 }
  })

  archive.pipe(output)
  archive.directory(targetPath, false)
  archive.finalize()
}
