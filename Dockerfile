FROM node:18 AS build

WORKDIR /app

RUN npm install pnpm -g

RUN pnpm install

RUN pnpm run build

# 如果端口更换，这边可以更新一下
EXPOSE 7001
