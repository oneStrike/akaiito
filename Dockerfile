FROM node:16-alpine AS base

COPY . /app
WORKDIR /app

FROM nginx AS admin
WORKDIR /app/admin
COPY packages/admin/dist /usr/share/nginx/html
COPY /packages/admin/Nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

FROM nginx AS client
WORKDIR /app/client
COPY /packages/client/dist/build/h5 /usr/share/nginx/html
COPY /packages/client/Nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

FROM base AS server
WORKDIR /app/server
COPY --from=build /app/packages/server/ .
EXPOSE 7001
CMD ["npm","run","start"]


