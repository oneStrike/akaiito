FROM node:16.18.0-bullseye-slim
LABEL authors="lk259"

ENTRYPOINT ["top", "-b"]

WORKDIR /app

COPY . .

RUN npm install pnpm -g

RUN pnpm install

RUN pnpm -C ./packages/admin build

RUN pnpm -C ./packages/client build:h5

RUN pnpm -C ./packages/server build

EXPOSE 7001

CMD ["pnpm", "run", "start"]
