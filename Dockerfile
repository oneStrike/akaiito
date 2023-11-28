FROM nginx AS base

FROM base AS admin
WORKDIR /app
COPY packages/admin/dist /usr/share/nginx/html
COPY /packages/admin/Nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /packages
EXPOSE 80

FROM base AS client
WORKDIR /app
COPY /packages/client/dist/build/h5 /usr/share/nginx/html
COPY /packages/client/Nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /packages
EXPOSE 80

FROM registry.cn-hangzhou.aliyuncs.com/asherith/node AS server
WORKDIR /app
COPY /packages/server/dist ./
RUN apk add --no-cache tzdata && \
    npm config set registry https://registry.npmmirror.com && \
    npm install --omit=dev
COPY /packages/utils/dist ./node_modules/@akaiito/utils/dist
RUN rm -rf /packages
ENV TZ="Asia/Shanghai"
EXPOSE 7001
CMD ["npm","run","start"]


