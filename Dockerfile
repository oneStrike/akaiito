FROM nginx AS base

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

FROM registry.cn-hangzhou.aliyuncs.com/asherith/node AS server
WORKDIR /app
COPY /packages/server/dist ./
RUN apk add --no-cache tzdata && \
    corepack enable && \
    pnpm config set registry https://registry.npmmirror.com && \
    pnpm install -P --shamefully-hoist
COPY /packages/utils/dist ./node_modules/@akaiito/utils/dist
ENV TZ="Asia/Shanghai"
EXPOSE 7001
CMD ["npm","run","start"]


