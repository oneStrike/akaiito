import { ChangeCase, defineConfig, ExtendedInterface } from 'yapi-to-typescript'

export default defineConfig([
  {
    serverType: 'yapi',
    serverUrl: 'https://yapi.pro',
    typesOnly: true,
    target: 'typescript',
    reactHooks: {
      enabled: false
    },
    prodEnvName: 'production',
    dataKey: 'data',
    projects: [
      {
        token:
          '2d44db9ad41cf8c08cce231db299bd5932a2bfa74f81d2c7fee36cae11b2704c',
        categories: [
          {
            id: [
              112836, 112844, 112852, 112860, 112868, 112876, 112884, 112892,
              112988, 114804, 114820, 117060, 127878
            ]
          }
        ]
      }
    ],
    outputFilePath: (interfaceInfo, changeCase) => {
      const pathArr = interfaceInfo.path.split('/')
      return `src/${pathArr[1]}/apiTypes/${pathArr[2]}.ts`
    },
    getRequestDataTypeName: (interfaceInfo, changeCase) => {
      return `${genApiInterfaceName(interfaceInfo, changeCase)}Req`
    },
    getResponseDataTypeName: (interfaceInfo, changeCase) => {
      return `${genApiInterfaceName(interfaceInfo, changeCase)}Res`
    }
  }
])

function genApiInterfaceName(
  interfaceInfo: ExtendedInterface,
  changeCase: ChangeCase
) {
  // 取解析路径dir最尾部的路径作为前缀路径
  const typePath = interfaceInfo.parsedPath.dir.split('/')[1] || ''
  // 拼接前缀路径+文件名称
  return `${changeCase.pascalCase(typePath)}${changeCase.pascalCase(
    interfaceInfo.parsedPath.name
  )}`
}
