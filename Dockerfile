FROM node:16-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build


FROM base AS admin
COPY --from=prod-deps /app/packages/admin/node_modules/ /app/packages/admin/node_modules
COPY --from=build /app/packages/admin/dist /app/packages/admin/dist
WORKDIR /app/packages/admin
EXPOSE 8001

FROM base AS client
COPY --from=prod-deps /app/packages/client/node_modules/ /app/packages/client/node_modules
COPY --from=build /app/packages/client/dist/build/h5 /app/packages/client/dist/build/h5
WORKDIR /app/packages/client
EXPOSE 8002

