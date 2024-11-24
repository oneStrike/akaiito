// 导入必要的模块
import { join } from 'node:path';
import fs from 'fs-extra';

// 定义辅助函数用于复制客户端代码至 /dist/public/app
export default async function copyAppCode() {
  // 设置客户端代码包的路径
  const appPackagePath = join(import.meta.url, '../../app').replace(/\\/g, '/');
  // 设置目标路径
  const targetPath = join(import.meta.url, '../dist/public/appPackage').replace(/\\/g, '/');

  // 定义需要排除的文件夹
  const excludeFolders = ['node_modules', 'dist', '.hbuilderx'];

  // 复制客户端代码至目标路径，同时过滤掉不需要的文件夹
  await fs.copy(appPackagePath, targetPath, {
    filter: (src) => {
      // 检查是否需要排除
      for (const folder of excludeFolders) {
        if (src.includes(folder)) {
          return false;
        }
      }
      return true;
    },
  });
}
