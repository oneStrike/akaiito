/**
 * 辅助docker部署，将所需的文件都移动至dist目录下，
 * 同时调整packages.json文件，删除但仓库依赖包
 */

const fs = require('fs-extra')
const path = require('path')

module.exports = () => {
  const target = path.join(__dirname, '../dist/') //目标文件夹
  const source = path.join(__dirname, '../')

  fs.copySync(source + 'src', target + 'src')
  fs.copySync(source + 'package.json', target + 'package.json')
  fs.copySync(source + 'bootstrap.js', target + 'bootstrap.js')
  const packageJson = require(path.join(__dirname, '../dist/package.json'))

  for (const dependencyKey in packageJson.dependencies) {
    if (dependencyKey.includes('@akaiito')) {
      delete packageJson.dependencies[dependencyKey]
    }
  }
  for (const dependencyKey in packageJson.devDependencies) {
    if (dependencyKey.includes('@akaiito')) {
      delete packageJson.devDependencies[dependencyKey]
    }
  }

  fs.writeJsonSync(path.join(__dirname, '../dist/package.json'), packageJson)
}
