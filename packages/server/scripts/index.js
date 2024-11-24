// 导入辅助打包模块
import auxiliaryPacking from './auxiliaryPacking';
import copyAppPackage from './appPackage';

// 执行客户端代码包的复制
copyAppPackage();

// 执行辅助打包任务
auxiliaryPacking();
