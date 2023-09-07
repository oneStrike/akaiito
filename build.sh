#!/usr/bin/env bash

git pull || { echo "git pull error"; exit 1; }

command -v node &> /dev/null && command -v npm &> /dev/null || { echo "尚未配置Node.js环境"; exit 1; }

command -v docker &> /dev/null || { echo "尚未配置docker环境"; exit 1; }

if ! command -v pnpm &> /dev/null; then
  echo "配置pnpm环境"
  npm install pnpm -g
fi

echo "安装依赖包"
pnpm install

echo "拉取ts类型声明"

pnpm ytt

# 打包客户端
echo "打包客户端"
pnpm -C ./packages/client build:h5

# 打包客户端
echo "打包管理端"
pnpm -C ./packages/admin build

# 打包管理端
echo "打包服务端"
pnpm -C ./packages/server build

exit 0
