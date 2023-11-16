FROM asherith/node AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app


FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=@akaiito/admin --prod /app/packages/admin
RUN pnpm deploy --filter=@akaiito/client --prod /app/packages/client
RUN pnpm deploy --filter=@akaiito/server --prod /app/packages/server


FROM base AS admin
COPY --from=build /app/packages/admin /app/packages/admin
WORKDIR /app/packages/admin
COPY dist /usr/share/nginx/html
COPY Nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

FROM base AS client
COPY --from=build /app/packages/client /app/packages/client
WORKDIR /app/packages/client
#COPY dist/build/h5 /usr/share/nginx/html
#COPY Nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

FROM base AS server
COPY --from=build /app/packages/server /app/packages/server
WORKDIR /app/packages/server
EXPOSE 7001
CMD ["pnpm","run","start"]


