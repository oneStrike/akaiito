FROM node:18 AS build

WORKDIR /app

COPY ../.. .

RUN pnpm install

RUN pnpm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
# 把源代码复制过去， 以便报错能报对行
COPY --from=build /app/src ./src
COPY --from=build /app/bootstrap.js ./
COPY --from=build /app/package.json ./

RUN apk add --no-cache tzdata

ENV TZ="Asia/Shanghai"

RUN pnpm install --production

# 如果端口更换，这边可以更新一下
EXPOSE 7001

CMD ["pnpm", "run", "start"]
