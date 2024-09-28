// 导入辅助打包模块
import auxiliaryPacking from './auxiliaryPacking';
import copyClientPackage from './clientPackage';

// 执行客户端代码包的复制
copyClientPackage();

// 执行辅助打包任务
auxiliaryPacking();
