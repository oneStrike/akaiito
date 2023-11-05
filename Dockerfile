FROM node:16.20.0-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build


FROM common AS client
COPY --from=prod-deps /app/packages/client/node_modules/ /app/packages/client/node_modules
COPY --from=build /app/packages/client/dist/build/h5 app/packages/client/dist
WORKDIR /app/packages/client
EXPOSE 8000

FROM common AS admin
COPY --from=prod-deps /app/packages/admin/node_modules/ /app/packages/admin/node_modules
COPY --from=build /app/packages/admin/dist /app/packages/admin/dist
WORKDIR /app/packages/admin
EXPOSE 8000

FROM common AS app2
COPY --from=prod-deps /app/packages/app2/node_modules/ /app/packages/app2/node_modules
COPY --from=build /app/packages/app2/dist /app/packages/app2/dist
WORKDIR /app/packages/app2
EXPOSE 8001
CMD [ "pnpm", "start" ]
