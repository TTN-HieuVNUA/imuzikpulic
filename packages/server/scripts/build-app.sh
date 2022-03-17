#!/bin/sh
set -e -x
IMAGE=$(./scripts/image-current.sh)
echo "build image: $IMAGE"
docker build --network host -f ./Dockerfile -t $IMAGE . &&  docker push $IMAGE
