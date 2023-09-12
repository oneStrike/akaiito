#!/usr/bin/env bash

PROJECT_NAME='akaiito_admin'

echo "清空admin历史打包"
rm -rf dist

echo "打包admin"
pnpm  build

docker rmi -f $PROJECT_NAME

docker rm -f $PROJECT_NAME

docker build -t $PROJECT_NAME .


docker run --name=$PROJECT_NAME -d -p 81:80 $PROJECT_NAME

exit 0
