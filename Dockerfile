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

FROM registry.cn-hangzhou.aliyuncs.com/asherith/node AS server
WORKDIR /app
COPY /packages/server/dist ./
RUN apk add --no-cache tzdata && npm install --omit=dev
COPY /packages/utils/dist ./node_modules/@akaiito/utils/dist
RUN rm -rf /packages && npm cache clean --force
EXPOSE 7001
CMD ["npm","run","start"]


