WORK_PATH=$(dirname "$(readlink -f "$0")")

ADMIN_PROJECT_NAME='akaiito_admin'
CLIENT_PROJECT_NAME='akaiito_client'

ADMIN_PATH=${WORK_PATH}/packages/admin
CLIENT_PATH=${WORK_PATH}/packages/client


docker rmi -f $ADMIN_PROJECT_NAME

docker rm -f $ADMIN_PROJECT_NAME

docker rmi -f $CLIENT_PROJECT_NAME

docker rm -f $CLIENT_PROJECT_NAME


docker build -f "$ADMIN_PATH" -t $ADMIN_PROJECT_NAME .

docker build -f "$CLIENT_PATH" -t $CLIENT_PROJECT_NAME .


docker run --name=$ADMIN_PROJECT_NAME -d -p 81:80 $ADMIN_PROJECT_NAME

docker run --name=$CLIENT_PROJECT_NAME -d -p 82:80 $CLIENT_PROJECT_NAME

