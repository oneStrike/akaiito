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
RUN pnpm deploy --filter=@akaiito/utils  /app/packages/utils

FROM nginx AS admin
WORKDIR /app/admin
COPY --from=build /app/packages/admin/dist /usr/share/nginx/html
COPY --from=build /app/packages/admin/Nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

FROM nginx AS client
WORKDIR /app/client
COPY --from=build /app/packages/client/dist/build/h5 /usr/share/nginx/html
COPY --from=build /app/packages/client/Nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

FROM base AS server
WORKDIR /app/server
COPY --from=build /app/packages/server/ .
EXPOSE 7001
CMD ["npm","run","start"]


