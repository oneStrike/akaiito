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
#RUN pnpm deploy --filter=admin --prod /app/packages/admin
#RUN pnpm deploy --filter=client --prod /app/packages/client
#RUN pnpm deploy --filter=server --prod /app/packages/server


FROM base AS admin
COPY --from=build /app/packages/admin/dist /app/packages/admin/dist
WORKDIR /app/packages/admin
EXPOSE 80

FROM base AS client
COPY --from=build /app/packages/client/dist/build/h5 /app/packages/client/dist/build/h5
WORKDIR /app/packages/client
EXPOSE 80

FROM base AS server
COPY --from=build /app/packages/server /app/packages/server
WORKDIR /app/packages/server
EXPOSE 7001
CMD ["pnpm","run","start"]


