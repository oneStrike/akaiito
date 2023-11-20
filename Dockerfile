FROM asherith/node AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app


FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN pnpm config set registry https://registry.npmmirror.com
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=@akaiito/admin --prod /app/packages/admin
RUN pnpm deploy --filter=@akaiito/client --prod /app/packages/client
RUN pnpm deploy --filter=@akaiito/server /app/packages/server

FROM nginx AS admin
WORKDIR /app
COPY --from=build /app/packages/admin/dist /usr/share/nginx/html
COPY --from=build /app/packages/admin/Nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

FROM nginx AS client
WORKDIR /app
COPY --from=build /app/packages/client/dist/build/h5 /usr/share/nginx/html
COPY --from=build /app/packages/client/Nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

FROM base AS server
WORKDIR /app
COPY --from=build /app/packages/server/dist ./dist
# 把源代码复制过去， 以便报错能报对行
COPY --from=build /app/packages/server/src  ./src
COPY --from=build /app/packages/server/bootstrap.js ./
COPY --from=build /app/packages/server/package.json  ./
RUN apk add --no-cache tzdata
RUN pnpm install --production
COPY --from=build /app/packages/server/node_modules/@akaiito ./node_modules/@akaiito
EXPOSE 7001
CMD ["npm","run","start"]


