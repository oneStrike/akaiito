import path from 'node:path'

export const getProjectConfig = () => {
  return require(path.join(process.cwd(), '/../../config/config.project.json'))
}
