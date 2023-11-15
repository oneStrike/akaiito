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
RUN pnpm run --filter admin build

FROM base AS admin
COPY --from=build /usr/src/app/packages/admin/dist /app/packages/admin/dist
WORKDIR /app/packages/admin
EXPOSE 80

FROM base AS client
COPY --from=build /usr/src/app/packages/client/dist/build/h5 /app/packages/client/dist/build/h5
WORKDIR /app/packages/client
EXPOSE 80

FROM base AS server
COPY --from=build /usr/src/app/packages/server /app/packages/server
WORKDIR /app/packages/server
EXPOSE 7001
CMD ["pnpm","run","start"]


