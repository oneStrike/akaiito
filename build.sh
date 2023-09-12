#!/usr/bin/env bash

#git pull || { echo "git pull error"; exit 1; }

command -v node &> /dev/null && command -v npm &> /dev/null || { echo "尚未配置Node.js环境"; exit 1; }

command -v docker &> /dev/null || { echo "尚未配置docker环境"; exit 1; }

if ! command -v pnpm &> /dev/null; then
  echo "配置pnpm环境"
  npm install pnpm -g
fi

sh ./admin/build.sh

sh ./client/build

exit 0
