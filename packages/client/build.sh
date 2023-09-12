#!/usr/bin/env bash

PROJECT_NAME='akaiito_client'

echo "清楚client历史打包"
rm -rf dist

echo "打包client"
pnpm build:h5

docker rmi -f $PROJECT_NAME

docker rm -f $PROJECT_NAME

docker build -t $PROJECT_NAME .


docker run --name=$PROJECT_NAME -d -p 82:80 $PROJECT_NAME

exit 0
