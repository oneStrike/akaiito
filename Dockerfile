FROM node:16-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app


ARG proxy=http://mirrors.tuna.tsinghua.edu.cn/debian/

FROM base AS build
RUN if ! command -v openssl >/dev/null 2>&1; then \
        apt-get update && apt-get install -y openssl; \
    fi
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build


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
EXPOSE 80
