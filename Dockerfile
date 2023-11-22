FROM node:16-alpine AS base

COPY . /app
WORKDIR /app

FROM nginx AS admin
WORKDIR /app
COPY packages/admin/dist /usr/share/nginx/html
COPY /packages/admin/Nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

FROM nginx AS client
WORKDIR /app
COPY /packages/client/dist/build/h5 /usr/share/nginx/html
COPY /packages/client/Nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

FROM base AS server
WORKDIR /app
COPY /packages/server /.
COPY /packages/utils/dist /node_modules/@akaiito/utils
RUN apk add --no-cache tzdata
ENV TZ="Asia/Shanghai"
EXPOSE 7001
CMD ["npm","run","start"]


