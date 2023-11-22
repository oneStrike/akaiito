FROM nginx AS base

COPY . /app
WORKDIR /app

FROM base AS admin
WORKDIR /app
COPY packages/admin/dist /usr/share/nginx/html
COPY /packages/admin/Nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

FROM base AS client
WORKDIR /app
COPY /packages/client/dist/build/h5 /usr/share/nginx/html
COPY /packages/client/Nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

FROM node:16-alpine AS server
WORKDIR /app
COPY /packages/server/dist ./dist
COPY /packages/server/src ./src
COPY /packages/server/bootstrap.js ./
COPY /packages/server/package.json ./
RUN apk add --no-cache tzdata
COPY /packages/utils ./node_modules/@akaiito/utils
RUN corepack enable && pnpm config set registry 'https://registry.npmmirror.com' && pnpm install --filter @akaiito/utils --filter @akaiito/typings --reporter=compact
ENV TZ="Asia/Shanghai"
EXPOSE 7001
CMD ["npm","run","start"]


