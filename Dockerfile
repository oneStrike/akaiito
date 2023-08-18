FROM node:18 AS build

WORKDIR /app

ENV TZ="Asia/Shanghai"

COPY . .

RUN npm install pnpm -g

RUN pnpm install --registry=https://registry.npm.taobao.org

RUN pnpm run ytt

# 打包h5平台
RUN pnpm -C ./packages/client build:h5

# 打包管理平台
RUN pnpm -C ./packages/admin build

# 打包服务端
RUN pnpm -C ./packages/server build

# 如果端口更换，这边可以更新一下
EXPOSE 7001
